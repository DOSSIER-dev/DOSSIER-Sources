/**
 * SourcesJS starter file 201810291314
 */
window.onload = function () {

    // Location
    var prefix = 'https://sources-stage.dossier.at/embed/lib2/201810291314/';

    var scripts = ["runtime.ec2944dd8b20ec099bf3.js", "polyfills.cab7459b202e0a07dc6c.js", "main.7288127580b81d625aeb.js"];
    var styles = ["styles.3f4575d991e2f848ed00.css"];

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