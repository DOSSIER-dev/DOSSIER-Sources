#
# Setup script
#
# Create database
docker-compose exec db mysqladmin create sources --user root --password=root

# Attempt to drop database + import test database afterwards
docker-compose exec db bash -c 'mysqladmin -u root --password=root drop sources'
docker-compose exec db bash -c 'mysqladmin -u root --password=root create sources -f'
docker-compose exec db bash -c 'mysql sources -u root --password=root < /var/dump/testdb.sql'
echo 'Database imported ...'

# Migrate and create rebuild search index
docker-compose exec webapp /code/manage.py migrate
docker-compose exec webapp /code/manage.py search_index --rebuild -f

# Collect static files (mainly admin interface)
docker-compose exec webapp /code/manage.py collectstatic --noinput

# Restart
docker-compose restart webapp
