import concurrent.futures
from datetime import timedelta

from django.core.exceptions import ObjectDoesNotExist
from django.db.models import DecimalField, ExpressionWrapper, F, OuterRef, Subquery
from django.utils import timezone
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import NAV, AssetManagementCompany, Fund, FundType


class FundsDistributionView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        def fetch_fund_types():
            return FundType.objects.all()

        def fetch_amcs():
            return AssetManagementCompany.objects.all()

        def fetch_funds():
            return Fund.objects.all().select_related("category", "fund_type")

        def get_category_distribution(category_type):
            return (category_type, funds.filter(category__type=category_type).count())

        def get_fund_type_distribution(fund_type):
            return (fund_type.name, funds.filter(fund_type=fund_type).count())

        def get_amc_distribution(amc):
            return (amc.name, funds.filter(amc=amc).count(), amc.color)

        try:
            category_types = ["Conventional", "Islamic"]

            category_distribution = {}
            fund_type_distribution = {}
            amc_distribution = {}

            # Fetch main data in parallel
            with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
                fund_types, amcs, funds = executor.map(
                    lambda func: func(), [fetch_fund_types, fetch_amcs, fetch_funds]
                )

            # Now, parallelize the distribution calculations as before
            with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
                # For category distribution
                for category_type, count in executor.map(
                    get_category_distribution, category_types
                ):
                    if count > 0:
                        category_distribution[category_type] = count

                # For fund type distribution
                for fund_type_name, count in executor.map(
                    get_fund_type_distribution, fund_types
                ):
                    if count > 0:
                        fund_type_distribution[fund_type_name] = count

                # For AMC distribution
                for amc_name, count, color in executor.map(get_amc_distribution, amcs):
                    if count > 0:
                        amc_distribution[amc_name] = {
                            "count": count,
                            "color": color or "",
                        }

            data = {
                "category_distribution": category_distribution,
                "fund_type_distribution": fund_type_distribution,
                "amc_distribution": amc_distribution,
            }

            return Response(data=data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response(
                data={"error": "A requested object does not exist!"},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception:
            return Response(
                data={"error": "Something went wrong!"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class FundsGrowthView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        try:
            duration = int(request.query_params.get("duration", 30))

            datetime_now = timezone.now() - timedelta(days=duration)

            # Subqueries to get the initial and final NAV values for each fund within the last 30 days
            initial_nav = (
                NAV.objects.filter(fund=OuterRef("pk"), validity_date__gte=datetime_now)
                .order_by("validity_date")
                .values("nav")[:1]
            )

            final_nav = (
                NAV.objects.filter(fund=OuterRef("pk"), validity_date__gte=datetime_now)
                .order_by("-validity_date")
                .values("nav")[:1]
            )

            # Annotate each fund with its initial and final NAV, then compute the growth
            funds_with_growth = (
                Fund.objects.annotate(
                    initial_nav=Subquery(initial_nav, output_field=DecimalField()),
                    final_nav=Subquery(final_nav, output_field=DecimalField()),
                )
                .annotate(
                    growth=ExpressionWrapper(
                        ((F("final_nav") - F("initial_nav")) / F("initial_nav") * 100),
                        output_field=DecimalField(),
                    )
                )
                .select_related("amc")
            )

            def process_fund(fund):
                if fund.growth is not None:
                    return fund.name, fund.growth, fund.amc.color or ""

                return None, None, None

            with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
                results = list(executor.map(process_fund, funds_with_growth))

            sorted_results = sorted(
                [
                    (name, round(growth, 1), color)
                    for name, growth, color in results
                    if name is not None and growth is not None
                ],
                key=lambda item: item[1],
                reverse=True,
            )
            sorted_data = {
                fund[0]: {
                    "growth": fund[1],
                    "color": fund[2],
                }
                for fund in sorted_results
            }

            sorted_data = dict(
                sorted(
                    sorted_data.items(),
                    key=lambda item: item[1]["growth"],
                    reverse=True,
                )
            )

            return Response(data=sorted_data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response(
                data={"error": "A requested object does not exist!"},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            print(e)
            return Response(
                data={"error": "Something went wrong!"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
