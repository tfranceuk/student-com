Student.com Frontend Task
=========================

Setup
-----
To run this site, clone this repo, then do one of the following:
* Open the `index.html` file to run from filesystem
* Run as node application:
  * `npm install`
  * `node host.js [<PORT>]` where port is optional and defaults to 3000
  * browse to root of domain, [http://localhost:3000](http://localhost:3000)

App Structure
-------------
The `index.html` is the single page.  Content that supports it is in the `/content` and `/bower_components` directories, including images, css and js files.  The `bower.json` and `packages.json` files at the root are used to specify dependencies.  _The `bower_components` directory has been included in the repo for ease of demo, but I would normally ignore from repo, and `bower install` would be a build step._

Page Design
-----------
The page has been designed for simplicity and cleanliness, and is responsive to different screen sizes.
Icons have been used to give the user a quick, clear and unobtrusive indicator as to their related content, and the images are expandable upon clicking.

On mobile compared to desktop:
* The header takes up less space
* The summary bar's (grey bar below header) contents flow underneath each other
* The property images flow below the facilities
* The list of room types disappears to be replaced by a single room type, with a select box for the user to show a different one

Tools and Tech
--------------
### Build tools
npm was chosen as it is a popular package manager for node server components that is also great for installing build tools, and with my existing knowledge of it, I could utilise it immediately.  It was used to install Stylus and Bower command line/build tools, and to install express for part of the node hosting.

Stylus has been used to compile the custom css (`content/css/app.styl` -> `content/css/app.css`). Stylus was chosen as it is a powerful, modern css pre-processor, that allowed me to write shorter, easier to follow stylings for my page.  It is very similar to others such as Sass and Less.

Bower was chosen as a clientside dependency manager, as it allows for easy installation and management of dependencies.  jQuery, fancybox and Handlebars were installed through it.

### Libraries
Bootstrap ("Paper" theme) has been used to provide basic styling and responsive grid layouts.  I chose this for it's powerful responsive classes and clean, simple style, and for my existing knowledge of it.

jQuery has been used for DOM manipulation.  It was the obvious choice for this requirement.  I needed to do some DOM manipulation for showing a single room type in mobile view and responsing to user's selection to replace this using a fade out/in transition.

Handlebars has been used to compile and render the Room Type html template.  I chose this over angular, as angular is too heavyweight for the requirements of this page, and all I would have needed from it was one time template binding.  Handlebars was the perfect choice, as it solves exactly this requirement, and no more.

fancybox was chosen to provide image expansion and navigation functionality as it has a clean and conventional design, and supports swiping on mobile devices.

_see `content/app.js` for javascript, and usage of the above libraries.  This has been left un-minified for ease of reading._






