from allauth.account.adapter import get_adapter
from allauth.account.forms import default_token_generator
from allauth.account.utils import setup_user_email
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import (
    PasswordResetConfirmSerializer,
    PasswordResetSerializer,
    UserDetailsSerializer,
)
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import PasswordResetForm
from django.core.exceptions import ValidationError as DjangoValidationError
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode as uid_decoder

# from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

User = get_user_model()


class CustomPasswordResetSerializer(PasswordResetSerializer):
    @property
    def password_reset_form_class(self):
        return PasswordResetForm

    def get_email_options(self):
        return {
            "subject_template_name": "account/email/password_reset_subject.txt",
            "email_template_name": "account/email/password_reset_email.txt",
        }


class CustomPasswordResetConfirmSerializer(PasswordResetConfirmSerializer):
    def validate(self, attrs):
        # Decode the uidb64 (allauth use base36) to uid to get User object
        try:
            uid = force_str(uid_decoder(attrs["uid"]))
            self.user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            raise ValidationError({"uid": ["Invalid value"]})
        # Have to use allauth default token generator instead of django's default one
        if not default_token_generator.check_token(self.user, attrs["token"]):
            raise ValidationError({"token": ["Invalid value"]})

        self.custom_validation(attrs)
        # Construct SetPasswordForm instance
        self.set_password_form = self.set_password_form_class(
            user=self.user,
            data=attrs,
        )
        if not self.set_password_form.is_valid():
            raise serializers.ValidationError(self.set_password_form.errors)

        return attrs


class CustomRegisterSerializer(RegisterSerializer):
    # first_name = serializers.CharField()
    # last_name = serializers.CharField()
    # phone_number = PhoneNumberField()

    def get_cleaned_data(self):
        super().get_cleaned_data()

        return {
            # "first_name": self.validated_data.get("first_name", ""),
            # "last_name": self.validated_data.get("last_name", ""),
            # "phone_number": self.validated_data.get("phone_number", ""),
            "email": self.validated_data.get("email", ""),
            "password1": self.validated_data.get("password1", ""),
            "password2": self.validated_data.get("password2", ""),
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user = adapter.save_user(request, user, self, commit=False)
        user.first_name = self.cleaned_data.get("first_name")
        user.last_name = self.cleaned_data.get("last_name")
        user.phone_number = self.cleaned_data.get("phone_number")
        if "password1" in self.cleaned_data:
            try:
                adapter.clean_password(self.cleaned_data["password1"], user=user)
            except DjangoValidationError as exc:
                raise serializers.ValidationError(
                    detail=serializers.as_serializer_error(exc)
                )
        user.save()
        self.custom_signup(request, user)
        setup_user_email(request, user, [])
        return user

    class Meta:
        model = User
        fields = (
            "first_name",
            "last_name",
            "phone_number",
            "email",
            "password1",
            "password2",
        )


class CustomUserDetailsSerializer(UserDetailsSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "phone_number",
            "user_type",
            "last_login",
        )
