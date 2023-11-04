from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from user.models import User

from .models import AssetManagementCompany, Category, Fund, FundType


class MutualFundsAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

        # Assuming you are using Django's default User model
        self.user = User.objects.create_user(username="test", password="test123")
        self.client.force_authenticate(user=self.user)

        # Create a test category, fund type, amc, and fund for use in testing
        self.category = Category.objects.create(
            name="Equity", slug="equity", type="Open Ended"
        )
        self.fund_type = FundType.objects.create(name="Large Cap", slug="large-cap")
        self.amc = AssetManagementCompany.objects.create(
            name="XYZ Corp.",
            slug="xyz-corp",
            description="Test Description",
            color="Red",
        )
        self.fund = Fund.objects.create(
            name="Test Fund",
            slug="test-fund",
            inception_date="2023-01-01",
            amc=self.amc,
            category=self.category,
            fund_type=self.fund_type,
        )

    def test_category_list(self):
        response = self.client.get(reverse("mutual_funds:category-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_category_detail(self):
        response = self.client.get(
            reverse("mutual_funds:category-detail", kwargs={"slug": "equity"})
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], "Equity")

    def test_fund_type_list(self):
        response = self.client.get(reverse("mutual_funds:fund-type-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_fund_type_detail(self):
        response = self.client.get(
            reverse("mutual_funds:fund-type-detail", kwargs={"slug": "large-cap"})
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], "Large Cap")

    def test_amc_list(self):
        response = self.client.get(reverse("mutual_funds:amc-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 1)

    def test_amc_detail(self):
        response = self.client.get(
            reverse("mutual_funds:amc-detail", kwargs={"slug": "xyz-corp"})
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], "XYZ Corp.")

    def test_fund_list(self):
        response = self.client.get(reverse("mutual_funds:fund-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 1)

    def test_fund_detail(self):
        response = self.client.get(
            reverse("mutual_funds:fund-detail", kwargs={"slug": "test-fund"})
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], "Test Fund")

    def test_fund_market_caps(self):
        # You may want to add a test MarketCap instance related to the fund here
        response = self.client.get(
            reverse("mutual_funds:fund-market-cap-list", kwargs={"slug": "test-fund"})
        )
        # Adjust the expected data according to whether you've added any related MarketCaps
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 0)

    def test_fund_navs(self):
        # You may want to add a test NAV instance related to the fund here
        response = self.client.get(
            reverse("mutual_funds:fund-nav-list", kwargs={"slug": "test-fund"})
        )
        # Adjust the expected data according to whether you've added any related NAVs
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 0)

    def test_category_search(self):
        # Assuming we've created a category named 'Equity' in setUp:

        # Testing the presence of the 'Equity' category with search:
        response = self.client.get(
            reverse("mutual_funds:category-list"), {"search": "Equity"}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["name"], "Equity")

        # Testing non-existent data:
        response = self.client.get(
            reverse("mutual_funds:category-list"), {"search": "Bonds"}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_fund_search_by_name(self):
        # Assuming we've created a fund named 'Test Fund' in setUp:

        # Testing the presence of the 'Test Fund' with search:
        response = self.client.get(
            reverse("mutual_funds:fund-list"), {"search": "Test Fund"}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 1)
        self.assertEqual(response.data["results"][0]["name"], "Test Fund")

        # Testing non-existent data:
        response = self.client.get(
            reverse("mutual_funds:fund-list"), {"search": "Nonexistent Fund"}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 0)

    def test_fund_search_by_amc_name(self):
        # Testing fund search by related AMC's name:

        response = self.client.get(reverse("mutual_funds:fund-list"), {"search": "XYZ"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 1)
        self.assertEqual(response.data["results"][0]["amc"]["name"], "XYZ Corp.")

        # Testing non-existent AMC:
        response = self.client.get(
            reverse("mutual_funds:fund-list"), {"search": "Nonexistent AMC"}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 0)

    def test_funds_distribution_view(self):
        # Assuming you require authentication, you'd need to authenticate your client.
        # For this example, I'll skip authentication.

        response = self.client.get(reverse("mutual_funds:funds-distribution"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Make assertions on the response data.
        self.assertIn("category_distribution", response.data)
        self.assertIn("fund_type_distribution", response.data)
        self.assertIn("amc_distribution", response.data)

    def test_funds_growth_view_default_duration(self):
        # Assuming you require authentication, you'd need to authenticate your client.
        # For this example, I'll skip authentication.

        response = self.client.get(reverse("mutual_funds:funds-growth"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Assertions for default duration value (30 days)
        # ... based on the expected growth data ...

    def test_funds_growth_view_custom_duration(self):
        # Test with a custom duration parameter.
        response = self.client.get(
            reverse("mutual_funds:funds-growth"), {"duration": 15}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Assertions for a duration of 15 days
        # ... based on the expected growth data ...

    def tearDown(self):
        self.fund.delete()
        self.amc.delete()
        self.fund_type.delete()
        self.category.delete()
        self.user.delete()
