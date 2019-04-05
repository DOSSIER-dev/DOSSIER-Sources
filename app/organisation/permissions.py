from rest_framework.permissions import SAFE_METHODS, BasePermission


class IsManagerOrReadOnly(BasePermission):
    """
    The request is authenticated as a sources manager,
    or is a read-only request.
    """
    def has_permission(self, request, view):
        return (
            (request.user and request.user.is_authenticated) and
            request.method in SAFE_METHODS or
            (hasattr(request.user, 'staffprofile') and request.user.staffprofile.isManager)
        )


class IsManager(BasePermission):
    """
    The request is authenticated as a sources manager.
    """
    def has_permission(self, request, view):
        return (
            request.user and
            request.user.is_authenticated and
            (hasattr(request.user, 'staffprofile') and request.user.staffprofile.isManager)
        )


class IsManagerOrNoDelete(BasePermission):
    """
    Sources managers can do everything. For non-managers, DELETE
    action is not permitted.
    """
    def has_permission(self, request, view):
        return (
            (request.user and request.user.is_authenticated) and
            request.method not in ['DELETE'] or
            (hasattr(request.user, 'staffprofile') and request.user.staffprofile.isManager)
        )
