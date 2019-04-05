from organisation.models import Organisation

import logging
logger = logging.getLogger(__name__)


class EmptyOrganisation:
    def __init__(self):
        self.id = None
        self.name = None
        self.users = []

    def __int__(self):
        # Return -1 when casting to int (being used as lookup id)
        return -1


class OwnershipMiddleware:
    """
    Adding the organisation of the current user.
    To be able to use sources together in a group/staff/organisation,
    ownership is not only determined by user, but also by organisation
    (`organisation.models.Organisation`).

    The organisation is added to the request object::

        request.organisation

    Otherwise, `request.organisation` the `EmptyOrganisation`.

    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        try:
            request.organisation = request.user.staffprofile.organisation
        except Exception:
            request.organisation = EmptyOrganisation()
        response = self.get_response(request)
        return response
