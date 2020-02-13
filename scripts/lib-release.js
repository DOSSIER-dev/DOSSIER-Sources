/**
 * lib-release.js
 *
 * The purpose of this script is to create the single javascript file that
 * needs to be included when using sourcesjs on a website. The library is
 * then bootstrapped by adding the actual project files - from a versioned
 * directory structure - as script tags to the document that includes the
 * starter file.
 *
 * The project files are collected from ./dist and copied to a versioned
 * directory (make sure the ./dist folder is up to date and contains the
 * correct builds). Replacements to the template file are made regarding the
 * script location (domain/url prefix and version).
 *
 * The script can be run with the optional arguments url-prefix build target
 * and version. If no version is specified, a version name based on a timestamp
 * is created automatically.
 *
 *    node lib-release.js URL_PREFIX TARGET_BUILD_DIR VERSION_NAME
 *
 * Example:
 *
 *    node lib-release.js https://my-domain.com/my-lib-dir stage
 *
 */
const fs = require('fs');
const path = require('path');
const template = require('es6-template-strings');
const { execSync } = require('child_process');
const process = require('process');

// Helper function for sorting js files by priority
function _getDistFilePriority(filename) {
  const HIGHEST = 0;
  const HIGH = 1;
  const LOW = 2;
  return filename.indexOf('runtime') !== -1
    ? HIGHEST
    : filename.indexOf('polyfill') !== -1
    ? HIGH
    : LOW;
}

// Get files by type and in the 'correct' order
function _getFileLists(files) {
  const jsfiles = files.filter(v => path.extname(v) == '.js' && v != 'sources.js');
  const cssfiles = files.filter(v => path.extname(v) == '.css');
  const sorted = jsfiles.sort((a, b) => _getDistFilePriority(a) - _getDistFilePriority(b));
  return {
    scripts: sorted,
    styles: cssfiles
  };
}

//
// Config: Host (url prefix) and target environment.
//
const url_prefix = process.argv[2] || 'https://sources.dossier.at/embed/lib/';
const build_prefix = process.argv[3] || 'prod';
const version_name = process.argv[4] || false;

//
// Config: where to find the built library and where to put the release
//
const ANGULAR_EMBED_LIB_DIR = './dist/embed-lib/';
const EMBED_LIB_RELEASE_DIR = './releases/';
const MAIN_SCRIPT_TEMPLATE = './sources.js.tmpl';
const MAIN_SCRIPT_FILENAME = 'sources.js';
const INCLUDE_GREETER = true;
const INCLUDE_DEMO = true;
const APPSERVER = 'http://localhost:8083';

// Create a version name by date
const version =
  version_name ||
  new Date()
    .toISOString()
    .slice(0, 16)
    .replace(/[T\-\:]/g, '');
const urlprefix = `${url_prefix}/${version}/`;

console.log(
  `Packaging embed library release: '${ANGULAR_EMBED_LIB_DIR}' -> '${EMBED_LIB_RELEASE_DIR}`
);
console.log(`Url prefix: '${url_prefix}'`);

// Read all files of the current library build
const distFiles = fs.readdirSync(ANGULAR_EMBED_LIB_DIR);
const fileLists = _getFileLists(distFiles);

// Create the starter sources.js file from the template
const templateContent = fs.readFileSync(MAIN_SCRIPT_TEMPLATE, 'utf8');
const replacedContent = template(templateContent, {
  scripts: JSON.stringify(fileLists.scripts),
  styles: JSON.stringify(fileLists.styles),
  version: version,
  prefix: JSON.stringify(urlprefix)
});

// Create versioned release directory and copy the files
const releaseEnvTarget = path.join(EMBED_LIB_RELEASE_DIR, build_prefix);
const versionedTarget = path.join(releaseEnvTarget, version);
execSync(`rm ${versionedTarget} -Rf`);
execSync(`mkdir -p ${versionedTarget}`);
execSync(`cp ${ANGULAR_EMBED_LIB_DIR}*.js ${versionedTarget}`);
execSync(`cp ${ANGULAR_EMBED_LIB_DIR}*.css ${versionedTarget}`);

// Copy the 'main', non - versioned file
// Write the non - versioned file that was created via the template.
// Its contents will load the rest of the build from the versioned
// (timestamped) release sub - folder.
const indexFile = path.join(releaseEnvTarget, MAIN_SCRIPT_FILENAME);
fs.writeFileSync(indexFile, replacedContent);
console.log(`Wrote ${indexFile} ...`);

// Copy a greeter index.html
if (INCLUDE_GREETER) {
  execSync(`cp demos/lib-index/index.html ${releaseEnvTarget}/index.html`);
}

// Copy a demonstration 'blog-post' file
if (INCLUDE_DEMO) {
  const demoContent = fs.readFileSync('demos/blog-usage/index.html', 'utf8');
  const replacedDemoContent = template(demoContent, {
    scriptlocation: url_prefix,
    app_server: APPSERVER
  });
  fs.writeFileSync(`${releaseEnvTarget}/demo.html`, replacedDemoContent);
}

console.log(`Created release version ${versionedTarget}`);
