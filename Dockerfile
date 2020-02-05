FROM nginx:1.17

# Remove unwanted default files
RUN rm /etc/nginx/conf.d/default.conf -f

# Copy inclde parts of configuration
# Config for enabled sites will be mounted in
COPY conf/nginx/inc /etc/nginx/inc

# Copy the client apps
COPY dist /files/apps

# Library
COPY releases /files/embed/lib

# Demo website
COPY demos/blog-usage /files/embed/demo

# Documentation
COPY doc/_build /files/doc

# Set up volumes for both config and files locations
# This allows to access the volumes using *antother* contrainer with sth like
# `docker run -it --volumes-from hivelog_nginx_1 --name mynginx4files debian /bin/bash`
# VOLUME /etc/nginx
# VOLUME /files

