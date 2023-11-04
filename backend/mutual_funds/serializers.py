from rest_framework import serializers

from .models import NAV, AssetManagementCompany, Category, Fund, FundType, MarketCap


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = (
            "name",
            "slug",
            "type",
        )
        read_only_fields = fields


class FundTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FundType
        fields = (
            "name",
            "slug",
        )
        read_only_fields = fields


class MarketCapSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketCap
        fields = (
            "month",
            "cash",
            "placements_with_banks_and_dfis",
            "placements_with_nbfs",
            "reverse_repos_against_government_securities",
            "reverse_repos_against_all_other_securities",
            "tfcs",
            "government_backed_guaranteed_securities",
            "equities",
            "pibs",
            "tbills",
            "commercial_papers",
            "spread_transactions",
            "cfs_margin_financing",
            "others_including_receivables",
            "liabilities",
            "total",
        )
        read_only_fields = fields


class NAVSerializer(serializers.ModelSerializer):
    class Meta:
        model = NAV
        fields = (
            "fund_class",
            "type",
            "offer",
            "repurchase",
            "nav",
            "front_end_load",
            "back_end_load",
            "contingent_load",
            "trustee_code",
            "validity_date",
        )
        read_only_fields = fields


class FundAMCSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssetManagementCompany
        fields = (
            "name",
            "slug",
            "description",
            "color",
        )
        read_only_fields = fields


class FundSerializer(serializers.ModelSerializer):
    amc = FundAMCSerializer()
    category = CategorySerializer()
    fund_type = FundTypeSerializer()

    market_caps = MarketCapSerializer(many=True, read_only=True)

    last_updated_on = serializers.SerializerMethodField()

    def get_last_updated_on(self, obj):
        if obj.latest_nav:
            return obj.latest_nav[0].validity_date

        return None

    class Meta:
        model = Fund
        fields = (
            "amc",
            "category",
            "fund_type",
            "name",
            "slug",
            "inception_date",
            "market_caps",
            "last_updated_on",
        )
        read_only_fields = fields


class AMCFundSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    fund_type = FundTypeSerializer()

    class Meta:
        model = Fund
        fields = (
            "category",
            "fund_type",
            "name",
            "slug",
            "inception_date",
        )
        read_only_fields = fields


class AssetManagementCompanyListSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssetManagementCompany
        fields = (
            "name",
            "slug",
            "description",
            "color",
        )
        read_only_fields = fields


class AssetManagementCompanyDetailSerializer(serializers.ModelSerializer):
    funds = AMCFundSerializer(many=True, read_only=True)

    class Meta:
        model = AssetManagementCompany
        fields = (
            "name",
            "slug",
            "description",
            "color",
            "funds",
        )
        read_only_fields = fields


class NAVChartSerializer(serializers.ModelSerializer):
    x = serializers.DateField(source="validity_date")
    y = serializers.SerializerMethodField()

    def get_y(self, obj):
        return obj.nav.amount

    class Meta:
        model = NAV
        fields = (
            "x",
            "y",
        )
        read_only_fields = fields
