Architecture
============

Project overview. Describing architectural and implementational choices.

Services
--------

See the `docker-compose.yml` file for an example configuration, employing
the following services:

 - django 2.1
 - mysql 5.x
 - elasticsearch 5.x
 - celery (for offline file extraction / indexing)
 - nginx
 - postifx (for mailings)

 In theory, mysql, nginx and postfix can be replaced with alternatives.

Database: Mysql
~~~~~~~~~~~~~~~

For mysql, the proper charset has to be configured (see `my.cnf`)::

    character-set-server = utf8mb4
    collation-server = utf8mb4_unicode_ci

https://mathiasbynens.be/notes/mysql-utf8mb4


External libraries and integrations
-----------------------------------

Rest services
~~~~~~~~~~~~~

For the API , Django REST framework (`djangorestframework`).
Integration of elasticsearch via `django-elasticsearch-dsl-drf` package.

Authentication
~~~~~~~~~~~~~~

The project uses session authentication.
The package `django-rest-auth` includes enpoints for common auth tasks.
Templates for the reset password mail can be found in `templates`
directory. See `django.contrib.auth.views.PasswordResetView` for the details.


Client - Angular App
--------------------

The frontend code is an angular application, mangaged with the `angular-cli`.
The application uses multiple projects: `sources-main`, `embed-lib`, `micropage`
and one common library `sources-commons`.

The main app is the client application that allows teams to upload and organise
sources and create annotations.
The micropage project is a separed app that
renders the source with annotations for a visitor.
The embed-lib project results in the `sources.js` embed-library, which is
included in articles and blog posts to augment the content such that
a source link creates an overlay with an iframe (that shows the micropage of
that source).

 - While there is a global routing module, each module has its own routing module.
 - Components that are used in routing definitions are (should be) postfixed with `-view` in the name.
 - The `sources-commons` project contains mainly annotator code that is used
   by the main app and the micropage.


References
----------

Container/Services info
~~~~~~~~~~~~~~~~~~~~~~~

 - https://docs.docker.com/compose/django/
 - https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html
 - https://hub.docker.com/_/mysql/


Elastic integration
~~~~~~~~~~~~~~~~~~~
 - http://django-rest-elasticsearch.readthedocs.io/en/latest/basic-usage.html
 - https://github.com/myarik/django-rest-elasticsearch
 - https://github.com/elastic/elasticsearch-dsl-py
 - https://www.elastic.co/guide/en/elasticsearch/reference/current/fielddata.html


File Uploads
~~~~~~~~~~~~

 - https://docs.djangoproject.com/en/2.0/topics/http/file-uploads/

protected files, served via nginx:

 - https://wellfire.co/learn/nginx-django-x-accel-redirects/
 - https://www.nginx.com/resources/wiki/start/topics/examples/x-accel/


Django deployment
~~~~~~~~~~~~~~~~~

 - https://docs.djangoproject.com/en/2.0/howto/deployment/checklist/
 - https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Deployment