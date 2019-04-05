"""
View for sources search (list) endpoint.
"""

from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from django_elasticsearch_dsl_drf.constants import (
    LOOKUP_FILTER_TERMS,
    #     LOOKUP_FILTER_PREFIX,
    #     LOOKUP_FILTER_WILDCARD,
    LOOKUP_QUERY_IN,
)
from django_elasticsearch_dsl_drf.filter_backends import (
    FilteringFilterBackend,
    # IdsFilterBackend,
    OrderingFilterBackend,
    DefaultOrderingFilterBackend,
    HighlightBackend,
    MultiMatchSearchFilterBackend,
    CompoundSearchFilterBackend)
from django_elasticsearch_dsl_drf.viewsets import DocumentViewSet
from sources_main.documents import SourceDocument
from sources_main.models import Source, Annotation
from sources_main.serializers import SourceDocumentSerializer
from rest_framework.response import Response
from collections import OrderedDict


class SearchResultsPagination(PageNumberPagination):
    """
    Pagination settings for search.
    Provides count (total no. of items), current page (page) and total number
    of pages (numPages) of the result set.
    """
    page_size = 20

    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('count', self.page.paginator.count),
            ('page', self.page.number),
            ('numPages', self.page.paginator.num_pages),
            ('results', data)
        ]))


class SourceDocumentViewSet(DocumentViewSet):
    """
    Source search endpoint.
    """
    document = SourceDocument
    serializer_class = SourceDocumentSerializer
    permission_classes = (IsAuthenticated,)
    pagination_class = SearchResultsPagination

    # Some backend seems to be required for this to do anything
    filter_backends = [
        DefaultOrderingFilterBackend,
        OrderingFilterBackend,
        FilteringFilterBackend,
        MultiMatchSearchFilterBackend,
        CompoundSearchFilterBackend,
        HighlightBackend,
    ]

    search_fields = {
        'title': {'boost': 5},
        'description': {'boost': 3},
        'fileRef.name': {'boost': 3},
        'tags.name': {'boost': 1},
        'stories.name': {'boost': 1},
        'collection.name': {'boost': 1},
        'contentRaw': None,
    }

    multi_match_search_fields = {
        'title': {'boost': 5},
        'description': {'boost': 3},
        'fileRef.name': {'boost': 3},
        'tags.name': {'boost': 1},
        'stories.name': {'boost': 1},
        'collection.name': {'boost': 1},
        'contentRaw': None,
    }

    multi_match_options = {

        # Multi match type - how to combine multiple fields to get
        # the ranking score
        # https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html#type-phrase
        # Essentially, phrase_prefix works like 'type': 'best_fields', but
        # matches parts (prefix) of phrases as well
        'type': 'phrase_prefix',

        # A tie_breaker score permits matches over multiple fields. The
        # other (non 'best_field' fields) are scaled down by the tie_breaker
        # factor.
        'tie_breaker': 0.5,

        # and / or
        'operator': 'or'
    }

    filter_fields = {
        'tags': {
            'field': 'tags.id',
            'lookups': [
                LOOKUP_FILTER_TERMS,
                LOOKUP_QUERY_IN,
            ]
        },
        'stories': {
            'field': 'stories.id',
            'lookups': [
                LOOKUP_FILTER_TERMS,
                LOOKUP_QUERY_IN,
            ]
        },
        'collection': {
            'field': 'collection.id',
            'lookups': [
                LOOKUP_FILTER_TERMS,
                LOOKUP_QUERY_IN,
            ]
        },
        'owner': {
            'field': 'owner.id',
            'lookups': [
                LOOKUP_FILTER_TERMS,
                LOOKUP_QUERY_IN,
            ]
        },
        'sourcetype': {
            'field': 'sourcetype',
            'lookups': [
                LOOKUP_FILTER_TERMS,
                LOOKUP_QUERY_IN,
            ]
        }
    }

    # Define ordering fields
    # Keys are the parameters for settings this via URL/query params
    ordering_fields = {
        'title': 'title.keyword',
        'created': 'created_at',
    }

    # Specify default ordering
    # ordering = ('created_at', 'title.keyword',)
    ordering = ('_score', 'title.keyword',)

    # Define highlight fields
    highlight_fields = {
        'contentRaw': {
            'enabled': True,
            'options': {
                'fragment_size': 128,
                'number_of_fragments': 5
            },
        },
        'description': {
            'enabled': True,
            'options': {
                'fragment_size': 32,
                'number_of_fragments': 2
            },
        },
        'fileRef.name': {
            'enabled': True,
            'options': {
                'fragment_size': 16,
                'number_of_fragments': 1
            },
        },
        'tags.name': {
            'enabled': True,
            'options': {
                'fragment_size': 16,
                'number_of_fragments': 1
            },
        },
        'stories.name': {
            'enabled': True,
            'options': {
                'fragment_size': 16,
                'number_of_fragments': 1
            },
        },
        'collection.name': {
            'enabled': True,
            'options': {
                'fragment_size': 16,
                'number_of_fragments': 1
            },
        },
    }

    def get_queryset(self):
        """
        Filter by current user / organisation.
        """
        qs = super().get_queryset()
        organisation = self.request.organisation
        qs = qs.filter('term', **{'organisation.id': organisation.id})
        return qs
