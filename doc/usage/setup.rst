Setup
=====

How to start up the project and its related services.

Setup
-----

Required set up steps are to create the database, carry out migrations (creates tables),
create an admin user and finally create the index.
Use the included `setup.sh` script to get going.

 - Verify django is running: [http://localhost:8008/admin](http://localhost:8008/admin).
 - Verify nginx proxies to django: [http://localhost/admin](http://localhost/admin).
 - Verify elasticsearch is runing: access [http://localhost:9208/](http://localhost:9208/)


WSGI Server for Django App
^^^^^^^^^^^^^^^^^^^^^^^^^^

`gunicorn` is used as a WSGI server. See `app/gunicorn.conf` and
`app/logging.conf` for the configuration settings of the gunicorn wsgi server
and its logging behaviour.


Cheatsheet
----------

Run a shell in webapp container::

    docker exec -it sources_webapp_1 bash

Format output, get only ID column of a command response, e.g.::

    docker images --format "{{.ID}}"

Re-build a single container of the docker-compose setup::

    # Example: rebuilds django container
    docker-compose up -d --no-deps --build webapp

Update dependencies in running webapp container::

    docker-compose exec webapp pip install -r requirements.txt

    # or simply rebuild
    docker-compose up -d --no-deps --build webapp

Django manage commands. (`run` or `exec` - most times, the latter makes
more sense)::

    docker-compose run webapp /code/manage.py
    docker-compose run webapp /code/manage.py check
    docker-compose exec webapp /code/manage.py migrate
    docker-compose exec webapp /code/manage.py collectstatic

Create/rebuild elasticsearch index::

    docker exec -it sources_webapp_1 /code/manage.py search_index --rebuild -f

Test index (query against 'pdfsouce' index)::

    http://localhost:9208/sources-pdfsource/_search
    http://localhost:9208/sources-pdfsource/_search?q=title:document

Import mysqldump::

    cat dump.sql | docker exec -i sources_db_1 mysql -u root --password=root sources


Letsencrypt::

    sudo docker run -it --rm --name certbot\
                -v "/etc/letsencrypt:/etc/letsencrypt"\
                -v "/var/lib/letsencrypt:/var/lib/letsencrypt"\
                -p 80:80 -p 443:443\
                certbot/certbot certonly\
                --standalone -d <DOMAIN_NAME>


Common Tasks
------------

Some django mangement and other useful tasks:

    # run django migrations
    docker-compose exec webapp /code/manage.py migrate

    # Rebuild search index
    docker-compose exec webapp /code/manage.py search_index --rebuild -f

    # Mysqldump
    docker-compose exec db mysqldump sources --user root --password=root

    # Re-build a single container of the docker-compose setup (e.g. webapp container)
    docker-compose up -d --no-deps --build webapp

    # view logs (e.g. for specific container webapp)
    docker-compose logs -f [webapp]

    # import the sources test-database
    ./db-import.db

    # log in to a container and get a bash shell
    docker-compose exec webapp bash

    # To get a pdb shell
    # Get the webapp container id
    docker container ls
    # attach
    docker attach CONTAINER_ID

    # Mysql Upgrade : run this after a server version increase (e.g. 5.6 -> 5.7)
    docker-compose exec db bash -c 'mysql_upgrade -u root --password=root --force'
    docker-compose restart db

