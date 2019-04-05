# Welcome to DOSSIER *Sources!*

*Sources* is a web application that allows your team to store, manage and annotate your sources and to make them easily available to your readers by embedding them into your stories.

*Source* thereby strengthens and sustains your organisation’s credibility.

![](/assets/markdown/images/sources-screen-welcome.jpg)

## *Sources* allows you to:

* Organise sources efficiently in one central place and keep them safe
* Easily embed sources into your stories
* Make otherwise hidden sources readily available for your readers
* Prove that your stories are truly fact-based

## What *Sources* does for your readers

### *Sources* highlights links that refer to a source:

![](/assets/markdown/images/sources-screen-source_link.jpg)

### By clicking that link, an overlay that shows the corresponding source will appear:

![](/assets/markdown/images/sources-screen-embed.jpg)

### If you have added an annotation to a source, your reader will directly be presented with the corresponding passage of your source:

![](/assets/markdown/images/sources-screen-annotation.jpg)

# Workflow in Your Team

To add a source to your story, all you have to do is to:

1.	Upload the source
2.	Copy the public link to the source
3.	Add the link to your story

# Implementing *Sources* in Your Website

To allow your website to render *Sources,* only one line of JavaScript is necessary:

```
<script type="text/javascript" src="https://[your Sources URL]/embed/lib/sources.js"></script>
```

From there, *Sources* will handle the rest:

1.	It will check if there are links pointing to sources.dossier.at.
2.	It will replace the links with source links.
3.	If a reader clicks a source link, it will bring up an overlay that shows the corresponding source.

You can also tweak *Sources* to your liking:

```
<script>
window.sourcesjs = {
  linkbox: false, // Render an element with a list of all sources found on the page
  hoverbox: false, // Display an infobox when hovering over a source link
  appserver: 'https://[your Sources URL]', // The hostname of the Sources installation
  linkClassName: 'sourcesjs-parsed', // A CSS-class that is added to a source link
  linkIcon: true // Add the Sources SVG icon to source links
};
</script>
```

# *Sources* for Your Team or Organisation
For now, you can host your own instance of *Sources* on your server. We are currently looking into hosting *Sources* for your organisation at a scalable pricing, making it also affordable for smaller organisations. Learn more [about Sources](https://sources.dossier.at/about) or get in touch with us via <sources@dossier.at>.

# *Sources* is Open Source

*Sources* is published under the MIT license. You can find the repository on [GitHub](https://github.com/DOSSIER-dev/DOSSIER-Sources). *Sources* is fully functional but still in an early phase of development – so we are looking forward to your ideas and contributions!
