const fs = require('fs');
const path = require('path');
const { cwd } = require('process');
const { promisify } = require('util');
const { resolve } = require('path');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function promptArgs({ prompter, args, questions }) {
  const answers = await prompter.prompt(questions.filter(({ name }) => !args[name]));
  return { ...answers, ...args };
}

function readFile(filePath) {
  return fs.readFileSync(path.join(cwd(), filePath), { encoding: 'utf8' });
}

async function getFiles(dir) {
  const subdirs = await readdir(dir);
  const files = await Promise.all(subdirs.map(async (subdir) => {
    const res = resolve(dir, subdir);
    return (await stat(res)).isDirectory() ? getFiles(res) : res;
  }));
  return files
    .reduce((a, f) => a.concat(f), [])
    .map(file => (typeof file === 'string' ? { path: file.split('src/')[file.split('src/').length - 1], name: file.split('/')[file.split('/').length - 1] } : file))
    .filter(({ name }) => /[A-Z]/.test(name[0]) && name.includes('.js'));
}

async function doesFileExists (pathArray) {
  const viewFile = path.join(cwd(), ...pathArray);

  return await new Promise((resolve) => {
    fs.access(viewFile, fs.F_OK, (err) => {
      if (err) resolve(false);
      return resolve(true);
    });
  });
}

module.exports = {
  promptArgs,
  doesFileExists,
  getFiles,
  readFile,
};
