from django.urls import include, path

from .views import (
    AssetManagementCompanyDetailView,
    AssetManagementCompanyListView,
    CategoryDetailView,
    CategoryListView,
    FundDetailView,
    FundListView,
    FundMarketCapListView,
    FundNAVChartView,
    FundNAVListView,
    FundTypeDetailView,
    FundTypeListView,
)

app_name = "mutual_funds"

urlpatterns = [
    # Manage
    path("analysis/", include("mutual_funds.analysis.urls")),
    # Category
    path("category/", CategoryListView.as_view(), name="category-list"),
    path("category/<slug:slug>/", CategoryDetailView.as_view(), name="category-detail"),
    # Fund Type
    path("fund-type/", FundTypeListView.as_view(), name="fund-type-list"),
    path(
        "fund-type/<slug:slug>/", FundTypeDetailView.as_view(), name="fund-type-detail"
    ),
    # AMC
    path("amc/", AssetManagementCompanyListView.as_view(), name="amc-list"),
    path(
        "amc/<slug:slug>/",
        AssetManagementCompanyDetailView.as_view(),
        name="amc-detail",
    ),
    # Fund
    path("fund/", FundListView.as_view(), name="fund-list"),
    path("fund/<slug:slug>/", FundDetailView.as_view(), name="fund-detail"),
    path(
        "fund/<slug:slug>/market-caps/",
        FundMarketCapListView.as_view(),
        name="fund-market-cap-list",
    ),
    path("fund/<slug:slug>/nav/", FundNAVListView.as_view(), name="fund-nav-list"),
    path(
        "fund/<slug:slug>/nav/chart/",
        FundNAVChartView.as_view(),
        name="fund-nav-chart-list",
    ),
]
