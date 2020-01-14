Data Model
==========

Overview
--------

The app consists of five modules (django apps):

 - sources_main
 - filestorage
 - organisation
 - bookmarks and
 - stats (statistics)

Sources Main
````````````

The `source` model is the main data type.
It stores meta data for a source.
A `file` model is generated for each upload.
A `file` is directly (1:1) related to a `source`.
To any `source`, zero, one or more annotations (`annotation`) can be assigned.

 - Source
 - Annotation

Organisation
````````````

Ownership and access.

 - Organisation
 - StafferProfile (1:1 with User model)
 - Tag
 - Collection

Filestorage
````````````
 - File

Bookmarks
`````````
Bookmarks on sources.

 - Bookmark

Stats
`````

Logging requests for usage staticts.


Ownership and Access
--------------------

Sources are tied to a specific user via the ownership relation.
In addition, every data item is tied to an organisation.

From user to organisation, there is a one-to-one relationship.
The user model is extended with a 1:1 relation to the
item ``organisation.model.StafferProfile``, which stores the organisation
and the user status (active, manager status).

User and Organisation as Request Context
````````````````````````````````````````

The organisation is added to the request object in a piece of middleware.

Filter querysets
````````````````

When accessing data, all querysets and data lookups must take the current user
and the current organisation into account.
When data is created, this context has to be added to the created data.


Permissions
```````````

A user is either normal user or a 'manger' user (``isManager=True`` in the profile).


Search
``````

The package used for integration are (https://elasticsearch-dsl.readthedocs.io/en/latest/)[https://elasticsearch-dsl.readthedocs.io/en/latest/]
and (https://readthedocs.org/projects/django-elasticsearch-dsl-drf/)[https://readthedocs.org/projects/django-elasticsearch-dsl-drf/] .

The packages manage mapping (django/db)-models to index-documents (elasticsearch-dsl) and
provide a django rest framework (drf) view for searching (django-elasticsearch-dsl-drf).
The sources_main.document module defines the structure of the index document, i.e. the mapping
from the `Source` model to the index. (app/sources_main/documents.py).
The view in sources_main.views_search derives from `DocumentViewSet`
from the django_elasticsearch_dsl_drf.viewsets module.
It defines the ways the index can be queried.

Note that the query must always add a filter on `organisation.id` - otherwise
documents of other organsiations would turn up as well.

Some demo searches:

 - http://localhost:8083/api/sources/search/
 - http://localhost:8083/api/sources/search/?tags__terms=1
 - http://localhost:8083/api/sources/search/?tags__terms=1
 - http://localhost:8083/api/sources/search/?search_multi_match=doc
 - http://localhost:8083/api/sources/search/?search_multi_match=creative&owner__in=2


The settings for pagination (e.g. pagesize) are set in `sources_main.views_search.SearchResultsPagination` .

