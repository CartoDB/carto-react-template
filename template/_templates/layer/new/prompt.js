// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
const fs = require('fs');
const path = require('path');
const { cwd } = require('process');
const { promptArgs } = require('../../promptUtils');

const TYPES = ['CartoSQLLayer', 'CartoBQTilerLayer'];

const prompt = async ({ prompter, args }) => {
  let questions = [
    {
      type: 'select',
      name: 'type',
      message: 'Choose type',
      choices: [...TYPES],
    },
    {
      type: 'input',
      name: 'source',
      message: 'Source id:',
    },
  ];

  let answers = await promptArgs({ prompter, args, questions });

  const cartoSliceFile = path.join(cwd(), 'src', 'config', 'cartoSlice.js');
  const existSource = await new Promise((resolve, reject) => {
    fs.readFile(cartoSliceFile, function (err, data) {
      if (err) reject();
      const source = `'${answers.source}'`;
      if (data.includes(source)) {
        return resolve(true);
      }
      return resolve(false);
    });
  });

  if (!existSource) {
    questions = [
      {
        type: 'input',
        name: 'data',
        message:
          answers.type === TYPES[0]
            ? 'Type a query or the name of your dataset'
            : 'Type the name of your tileset',
      },
    ];

    answers = {
      ...answers,
      ...(await promptArgs({ prompter, args: answers, questions })),
    };
  } else {
    answers['data'] = '';
  }

  return answers;
};

module.exports = {
  prompt,
};
