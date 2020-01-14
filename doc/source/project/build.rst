Build / Deployment
==================


The (sub-) projects can all be built with the `build-all` task.
The embed library main file `sources.js` has to be build with a separate task.

.. note::

   Make sure to build the main embed library file if you want to release a new version
   of the library with `npm run build:release`!

::


    # Build the frontend / typescript projects library, main-app,
    # embed script and micropage.
    npm run build-all

    # Create a new library release
    npm run build:release



