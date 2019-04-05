from django.test import TestCase, Client
from django.urls import reverse
from rest_framework.test import APIRequestFactory
from rest_framework.test import force_authenticate

from .models import Source, Annotation
from .views import SourceViewSet
from django.contrib.auth.models import User
from organisation.models import Organisation


def helper_force_authenticate(request, user):
    """
    In addition to calling `force_authenticate`, set
    the organisation as it would happen in the middleware
    """
    force_authenticate(request, user=user)
    request.organisation = user.staffprofile.organisation


class SourcesTestCase(TestCase):
    def setUp(self):
        org = Organisation.objects.create(name="some org")
        org2 = Organisation.objects.create(name="other org")
        self.alice = User.objects.create(username="alice")
        self.alice.staffprofile.organisation = org
        self.alice.save()
        self.bob = User.objects.create(username="bob")
        self.bob.staffprofile.organisation = org
        self.bob.save()
        self.eve = User.objects.create(username="eve")
        self.eve.staffprofile.organisation = org2
        self.eve.save()
        Source.objects.create(title="test123", description="hello",
                              owner=self.alice, organisation=org)
        self.NUMDOCS = 1

    def test_no_unauth_access_to_sources(self):
        factory = APIRequestFactory()
        request = factory.get('/sources/')
        view = SourceViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, 401)

    def test_owner_can_access(self):
        factory = APIRequestFactory()
        request = factory.get('/sources/')
        helper_force_authenticate(request, user=self.alice)
        view = SourceViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), self.NUMDOCS)
        self.assertEqual(response.data[0]['title'], 'test123')

    def test_other_user_cannot_access(self):
        factory = APIRequestFactory()
        request = factory.get('/sources/')
        helper_force_authenticate(request, user=self.eve)
        view = SourceViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 0)

    def test_can_post_source(self):
        factory = APIRequestFactory()
        request = factory.post('/sources/', {'title': 'new source'})
        helper_force_authenticate(request, user=self.alice)
        view = SourceViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(len(Source.objects.filter(owner=self.alice)),
                         self.NUMDOCS + 1)


class PublicSourceFetchTestCase(TestCase):
    def setUp(self):
        org = Organisation.objects.create(name="org1")
        self.alice = User.objects.create(username="alice")
        self.alice.staffprofile.organisation = org
        self.alice.save()
        self.source1 = Source.objects.create(
            title="test123", description="hello",
            public=True,
            owner=self.alice, organisation=org)
        self.source2 = Source.objects.create(
            title="Hidden", description="hello",
            owner=self.alice, organisation=org)
        Annotation.objects.create(
            title="anno123", source=self.source1, public=True)
        Annotation.objects.create(
            title="anno-hidden", source=self.source1, public=False)

    def test_can_retrieve_only_public_sources_and_public_annotations(self):
        client = Client()
        response = client.get(reverse('source_public'), {
                              'id': self.source1.embedId})

        # Gets the public source
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['title'], 'test123')

        # Only public annotation is there
        self.assertEqual(len(response.data['annotations']), 1)
        self.assertEqual(response.data['annotations'][0]['title'], 'anno123')

        # Hidden source returns 404
        response = client.get(reverse('source_public'), {
                              'id': self.source2.embedId})
        self.assertEqual(response.status_code, 404)


# class AnnotationsTestCase(TestCase):
#     def setUp(self):
#         self.alice = User.objects.create(username="alice")
#         source1 = Source.objects.create(title="test123", description="hello",
#                               owner=self.alice)
#         Annotation.objects.create(title="anno1", source=source1)
#         self.NUMDOCS = 1
#         self.NUMANNOS = 1

#     # def can_post_annotation(self):
#     #     factory = APIRequestFactory()
#     #     request = factory.post('/sources/', {'title': 'new source'})
#     #     force_authenticate(request, user=self.alice)
#     #     view = SourceViewSet.as_view({'post': 'create'})
#     #     response = view(request)
