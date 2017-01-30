const budo = require('budo');
const argv = require('minimist')(process.argv.slice(2));
const babelify = require('babelify');
const path = require('path');
const browserify = require('browserify');
const fs = require('fs')

const entry = argv._[0];
const examplesDir = path.resolve(__dirname, 'examples');
const fileName = entry ? `${entry}.js` : 'index.js';
const entryFile = path.resolve(__dirname, `${examplesDir}/src`, fileName);

if (argv._[1] === 'build') {
  build();
} else {
  startDev();
}
function startDev() {
  // console.log(path.join(entry, 'index.js'));
  budo(entryFile, {
    serve: `${entry}/bundle.js`,
    open: true,
    live: true,             // live reload
    dir: examplesDir,
    browserify: {
      transform: babelify,
    },
  });
}

function build() {
  console.log('cc');
  const b = browserify(entryFile, {
    debug: false,
  });
  b.bundle((err, src) => {
    fs.writeFile(`${examplesDir}/${entry}/bundle.js`, src, (err) => {
    });
  });
}
