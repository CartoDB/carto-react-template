// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
const fs = require('fs');
const path = require('path');
const { cwd } = require('process');
const { promptArgs } = require('../../promptUtils');

const TYPES_LAYER = {
  sql: {
    title: 'SQL dataset',
    className: 'CartoSQLLayer',
  },
  bq: {
    title: 'BigQuery Tileset',
    className: 'CartoBQTilerLayer',
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
      choices: [TYPES_LAYER['sql'], TYPES_LAYER['bq']],
    },
  ]);

  let answers = await promptArgs({ prompter, args, questions });

  answers.type_source = TYPES_LAYER['sql'].title === answers.type ? 'sql' : 'bq';

  questions = [
    {
      type: 'input',
      name: 'data',
      message:
        answers.type_source === 'sql' ? 'Type a query' : 'Type the name of your tileset',
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
