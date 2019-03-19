#
# Setup script
#
# WARNING: this ignores $SOURCES_MYSQL_HOST and $SOURCES_MYSQL_PORT,
# and assumes we have a db container we're using
#
# TODO: fix the above one day
#

set -e
source .env

# Create database
docker-compose exec db mysqladmin create "${SOURCES_MYSQL_DATABASE}" --user "${SOURCES_MYSQL_USER}" --password="${SOURCES_MYSQL_PASSWORD}"

# Attempt to drop database + import test database afterwards
docker-compose exec db bash -c "mysqladmin -u ${SOURCES_MYSQL_USER} --password=${SOURCES_MYSQL_PASSWORD} drop ${SOURCES_MYSQL_DATABASE}"
docker-compose exec db bash -c "mysqladmin -u ${SOURCES_MYSQL_USER} --password=${SOURCES_MYSQL_PASSWORD} create ${SOURCES_MYSQL_DATABASE} -f"
docker-compose exec db bash -c "mysql ${SOURCES_MYSQL_DATABASE} -u ${SOURCES_MYSQL_USER} --password=${SOURCES_MYSQL_PASSWORD} < /var/dump/testdb.sql"
echo 'Database imported ...'

# Migrate and create rebuild search index
docker-compose exec webapp /code/manage.py migrate
docker-compose exec webapp /code/manage.py search_index --rebuild -f

# Collect static files (mainly admin interface)
docker-compose exec webapp /code/manage.py collectstatic --noinput

# Restart
docker-compose restart webapp
