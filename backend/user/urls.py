from django.urls import path

from .views import DeleteAccount

app_name = "user"

urlpatterns = [
    # User
    path("delete/", DeleteAccount.as_view(), name="delete"),
]
