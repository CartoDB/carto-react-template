// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
const fs = require('fs');
const path = require('path');
const { cwd } = require('process');
const { promptArgs } = require('../../promptUtils');

const TYPES_SOURCE = ['sql', 'bq'];

const TYPES_LAYER = {
  [TYPES_SOURCE[0]]: {
    title: 'SQL dataset',
    className: 'CartoSQLLayer',
    msg: 'Type a query',
  },
  [TYPES_SOURCE[1]]: {
    title: 'BigQuery Tileset',
    className: 'CartoBQTilerLayer',
    msg: 'Type the name of your tileset',
  },
};

const prompt = async ({ prompter, args }) => {
  let questions = [];

  if (!args.name) {
    questions.push({
      type: 'input',
      name: 'name',
      message: 'Name:',
    });
  }

  questions = questions.concat([
    {
      type: 'select',
      name: 'type',
      message: 'Choose type',
      choices: [...Object.values(TYPES_LAYER)],
    },
  ]);

  let answers = await promptArgs({ prompter, args, questions });

  answers.type_source =
    TYPES_LAYER[TYPES_SOURCE[0]].title === answers.type
      ? TYPES_SOURCE[0]
      : TYPES_SOURCE[1];
  answers.type_className = TYPES_LAYER[answers.type_source].className;

  questions = [
    {
      type: 'input',
      name: 'data',
      message: TYPES_LAYER[answers.type_source].msg,
    },
  ];

  answers = {
    ...answers,
    ...(await promptArgs({ prompter, args: answers, questions })),
  };

  questions = [
    {
      type: 'confirm',
      name: 'attach',
      message: 'Do you want to attach to some view',
    },
  ];

  answers = {
    ...answers,
    ...(await promptArgs({ prompter, args: answers, questions })),
  };

  if (answers.attach) {
    questions = [
      {
        type: 'input',
        name: 'view',
        message: 'View name: ',
      },
    ];
    answers = {
      ...answers,
      ...(await promptArgs({ prompter, args: answers, questions })),
    };

    const viewFile = path.join(cwd(), 'src', 'components', 'views', `${answers.view}.js`);

    const existView = await new Promise((resolve) => {
      fs.access(viewFile, fs.F_OK, (err) => {
        if (err) resolve(false);
        return resolve(true);
      });
    });

    if (!existView) {
      throw new Error(`The view doesn't exist`);
    }
  }

  return answers;
};

module.exports = {
  prompt,
};
