Dossier Sources
===============

About
-----

*Sources* is a web application that allows your team to store, manage and annotate your sources and to make them easily available to your readers by embedding them into your stories.

*Source* thereby strengthens and sustains your organisation’s credibility.

### *Sources* allows you to:

* Organise sources efficiently in one central place and keep them safe
* Easily embed sources into your stories
* Make otherwise hidden sources readily available for your readers
* Prove that your stories are truly fact-based

(c) 2019 DOSSIER. Available under MIT License.

Installation
------------

Configuration is best done via environment variables - rename `env_example`
to `.env` .

### Services / Backend

Probably the easiest way to start up all involved parts and services is to
use `docker` and `docker-compose` .

To fetch, build and start containers in the background, use the main compose
file together with the development compose file:

   `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d`

Next, create local configuration in the `conf` directory:

  - create a local configuration for the django application by issuing
    `cp conf/django/settings_local_default.py conf/django/settings_local.py`
    and adapt settings.

Some setup steps are required (such as initialising the database) when starting
the application the first time. See (and run) the setup script `./setup.sh` for
help with that. (Alternatively, use django management commands such as
`createsuperuser` and `migrate` to start with an empty database).

Using the `setup.sh` script, the follwing **test users** are created:

    admin / test1234
    test@tt4.at / test1234

Now the services should be set up and running (try to access
[http://localhost:8083/admin/](http://localhost:8083/admin/) or
[http://localhost:8083/api/](http://localhost:8083/api/)).

To shut down the containers, use `docker-compose down`.

Of course, all services can be installed and configured manually as well.

### Client

Simply install npm dependencies and build the library project
(the `sources-commons` library has to be built once before running the main
app).

    npm install
    npm run build:commons


Run a development setup
-----------------------

    # Start services (if not already running):
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

    # Start the frontend development server, with proxy configugration
    npm run start

Client : http://localhost:4200
Backend: http://localhost:8008 (django directly), or http://localhost:8083 (via nginx).


Documentation
-------------

See documentation in `/doc` directory for more information.

Build documentation:

    # Sphinx and rtd theme required
    pip install sphinx sphinx_rtd_theme
    cd doc
    make html

Tests
-----

There are three different levels of testing: python/django tests for the backend,
angular jasmine tests (ng test, for each of the sub-projects), and
end-to-end / integration tests using the Cypress project.

 - django tests

       docker-compose exec webapp /code/manage.py test

 - run a single django test

       docker-compose exec webapp /code/manage.py test organisation.tests

 - frontend unit tests

   Tests of a specific project can be run with `ng test --project PROJECT`, e.g.
   `ng test --project sources-app`. To run the complete suite run with `--watch=False`
   or use

        npm run test-all


 - cypress e2e tests: a test suit using the cypress runner is included. To run it,

     - start all containers (e.g. `./startdev.sh` or with `docker-compose up`)
     - start the frontend project(s) (e.g. `npm run start`).
     - finally run tests `npm run cypress` , or open cypress browser `npm run cypress:open`

Contributing
------------

You can contribute to Sources by

 - reporting bugs (use the issue tracker)
 - contributing code via pull requests






