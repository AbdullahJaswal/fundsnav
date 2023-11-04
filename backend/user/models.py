from django.contrib.auth.models import AbstractUser
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class User(AbstractUser):
    USER_TYPE_CHOICES = (
        ("standard", "Standard"),
        ("admin", "Admin"),
    )

    user_type = models.CharField(
        max_length=255,
        choices=USER_TYPE_CHOICES,
        default="standard",
        blank=False,
        null=False,
    )

    first_name = models.CharField(max_length=255, blank=True, null=True)
    last_name = models.CharField(max_length=255, blank=True, null=True)

    phone_number = PhoneNumberField(blank=True, null=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

        ordering = ("-date_joined",)

    def __str__(self):
        return self.email
