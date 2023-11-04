from datetime import timedelta

from django.db.models import Prefetch
from django.utils import timezone
from rest_framework import filters, generics, permissions

from .models import NAV, AssetManagementCompany, Category, Fund, FundType, MarketCap
from .paginations import DefaultPagination
from .serializers import (
    AssetManagementCompanyListSerializer,
    AssetManagementCompanyDetailSerializer,
    CategorySerializer,
    FundSerializer,
    FundTypeSerializer,
    MarketCapSerializer,
    NAVChartSerializer,
    NAVSerializer,
)


# Create your views here.
class CategoryListView(generics.ListAPIView):
    """
    List all categories
    """

    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (permissions.IsAuthenticated,)
    filter_backends = [filters.SearchFilter]
    search_fields = ["name", "type"]


class CategoryDetailView(generics.RetrieveAPIView):
    """
    List a category
    """

    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (permissions.IsAuthenticated,)
    lookup_field = "slug"


class FundTypeListView(generics.ListAPIView):
    """
    List all fund types
    """

    queryset = FundType.objects.all()
    serializer_class = FundTypeSerializer
    permission_classes = (permissions.IsAuthenticated,)


class FundTypeDetailView(generics.RetrieveAPIView):
    """
    List a fund type
    """

    queryset = FundType.objects.all()
    serializer_class = FundTypeSerializer
    permission_classes = (permissions.IsAuthenticated,)
    lookup_field = "slug"


class AssetManagementCompanyListView(generics.ListAPIView):
    """
    List all AMCs
    """

    queryset = AssetManagementCompany.objects.all().prefetch_related(
        Prefetch(
            "funds", queryset=Fund.objects.all().select_related("category", "fund_type")
        )
    )
    serializer_class = AssetManagementCompanyListSerializer
    permission_classes = (permissions.IsAuthenticated,)
    pagination_class = DefaultPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ["name"]


class AssetManagementCompanyDetailView(generics.RetrieveAPIView):
    """
    List an AMC
    """

    queryset = AssetManagementCompany.objects.all().prefetch_related(
        Prefetch(
            "funds", queryset=Fund.objects.all().select_related("category", "fund_type")
        )
    )
    serializer_class = AssetManagementCompanyDetailSerializer
    permission_classes = (permissions.IsAuthenticated,)
    lookup_field = "slug"


class FundListView(generics.ListAPIView):
    """
    List all funds
    """

    queryset = Fund.get_funds()
    serializer_class = FundSerializer
    permission_classes = (permissions.IsAuthenticated,)
    pagination_class = DefaultPagination
    filter_backends = [filters.SearchFilter]
    search_fields = [
        "name",
        "amc__name",
        "category__name",
        "fund_type__name",
    ]


class FundDetailView(generics.RetrieveAPIView):
    """
    List a fund
    """

    queryset = Fund.get_funds()
    serializer_class = FundSerializer
    permission_classes = (permissions.IsAuthenticated,)
    lookup_field = "slug"


class FundMarketCapListView(generics.ListAPIView):
    """
    List all fund market caps
    """

    serializer_class = MarketCapSerializer
    permission_classes = (permissions.IsAuthenticated,)
    pagination_class = DefaultPagination

    def get_queryset(self):
        return MarketCap.objects.filter(fund__slug=self.kwargs["slug"]).order_by(
            "-month"
        )


class FundNAVListView(generics.ListAPIView):
    """
    List all fund navs
    """

    serializer_class = NAVSerializer
    permission_classes = (permissions.IsAuthenticated,)
    pagination_class = DefaultPagination

    def get_queryset(self):
        return NAV.objects.filter(fund__slug=self.kwargs["slug"]).order_by(
            "-validity_date"
        )


class FundNAVChartView(generics.ListAPIView):
    """
    List all fund navs for chart
    """

    serializer_class = NAVChartSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        try:
            interval = self.request.query_params.get("interval", "1m")
            datetime_now = timezone.now()

            if interval == "1w":
                start_date = datetime_now - timedelta(weeks=1)
            elif interval == "1m":
                start_date = datetime_now - timedelta(days=30)
            elif interval == "3m":
                start_date = datetime_now - timedelta(days=3 * 30)
            elif interval == "6m":
                start_date = datetime_now - timedelta(days=6 * 30)
            elif interval == "1y":
                start_date = datetime_now - timedelta(days=365)
            elif interval == "3y":
                start_date = datetime_now - timedelta(days=3 * 365)
            elif interval == "5y":
                start_date = datetime_now - timedelta(days=5 * 365)
            elif interval == "all":
                start_date = None
            else:
                raise ValueError(f"Unsupported interval: {interval}")

            if start_date:
                return NAV.objects.filter(
                    fund__slug=self.kwargs["slug"],
                    validity_date__gte=start_date,
                ).order_by("validity_date")

            return NAV.objects.filter(
                fund__slug=self.kwargs["slug"],
            ).order_by("validity_date")
        except Exception:
            return NAV.objects.none()
