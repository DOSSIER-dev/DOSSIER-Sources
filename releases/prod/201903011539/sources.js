/**
 * SourcesJS starter file 201903011539
 */

(function() {
    function initSourcesJs() {

        // Location
        var prefix = 'https://sources.dossier.at/embed/lib/201903011539/';

        var scripts = ["runtime.a5dd35324ddfd942bef1.js", "polyfills.d4967e0a7ed87e9d05a7.js", "main.2b14bc1935ac5b9ebc7f.js"];
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