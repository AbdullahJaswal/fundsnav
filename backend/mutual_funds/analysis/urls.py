from django.urls import path

from .views import FundsDistributionView, FundsGrowthView

urlpatterns = [
    path(
        "funds-distribution/",
        FundsDistributionView.as_view(),
        name="funds-distribution",
    ),
    path("funds-growth/", FundsGrowthView.as_view(), name="funds-growth"),
]
