#!/bin/bash
docker-compose exec db bash -c 'mysqldump sources -u root --password=root > /var/dump/testdb.sql'
