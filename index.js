const fs = require('fs');
const path = require('path');
const process = require('process');

/**
  Replace .js import path to .cjs or .mjs to comply with modules package

  1. Will scan *.js files in folder (not **\*.js!)
  2. Will read *.js files as string, replace *.js import path to the file format you wish to
  3. Will write changes to *.cjs or *.mjs
**/
class ReplaceJS {
  constructor(extensions, directory) {
    this.dir = path.join(process.cwd(), directory);
    this.ext = this.checkExt(extensions);
    this.files = this.loadFiles(this.dir);
  }
  checkExt(extensions) {
    if (!(extensions.includes('cjs') || extensions.includes('mjs'))) {
      throw new Error('Extension should be either cjs or mjs!');
    }
    return extensions.includes('.') ? extensions : `.${extensions}`;
  }
  loadFiles(dir) {
    const files = fs.readdirSync(dir).filter(f => f.includes('.js'));
    if (files.length === 0) {
      throw new Error('Nothing to replace');
    }
    return files;
  }
  replaceAndWrite(files) {
    const fileNames = files.map(f => {
      return {
        index: files.indexOf(f),
        oldName: f,
        newName: f.replace('.js', this.ext)
      };
    });
    const contents = files.map(f => fs.readFileSync(path.join(this.dir, f), { encoding: 'utf8' })).map(c => {
      let d = c;
      fileNames.map(f => { d = d.replace(f.oldName, f.newName); });
      return d;
    });
    fileNames.map(({index, newName}) => fs.writeFileSync(path.join(this.dir, newName), contents[index]));
    return fileNames.length;
  }
  start() {
    return this.replaceAndWrite(this.files);
  }
}

module.exports = ReplaceJS;
