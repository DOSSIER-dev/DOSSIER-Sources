from organisation.views import StafferViewSet, OrganisationViewSet
from organisation.models import Organisation
from organisation.models import StafferProfile
from django.contrib.auth.models import User
from django.test import Client
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIRequestFactory
from rest_framework.test import force_authenticate
from datetime import datetime


def helper_force_authenticate(request, user):
    """
    In addition to calling `force_authenticate`, set
    the organisation as it would happen in the middleware
    """
    force_authenticate(request, user=user)
    request.organisation = user.staffprofile.organisation


class StafferTestCase(TestCase):

    def setUp(self):
        org = Organisation.objects.create(name="some org")
        self.alice = User.objects.create(username="alice@abc.com")
        self.alice.staffprofile.isManager = True  # is allowed to CRUD
        self.alice.staffprofile.organisation = org
        self.alice.save()

    def test_api_roundtrip(self):

        # viewset
        factory = APIRequestFactory()

        # create
        request = factory.post('/staffer/', {
            'isActive': True,
            'isManager': False,
            'user': {
                'username': 'bob@dylan.com',
                'firstname': 'Bob',
                'lastname': 'Dylan',
                'email': 'bob@dylan.com',
            },
        }, format='json')  # format = json, otherwise no nested data
        helper_force_authenticate(request, user=self.alice)
        view = StafferViewSet.as_view({'post': 'create'})
        response = view(request)

        self.assertEqual(response.status_code, 201)  # created.

        # get the id of the user we just created
        id_ = response.data['user']['id']

        # get all
        request = factory.get('/staffer/')
        helper_force_authenticate(request, user=self.alice)
        view = StafferViewSet.as_view({'get': 'list'})
        response = view(request)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

        # get
        request = factory.get('/staffer/')  # staffer/ID
        helper_force_authenticate(request, user=self.alice)
        view = StafferViewSet.as_view({'get': 'retrieve'})
        response = view(request, pk=id_)  # pk=ID necessary due to direct usage
                                          # of API which bypasses the routing
                                          # infrastructure.

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['isActive'], True)
        self.assertEqual(response.data['isManager'], False)
        self.assertEqual(response.data['user']['username'], 'bob@dylan.com')
        self.assertEqual(response.data['user']['firstname'], 'Bob')
        self.assertEqual(response.data['user']['lastname'], 'Dylan')
        self.assertEqual(response.data['user']['email'], 'bob@dylan.com')

        # update
        request = factory.put('/staffer/', {
            'isActive': False,
            'isManager': True,
            'user': {
                'username': 'alison@airplane.com',
                'firstname': 'Alison',
                'lastname': 'Airplane',
                'email': 'alison@airplane.com',
            },
        }, format='json')  # format = json, otherwise no nested data
        helper_force_authenticate(request, user=self.alice)
        view = StafferViewSet.as_view({'put': 'update'})
        response = view(request, pk=id_)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['isActive'], False)
        self.assertEqual(response.data['isManager'], True)

        # get
        request = factory.get('/staffer/')
        helper_force_authenticate(request, user=self.alice)
        view = StafferViewSet.as_view({'get': 'retrieve'})
        response = view(request, pk=id_)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['isActive'], False)
        self.assertEqual(response.data['isManager'], True)
        self.assertEqual(response.data['user']
                         ['username'], 'alison@airplane.com')
        self.assertEqual(response.data['user']['firstname'], 'Alison')
        self.assertEqual(response.data['user']['lastname'], 'Airplane')
        self.assertEqual(response.data['user']['email'], 'alison@airplane.com')

        # delete
        request = factory.delete('/staffer/')
        helper_force_authenticate(request, user=self.alice)
        view = StafferViewSet.as_view({'delete': 'destroy'})
        response = view(request, pk=id_)

        self.assertEqual(response.status_code, 204)

        # get all
        request = factory.get('/staffer/')
        helper_force_authenticate(request, user=self.alice)
        view = StafferViewSet.as_view({'get': 'list'})
        response = view(request)

        # deleted. list of user/staffers must be of length 1
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

    def test_disallowed_api_calls(self):

        org = Organisation.objects.create(name="some org")
        bob = User.objects.create(username="bob")
        bob.staffprofile.isManager = False  # Readonly API access. (default)
        bob.staffprofile.organisation = org
        bob.save()

        # viewset
        factory = APIRequestFactory()

        # create
        request = factory.post('/staffer/', {
            'user': {
                'username': 'black@hat.net'
            }
        }, format='json')
        helper_force_authenticate(request, user=bob)
        view = StafferViewSet.as_view({'post': 'create'})
        response = view(request)

        self.assertEqual(response.status_code, 403)

        # get all
        request = factory.get('/staffer/')
        helper_force_authenticate(request, user=bob)
        view = StafferViewSet.as_view({'get': 'list'})
        response = view(request)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

        # get the id of the only user
        id_ = response.data[0]['user']['id']

        # get
        request = factory.get('/staffer/%s' % id_)
        helper_force_authenticate(request, user=bob)
        view = StafferViewSet.as_view({'get': 'retrieve'})
        response = view(request, pk=id_)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['user']['username'], 'bob')

        # update
        request = factory.put('/staffer/%s' % id_, {'isActive': False})
        helper_force_authenticate(request, user=bob)
        view = StafferViewSet.as_view({'put': 'update'})
        response = view(request, pk=id_)

        self.assertEqual(response.status_code, 403)

        # delete
        request = factory.delete('/staffer/%s' % id_)
        helper_force_authenticate(request, user=bob)
        view = StafferViewSet.as_view({'delete': 'destroy'})
        response = view(request, pk=id_)

        self.assertEqual(response.status_code, 403)

    def test_unique_username(self):
        """
        Test that unique usernames are enforced at the api level, BUT an
        update of a user must be possible keeping the same username
        """
        # viewset
        factory = APIRequestFactory()

        # create
        request = factory.post('/staffer/', {
            'isActive': True,
            'isManager': False,
            'user': {
                'username': 'alice@abc.com',
                'firstname': 'alice',
                'lastname': 'abc',
                'email': 'alice@abc.com',
            },
        }, format='json')  # format = json, otherwise no nested data
        helper_force_authenticate(request, user=self.alice)
        view = StafferViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, 400)  # Denied

        id_ = self.alice.id

        request = factory.put('/staffer/', {
            'isActive': True,
            'isManager': True,
            'user': {
                'username': 'alice@abc.com',
                'firstname': 'New Alice',
                'lastname': 'abcxyz',
                'email': 'alice@abc.com',
            },
        }, format='json')  # format = json, otherwise no nested data
        helper_force_authenticate(request, user=self.alice)
        view = StafferViewSet.as_view({'put': 'update'})
        response = view(request, pk=id_)
        self.assertEqual(response.status_code, 200)  # Allowed

        # verify updated fields
        alice = User.objects.get(id=id_)
        self.assertEqual(alice.first_name, 'New Alice')
        self.assertEqual(alice.last_name, 'abcxyz')
        self.assertEqual(alice.email, 'alice@abc.com')


class OrgTestCase(TestCase):
    def setUp(self):
        orgname = "someorg" + datetime.now().isoformat()
        self.org = Organisation.objects.create(name=orgname)
        self.alice = User.objects.create(username="alice")
        self.alice.staffprofile.isManager = True  # is allowed to CRUD
        self.alice.staffprofile.organisation = self.org
        self.alice.save()

    def test_fetch_org_data(self):
        factory = APIRequestFactory()
        request = factory.get('/organisation/')
        helper_force_authenticate(request, user=self.alice)

        # get list
        view = OrganisationViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], self.org.name)

        # get detail
        view = OrganisationViewSet.as_view({'get': 'retrieve'})
        response = view(request, pk=self.org.id)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['name'], self.org.name)

    def test_put_org_data(self):
        factory = APIRequestFactory()
        # update
        request = factory.put('/organisation/{}'.format(self.org.id), {
            'name': 'another name'
        })
        helper_force_authenticate(request, user=self.alice)
        view = OrganisationViewSet.as_view({'put': 'update'})
        response = view(request, pk=self.org.id)
        self.assertEqual(response.status_code, 200)

        # get detail
        request = factory.get('/organisation/')
        helper_force_authenticate(request, user=self.alice)
        view = OrganisationViewSet.as_view({'get': 'retrieve'})
        response = view(request, pk=self.org.id)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['name'], 'another name')

