#!/bin/bash
#
# WARNING: this ignores $SOURCES_MYSQL_HOST and $SOURCES_MYSQL_PORT,
# and assumes we have a db container we're using
#
# TODO: fix the above one day
#

set -e
source .env
docker-compose exec db bash -c "mysqldump ${SOURCES_MYSQL_DATABASE} -u ${SOURCES_MYSQL_USER} --password=${SOURCES_MYSQL_PASSWORD} > /var/dump/testdb.sql"
