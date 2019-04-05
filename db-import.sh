#/bin/bash

## Reset the database to a fresh state
##
## Pass NO_CLI to not use the Docker CLI for interactive run and exec operations.

set -e

if [[ "$@" == "NO_CLI" ]]
then
  export COMPOSE_INTERACTIVE_NO_CLI=1
  docker-compose exec db bash -c 'mysql -u root --password=root -e "drop database if exists sources"'
else
  docker-compose exec db bash -c 'mysqladmin -u root --password=root drop sources'
fi

docker-compose exec db bash -c 'mysqladmin -u root --password=root create sources -f'
docker-compose exec db bash -c 'mysql sources -u root --password=root < /var/dump/testdb.sql'
docker-compose exec webapp /code/manage.py search_index --rebuild -f

exit $?
