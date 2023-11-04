from core.roles import ROLES
from rest_framework import permissions


class IsAdminOrStaff(permissions.BasePermission):
    """
    Custom permission to only allow admin (as defined in ROLES) or staff to view.
    """

    def has_permission(self, request, view):
        if ROLES["admin"](request, view):
            return True

        return False
