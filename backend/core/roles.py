from rest_framework_roles.roles import is_admin, is_anon, is_user


def is_standard_user(request, view):
    return is_user(request, view) and request.user.user_type == "standard"


def is_staff_admin(request, view):
    return is_admin(request, view) and request.user.user_type == "admin"


ROLES = {
    # Django out-of-the-box Roles
    "admin": is_staff_admin,
    "user": is_standard_user,
    "anon": is_anon,
    # Custom Roles
}
