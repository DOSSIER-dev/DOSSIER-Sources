/**
 * SourcesJS starter file 201812021405
 */

(function() {
    function initSourcesJs() {

        // Location
        var prefix = 'https://sources.tt4.at/embed/lib/201812021405/';

        var scripts = ["runtime.06daa30a2963fa413676.js", "polyfills.1092cb3c6c91fddadabc.js", "main.d080df44006bbbfe7f07.js"];
        var styles = ["styles.f33f2b342958a52028ed.css"];

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