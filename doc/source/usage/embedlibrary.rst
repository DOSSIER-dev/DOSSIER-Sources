Sources JS Embed Library
========================

The sources ''embed'' library is a bit of javascript that, when added to
a webpage, will transform and augment the webpage so that the sources found
on it are connected with the sources stored on the sources app server.

See `adding sources js` for ways to add the sources embedd library to
your web site.

How Sources JS parses and transforms the page
---------------------------------------------

- look for sources links
- connect the links with the sources app server (link to micropage)
- optionally render a summary "linkbox"
- optionally show mouse-over, hovering information
- optionally transmit usage statistics

Adding Sources JS
-----------------

Include the sources starter file.

::

     <script type="text/javascript" src="[SOURCES_APP_SERVER]/embed/lib/sources.js"></script>

Sources JS Embed Options
------------------------

- sources app server
- render link box
- render hover overlays


Implementation
--------------

The starter file adds script tags that contain the actual embed library.