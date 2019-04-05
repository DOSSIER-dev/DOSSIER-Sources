### Help

# Adding a Source

![](/assets/markdown/images/sources-screen-add_source.jpg)

## 1. Upload or link your source
After choosing your source type, you can upload your document or image or fill in the URL to a YouTube or Vimeo video.
## 2. Add information
In order to maintain a well-structured archive of sources, it is recommended to add as much information to the source as possible.

### Information that can be added to a source:

* **Title:** a short title for the source (the title is also visible to readers)
* **Confidentiality:** As a default, every new source is “confidential”. In order for readers to be able to access a source, it has to be set to “public”.
* **Description:** a short summary of what the whole source is about (the description is also visible to readers)
* **Collection:** See Collections (below) for more information.
* **Story:** See Stories (below) for more information.
* **Tags:** See Tags (below) for more information.
* **Country:** the country of origin to be selected from a list
* **Language:** the language of the source
* **Date:** the date when the original source was first published
* **Original source:** information about the origin of the source (e.g. ISBN, ISSN, URL to a website)

## 3. Add annotations

Annotations play a crucial role in giving readers easy access to a relevant passage of a source. Apart from embedding entire sources, it is also possible (and encouraged) to embed specific annotations into a story. If a reader clicks on an embed link, the annotation with the corresponding page respectively time is displayed.

### Annotations for documents and images
After clicking “Add annotation”, an area can be assigned by clicking and dragging.

### Annotations for videos
Go to the time to which the annotation should be assigned and click “Add annotation”.

### Information that can be assigned to an annotation
* **Confidentiality:** As a default, every new annotation is “confidential”. In order for readers to be able to access an annotation, it has to be set to “public”.
* **Title:** a short title for the annotation (the title is also visible to readers)
* **Description:** a short summary of what the annotated passage is about (the description is also visible to readers)

## 4. Bookmark a source
If you want a specific source to be easily retrievable for you, bookmark it by clicking the star icon above the source’s title. The source is then available on your welcome page as well as under “Bookmarks”.

## Additional information automatically added to a source
* **Statistics:** the number of times the source was viewed outside the web application
* **Contributor:** the user who initially added the source
* **Added:** the date when the source was added
* **Published:** the date when the source was first set to “public”

# Sharing and Embedding a Source
Once you have added the information to a source and saved it, you can both share it with your team or immediately embed it into your story.

## Embedding a source
Simply copy the “Embed Link” and paste it as a link to your story. Make sure your source’s confidentiality is set to “public”. If you want to embed an annotation, simply use the annotation’s “Embed Link”.

![](/assets/markdown/images/sources-screen-embed.jpg)

## Micropages
Readers as well as editors can simply share public sources by copying the “Embed Link” and pasting it into the browser address bar. This also works with annotation links.

![](/assets/markdown/images/sources-screen-micropage.jpg)

## Share a source with your team
For internal access to a source, use the “App Link” (for both entire sources and annotations) and share it with your team. This ensures that the source is displayed within the Sources web application and also allows access to “confidential” sources if the team member is logged in.

# Source Types
For now, there are three types of sources available:

* Document: mostly PDF documents containing one or multiple pages
* Image: single images like facsimile, screenshots or photos
* Video: videos hosted on YouTube

See [GitHub] for the implementation of additional source types and supported video platforms.

# Collections, Stories and Tags
In order to organize your sources efficiently and to still keep a simple structure, sources can be organized in three ways:

## Collections
“Collections” are big clusters for sources, such as topics or entire projects. Only administrators can add or change collections.

## Stories
A “story” contains all the sources that helped you to write a story. In a perfect world, the story’s name in *Sources* matches your story’s title in your publication. A source can be added to multiple “stories”. Keep in mind that all the information added to a source (including annotations) is then also part of the source assigned to other “stories”.

## Tags
The purpose of “tags” is to help you to find sources that are spread across collections and stories. For instance, sources can be tagged with “Ministry of Finance” – this allows any user to find all sources related to the Ministry of Finance.

### Naming scheme
Conventions for naming tags can help your team to have a consistent approach on how to use tags and helps you to avoid tags from becoming cluttered.

* **Type of source:** How would you describe the type of the source in one to two words (e.g. invoice, letter, email, leaked document, government publication)?
* **Persons:** Who is the author of the source? Who are the persons mentioned in the source?
* **Organisations:** Which organisation published the source? Which organisations are covered in the source?
* **Topics:** What are general topics (e.g. money laundering, government advertising, armaments industry)?

# User Rights & Administration
There are two levels of user privileges:

1. Editors
2. Admins

Editors can access and edit all the information related to single sources as well as their account settings.

## Administration for editors
* Add, edit and delete stories
* Add and edit tags

## Administration for admins
Admins have access to both additional administration within the *Sources* application and the Django backend.

## *Sources* application administration
* Change the team’s name
* Add, edit and delete collections
* Add, edit and delete stories
* Add, edit and delete tags
* Add, edit and delete users

## *Django* backend administration
Additionally, the *Django* backend allows the following administration:

* Add, edit and delete teams
* Add, edit and delete bookmarks
* Add, edit and delete files
* Add, edit and delete tracking data
* Delete Auth Tokens

The *Django* backend can be accessed by appending /admin to the URL: sources.dossier.at/admin

# Statistics

No sensitive personal information is collected from readers.

## Personal statistics
After logging into *Sources,* a short summary of the sources you contributed is displayed:

* Number of sources you contributed
* Total number of views of sources you contributed

## Single source statistics
For each source, the number of views outside the web application (embed and micropage) is displayed.

## Inventory
The inventory shows the growth of the team’s archive on a timeline. A specific time frame can be chosen to get a more detailed view.

## Source views
Each view of a source outside the web application (embed and micropage) is tracked. The statistics distinguish between views on a micropage and embeds.

# Website Implementation
You can find the Sources repository on [GitHub.](https://github.com/DOSSIER-dev/DOSSIER-Sources)