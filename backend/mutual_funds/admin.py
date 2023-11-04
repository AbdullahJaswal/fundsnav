from django.contrib import admin

from .models import NAV, AssetManagementCompany, Category, Fund, FundType, MarketCap

# Register your models here.
admin.site.register(Category)
admin.site.register(FundType)
admin.site.register(AssetManagementCompany)
admin.site.register(Fund)
admin.site.register(MarketCap)
admin.site.register(NAV)
