"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from dj_rest_auth.views import PasswordResetConfirmView, PasswordResetView
from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .socials import FacebookLogin, GoogleLogin


class HealthView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response(status=200)


url_prefix = "backend-api/" if settings.DEBUG is False else ""

urlpatterns = [
    # Health Check
    path(f"{url_prefix}", HealthView.as_view(), name="health"),
    # Admin
    path(
        f"{url_prefix}adminofthissite/" if settings.DEBUG is False else "admin/",
        admin.site.urls,
    ),
    # Auth
    path(f"{url_prefix}auth/", include("dj_rest_auth.urls")),
    path(f"{url_prefix}auth/registration/", include("dj_rest_auth.registration.urls")),
    path(
        f"{url_prefix}auth/password/reset/",
        PasswordResetView.as_view(),
        name="password_reset",
    ),
    path(
        f"{url_prefix}auth/password/reset/confirm/<slug:uid>/<slug:token>/",
        PasswordResetConfirmView.as_view(),
        name="password_reset_confirm",
    ),
    path(f"{url_prefix}auth/google/", GoogleLogin.as_view(), name="google_login"),
    path(f"{url_prefix}auth/facebook/", FacebookLogin.as_view(), name="facebook_login"),
    re_path(r"^accounts/", include("allauth.urls"), name="socialaccount_signup"),
    # Apps
    path(f"{url_prefix}user/", include("user.urls")),
    path(f"{url_prefix}maintenance/", include("maintenance.urls")),
    path(f"{url_prefix}mutual-funds/", include("mutual_funds.urls")),
]

if settings.DEBUG is True:
    from django.conf.urls.static import static
    from drf_yasg import openapi
    from drf_yasg.views import get_schema_view
    from rest_framework import permissions

    schema_view = get_schema_view(
        openapi.Info(title="FundsNav", default_version="v1"),
        public=True,
        permission_classes=[permissions.AllowAny],
    )

    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns.extend(
        [
            path("__debug__/", include("debug_toolbar.urls")),
            re_path(
                r"^swagger(?P<format>\.json|\.yaml)$",
                schema_view.without_ui(cache_timeout=0),
                name="schema-json",
            ),
            re_path(
                r"^swagger/$",
                schema_view.with_ui("swagger", cache_timeout=0),
                name="schema-swagger-ui",
            ),
            re_path(
                r"^redoc/$",
                schema_view.with_ui("redoc", cache_timeout=0),
                name="schema-redoc",
            ),
        ]
    )
