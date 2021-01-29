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
    .reduce((total, file) => {
      // Process file name to convert it to object with path
      const processedFile = typeof file === 'string'
        ? { path: file.split('src/')[file.split('src/').length - 1], name: file.split('/')[file.split('/').length - 1] }
        : file;

      if (processedFile.name.includes('.js')) {
        total.push(processedFile);
      }

      return total
    }, []);
}

function doesFileExists (pathArray) {
  const viewFile = path.join(cwd(), ...pathArray);

  return new Promise((resolve) => {
    fs.access(viewFile, fs.F_OK, (err) => {
      if (err) resolve(false);
      return resolve(true);
    });
  });
}

function checkName (name, suffix) {
  return name.replace(suffix, '').replace(suffix.toLowerCase(), '') + suffix;
}

const VIEWS_DIR = 'components/views'

async function getViews () {
  const viewFiles = await getFiles(`src/${VIEWS_DIR}`);
  const viewOpts = viewFiles.reduce((total, { path, name }) => {
    name = name.replace('.js', '');
    if (/[A-Z]/.test(name[0])) {
      total.push({
        title: `${name}${path !== `${VIEWS_DIR}/${name}` ? ' ('+ path.replace(VIEWS_DIR, 'views') +')' : ''}`
      });
    }
    return total;
  }, []);
  return [viewFiles, viewOpts];
}

function createFolder (folderPath) {
  const fullPath = path.join(cwd(), folderPath);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath);
  }
}

function pascalCase2KebabCase (str) {
  return str.split('').map((letter, idx) => {
    return letter.toUpperCase() === letter
      ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
      : letter;
  }).join('');
}

function moveFile (from, to) {
  fs.rename(from, to, _ => {})
}

module.exports = {
  promptArgs,
  doesFileExists,
  getFiles,
  readFile,
  checkName,
  getViews,
  VIEWS_DIR,
  createFolder,
  moveFile,
  pascalCase2KebabCase,
  camelCase2KebabCase: pascalCase2KebabCase
};
