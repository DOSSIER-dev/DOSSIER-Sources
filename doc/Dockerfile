# Set up a container that will build the documentation
# Usage:
# docker build ./doc --tag sphinx-makedoc
# docker run -it --rm -u `id -u $USER` -v $PWD/doc:/doc/ sphinx-makedoc sphinx-build -b html doc/ doc/_build
FROM ubuntu:16.04
RUN apt-get update
RUN apt-get install python3-sphinx python3-pip -y
RUN pip3 install recommonmark
