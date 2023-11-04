from django.db import models
from django.db.models import OuterRef, Prefetch, Subquery
from django.utils import timezone
from django_extensions.db.fields import AutoSlugField
from djmoney.models.fields import MoneyField


# Create your models here.
class Category(models.Model):
    CONVENTIONAL = "Conventional"
    ISLAMIC = "Islamic"

    TYPE_CHOICES = (
        (CONVENTIONAL, "Conventional"),
        (ISLAMIC, "Islamic"),
    )

    code = models.CharField(max_length=64, blank=True, null=True, default=None)
    name = models.CharField(max_length=1024, blank=True, null=True, default=None)
    slug = AutoSlugField(
        populate_from=["name"],
        unique=True,
        allow_duplicates=False,
        max_length=512,
    )

    type = models.CharField(max_length=16, choices=TYPE_CHOICES, default=CONVENTIONAL)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

        unique_together = (("code", "name", "type"),)

        ordering = ("name", "created_at")

    def __str__(self):
        return self.name


class FundType(models.Model):
    tab = models.CharField(
        max_length=64, blank=True, null=True, default=None, unique=True
    )
    name = models.CharField(
        max_length=1024, blank=True, null=True, default=None, unique=True
    )
    slug = AutoSlugField(
        populate_from=["name"],
        unique=True,
        allow_duplicates=False,
        max_length=512,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Fund Type"
        verbose_name_plural = "Fund Types"

        ordering = ("name", "created_at")

    def __str__(self):
        return self.name


class AssetManagementCompany(models.Model):
    code = models.CharField(max_length=64, blank=True, null=True, default=None)
    name = models.CharField(max_length=1024, blank=True, null=True, default=None)
    slug = AutoSlugField(
        populate_from=["name"],
        unique=True,
        allow_duplicates=False,
        max_length=512,
    )

    description = models.TextField(blank=True, null=True, default=None)
    color = models.CharField(max_length=7, blank=True, null=True, default=None)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Asset Management Company"
        verbose_name_plural = "Asset Management Companies"

        unique_together = (("code", "name"),)

        ordering = (
            "name",
            "created_at",
        )

    def __str__(self):
        return self.name


class Fund(models.Model):
    amc = models.ForeignKey(
        AssetManagementCompany,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        default=None,
        related_name="funds",
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        default=None,
        related_name="funds",
    )
    fund_type = models.ForeignKey(
        FundType,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        default=None,
        related_name="funds",
    )

    code = models.CharField(max_length=64, blank=True, null=True, default=None)
    name = models.CharField(max_length=1024, blank=True, null=True, default=None)
    slug = AutoSlugField(
        populate_from=["name"],
        unique=True,
        allow_duplicates=False,
        max_length=512,
    )

    inception_date = models.DateField(blank=True, null=True, default=None)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Fund"
        verbose_name_plural = "Funds"

        unique_together = (("amc", "name", "category", "code", "fund_type"),)

        ordering = ("name", "created_at")

    def __str__(self):
        return self.name

    @staticmethod
    def get_funds():
        # Define the subquery to get the latest NAV ID for each fund
        latest_nav_subquery = Subquery(
            NAV.objects.filter(fund=OuterRef("pk"))
            .order_by("-validity_date")
            .values("id")[:1]
        )

        # Annotate the Fund queryset with the ID of the latest NAV
        funds_with_latest_nav = Fund.objects.annotate(
            latest_nav_id=latest_nav_subquery
        ).select_related("amc", "category", "fund_type")

        # Prefetch the latest NAV objects using the annotated IDs
        latest_navs_qs = NAV.objects.filter(
            id__in=funds_with_latest_nav.values("latest_nav_id")
        )

        # Now, return your queryset with prefetching
        return funds_with_latest_nav.prefetch_related(
            Prefetch(
                "market_caps",
                queryset=MarketCap.objects.filter(month=timezone.now().replace(day=1)),
            ),
            Prefetch(
                "navs",
                queryset=latest_navs_qs,
                to_attr="latest_nav",  # This will attach the latest NAV directly to the fund object
            ),
        )


class MarketCap(models.Model):
    fund = models.ForeignKey(
        Fund,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        default=None,
        related_name="market_caps",
    )

    code = models.CharField(max_length=64, blank=True, null=True, default=None)
    month = models.DateField(blank=True, null=True, default=None)

    cash = MoneyField(
        default_currency="PKR",
        default=None,
        max_digits=30,
        decimal_places=3,
        blank=True,
        null=True,
    )
    placements_with_banks_and_dfis = MoneyField(
        default_currency="PKR",
        default=None,
        max_digits=30,
        decimal_places=3,
        blank=True,
        null=True,
    )
    placements_with_nbfs = MoneyField(
        default_currency="PKR",
        default=None,
        max_digits=30,
        decimal_places=3,
        blank=True,
        null=True,
    )
    reverse_repos_against_government_securities = MoneyField(
        default_currency="PKR",
        default=None,
        max_digits=30,
        decimal_places=3,
        blank=True,
        null=True,
    )
    reverse_repos_against_all_other_securities = MoneyField(
        default_currency="PKR",
        default=None,
        max_digits=30,
        decimal_places=3,
        blank=True,
        null=True,
    )
    tfcs = MoneyField(
        default_currency="PKR",
        default=None,
        max_digits=30,
        decimal_places=3,
        blank=True,
        null=True,
    )
    government_backed_guaranteed_securities = MoneyField(
        default_currency="PKR",
        default=None,
        max_digits=30,
        decimal_places=3,
        blank=True,
        null=True,
    )
    equities = MoneyField(
        default_currency="PKR",
        default=None,
        max_digits=30,
        decimal_places=3,
        blank=True,
        null=True,
    )
    pibs = MoneyField(
        default_currency="PKR",
        default=None,
        max_digits=30,
        decimal_places=3,
        blank=True,
        null=True,
    )
    tbills = MoneyField(
        default_currency="PKR",
        default=None,
        max_digits=30,
        decimal_places=3,
        blank=True,
        null=True,
    )
    commercial_papers = MoneyField(
        default_currency="PKR",
        default=None,
        max_digits=30,
        decimal_places=3,
        blank=True,
        null=True,
    )
    spread_transactions = MoneyField(
        default_currency="PKR",
        default=None,
        max_digits=30,
        decimal_places=3,
        blank=True,
        null=True,
    )
    cfs_margin_financing = MoneyField(
        default_currency="PKR",
        default=None,
        max_digits=30,
        decimal_places=3,
        blank=True,
        null=True,
    )
    others_including_receivables = MoneyField(
        default_currency="PKR",
        default=None,
        max_digits=30,
        decimal_places=3,
        blank=True,
        null=True,
    )
    liabilities = MoneyField(
        default_currency="PKR",
        default=None,
        max_digits=30,
        decimal_places=3,
        blank=True,
        null=True,
    )
    total = MoneyField(
        default_currency="PKR",
        default=None,
        max_digits=30,
        decimal_places=3,
        blank=True,
        null=True,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Market Cap"
        verbose_name_plural = "Market Caps"

        unique_together = (("code", "month"),)

        ordering = ("month", "created_at")

    def __str__(self):
        return self.code


class NAV(models.Model):
    fund = models.ForeignKey(
        Fund,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        default=None,
        related_name="navs",
    )

    fund_class = models.CharField(max_length=256, blank=True, null=True, default=None)
    type = models.CharField(max_length=256, blank=True, null=True, default=None)
    offer = MoneyField(
        default_currency="PKR",
        default=None,
        max_digits=30,
        decimal_places=4,
        blank=True,
        null=True,
    )
    repurchase = MoneyField(
        default_currency="PKR",
        default=None,
        max_digits=30,
        decimal_places=4,
        blank=True,
        null=True,
    )
    nav = MoneyField(
        default_currency="PKR",
        default=None,
        max_digits=30,
        decimal_places=4,
        blank=True,
        null=True,
    )
    front_end_load = MoneyField(
        default_currency="PKR",
        default=None,
        max_digits=30,
        decimal_places=4,
        blank=True,
        null=True,
    )
    back_end_load = MoneyField(
        default_currency="PKR",
        default=None,
        max_digits=30,
        decimal_places=4,
        blank=True,
        null=True,
    )
    contingent_load = MoneyField(
        default_currency="PKR",
        default=None,
        max_digits=30,
        decimal_places=4,
        blank=True,
        null=True,
    )
    trustee_code = models.CharField(max_length=64, blank=True, null=True, default=None)

    validity_date = models.DateField(blank=True, null=True, default=None)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "NAV"
        verbose_name_plural = "NAVs"

        unique_together = (("validity_date", "fund", "fund_class", "type"),)

        ordering = ("-validity_date", "fund", "created_at")

    def __str__(self):
        return f"{self.fund} - {self.nav}"
