#!/usr/bin/env node
const ReplaceJS = require('./index');
const process = require('process');

const J2C = () => {
  const args = process.argv.slice(2);
  if (args.length !== 2) {
    console.log('USAGE');
    console.log('  $ js-to-cjs <extension> <dir>','\n');
    console.log('DESCRIPTION');
    console.log('  Replace .js with .cjs / .mjs recursively','\n');
    console.log('EXAMPLES');
    console.log('  $ js-to-cjs cjs <dir>','\n');
    console.log('  $ js-to-cjs mjs <dir>','\n');
    return;
  }
  const replace = new ReplaceJS(args[0], args[1]);
  const length = replace.start();
  console.log(`Replaced ${length} js files to ${args[0]} format`);
};

J2C();
