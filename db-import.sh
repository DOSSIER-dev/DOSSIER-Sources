#/bin/bash

# Reset the database to a fresh state
#
# Pass NO_CLI to not use the Docker CLI for interactive run and exec operations.
#
# WARNING: this ignores $SOURCES_MYSQL_HOST and $SOURCES_MYSQL_PORT,
# and assumes we have a db container we're using
#
# TODO: fix the above one day
#

set -e
source .env

if [[ "$@" == "NO_CLI" ]]
then
  export COMPOSE_INTERACTIVE_NO_CLI=1
  docker-compose exec db bash -c "mysqladmin -u ${SOURCES_MYSQL_USER} --password=${SOURCES_MYSQL_PASSWORD} drop ${SOURCES_MYSQL_DATABASE} -f"
else
  docker-compose exec db bash -c "mysqladmin -u ${SOURCES_MYSQL_USER} --password=${SOURCES_MYSQL_PASSWORD} drop ${SOURCES_MYSQL_DATABASE}"
fi

docker-compose exec db bash -c "mysqladmin -u ${SOURCES_MYSQL_USER} --password=${SOURCES_MYSQL_PASSWORD} create ${SOURCES_MYSQL_DATABASE} -f"
docker-compose exec db bash -c "mysql sources -u ${SOURCES_MYSQL_USER} --password=${SOURCES_MYSQL_PASSWORD} < /var/dump/testdb.sql"
docker-compose exec webapp /code/manage.py search_index --rebuild -f

exit $?
