/**
 * lib-release.js
 *
 * The purpose of this script is to create the single javascript file that
 * needs to be included when using sourcesjs on a website.
 * The library is then bootstrapped by adding the actual project files
 * as script tags.
 * The project files are collected and copied to a versioned directory (based
 * on a timestamp).
 * It can be run with two optional arguments, hostname and folder-prefix.
 *
 *  npm lib-release.js SOURCES_DOMAIN FOLDER_NAME
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

// Where to find the built library and where to put the release
const ANGULAR_EMBED_LIB_DIR = 'dist/embed-lib/';
const EMBED_LIB_RELEASE_DIR = 'releases/';
const MAIN_SCRIPT_TEMPLATE = 'sources.js.tmpl';
const MAIN_SCRIPT_FILENAME = 'sources.js';

// Host and environment
const hostname = process.argv[2] || 'sources.dossier.at';
const build_prefix = process.argv[3] || 'prod';

// Create a version name by date
const version = new Date()
  .toISOString()
  .slice(0, 16)
  .replace(/[T\-\:]/g, '');
const urlprefix = `https://${hostname}/embed/lib/${version}/`;

console.log(`Packaging embed library release from '${ANGULAR_EMBED_LIB_DIR}' to '${EMBED_LIB_RELEASE_DIR}',
for usage on '${hostname}'.`);

// Read all files of the current library build
const distFiles = fs.readdirSync(ANGULAR_EMBED_LIB_DIR);
const fileLists = _getFileLists(distFiles);

// Create the main libary file from a template file
const templateContent = fs.readFileSync(MAIN_SCRIPT_TEMPLATE, 'utf8');
const replaced = template(templateContent, {
  scripts: JSON.stringify(fileLists.scripts),
  styles: JSON.stringify(fileLists.styles),
  version: version,
  prefix: JSON.stringify(urlprefix)
});

// Write the non - versioned file that was created via the template.
// Its contents will load the rest of the build from the versioned
// (timestamped) release sub - folder.
const indexFile = path.join(ANGULAR_EMBED_LIB_DIR, MAIN_SCRIPT_FILENAME);
fs.writeFileSync(indexFile, replaced);
console.log(`Wrote ${indexFile} ...`);

// Create versioned release directory and copy files
const releaseEnvTarget = path.join(EMBED_LIB_RELEASE_DIR, build_prefix);
const versionedTarget = path.join(releaseEnvTarget, version);
execSync(`rm ${versionedTarget} -Rf`);
execSync(`mkdir -p ${versionedTarget}`);
execSync(`cp ${ANGULAR_EMBED_LIB_DIR}*.js ${versionedTarget}`);
execSync(`cp ${ANGULAR_EMBED_LIB_DIR}*.css ${versionedTarget}`);

// Copy the 'main', non - versioned file
execSync(`cp ${ANGULAR_EMBED_LIB_DIR}sources.js ${releaseEnvTarget}`);
execSync(`cp demos/lib-index/index.html ${releaseEnvTarget}`);

console.log(`Created release version ${versionedTarget}`);
