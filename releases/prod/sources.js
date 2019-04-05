/**
 * SourcesJS starter file 201903271503
 */

(function() {
    function initSourcesJs() {

        // Location
        var prefix = 'https://sources.dossier.at/embed/lib/201903271503/';

        var scripts = ["runtime.26209474bfa8dc87a77c.js", "polyfills.1c32ca77a1c911a2d42c.js", "main.2051a71911061d8f1f11.js"];
        var styles = ["styles.1074fd5bfc7acd897461.css"];

        function linkResource(name) {
            return prefix + name;
        }

        for (var i = 0; i < scripts.length; i++) {
            var scriptTag = document.createElement('script');
            scriptTag.src = linkResource(scripts[i]);
            scriptTag.type = 'text/javascript';
            document.body.appendChild(scriptTag);
        }

        for (var i = 0; i < styles.length; i++) {
            var styleTag = document.createElement('link');
            styleTag.href = linkResource(styles[i]);
            styleTag.rel = 'stylesheet';
            document.head.appendChild(styleTag);
        }

        console.log('sources.js appended');
    }

    if (window.addEventListener) {
        // modern
        window.addEventListener('load', initSourcesJs);
    } else {
        // IE old
        window.attachEvent('onload', initSourcesJs);
    }

}());