const fs = require('fs');
const path = require('path');
const { cwd } = require('process');
const { promisify } = require('util');
const { resolve } = require('path');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const { MAP_TYPES } = require('@deck.gl/carto');
const { config } = require('dotenv');

config();

const PLATFORMS = {
  CARTO_2: 'carto-2',
  CARTO_3: 'carto-3',
};

const platform = process.env.CARTO_PLATFORM;

if (!platform) {
  throw new Error(
    'Not defined CARTO_PLATFORM environment variable. Please add it to .env or set it manually.'
  );
}

if (!Object.values(PLATFORMS).includes(platform)) {
  throw new Error(
    `Wrong value for CARTO_PLATFORM environment variable. Posile values are ${Object.values(
      PLATFORMS
    )}.`
  );
}

async function promptArgs({ prompter, args, questions }) {
  const answers = await prompter.prompt(questions.filter(({ name }) => !args[name]));
  return { ...answers, ...args };
}

function readFile(filePath) {
  return fs.readFileSync(path.join(cwd(), filePath), { encoding: 'utf8' });
}

async function getFiles(dir) {
  const subdirs = await readdir(dir);
  const files = await Promise.all(
    subdirs.map(async (subdir) => {
      const res = resolve(dir, subdir);
      return (await stat(res)).isDirectory() ? getFiles(res) : res;
    })
  );

  const processedFiles = files
    .reduce((a, f) => a.concat(f), [])
    .reduce((total, file) => {
      // Process file name to convert it to object with path
      let processedFile;
      if (typeof file === 'string') {
        processedFile = {
          path: file.split(`src${path.sep}`)[file.split(`src${path.sep}`).length - 1],
          name: file.split(path.sep)[file.split(path.sep).length - 1],
        };
      } else {
        processedFile = file;
      }

      if (processedFile.name.includes('.js')) {
        total.push(processedFile);
      }

      return total;
    }, []);

  return processedFiles;
}

async function doesFileExists(pathArray) {
  const viewFile = path.join(cwd(), ...pathArray);

  return new Promise((resolve) => {
    fs.access(viewFile, fs.F_OK, (err) => {
      if (err) resolve(false);
      return resolve(true);
    });
  });
}

function checkName(name, suffix) {
  return name.replace(suffix, '').replace(suffix.toLowerCase(), '') + suffix;
}

function getTypesImport(type) {
  if (!Object.values(MAP_TYPES).includes(type)) {
    throw new Error(`Unknown Map type ${type}`);
  }
  return `MAP_TYPES.${type.toUpperCase()}`;
}
module.exports = {
  promptArgs,
  doesFileExists,
  getFiles,
  readFile,
  checkName,
  getTypesImport,
  PLATFORMS,
};
