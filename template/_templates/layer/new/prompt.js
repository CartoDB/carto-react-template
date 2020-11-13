// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
const fs = require('fs');
const path = require('path');
const { cwd } = require('process');
const { promptArgs } = require('../../promptUtils');
const { TYPES_SOURCE } = require('../../source/new/prompt');

const TYPES_LAYER = ['CartoSQLLayer', 'CartoBQTilerLayer'];

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
      choices: [...TYPES_LAYER],
    },
    {
      type: 'input',
      name: 'source',
      message: 'Source id:',
    },
  ]);

  let answers = await promptArgs({ prompter, args, questions });

  const cartoSliceFile = path.join(cwd(), 'src', 'config', 'cartoSlice.js');
  const existSource = await new Promise((resolve, reject) => {
    fs.readFile(cartoSliceFile, (err, data) => {
      if (err) reject();
      const source = `'${answers.source}'`;
      if (data.includes(source)) {
        return resolve(true);
      }
      return resolve(false);
    });
  });

  // const viewFile = path.join(cwd(), 'src', 'config', 'cartoSlice.js');
  // const existView = await new Promise((resolve, reject) => {
  //   fs.access(viewFile, function (err, data) {
  //     if (err) reject();
  //     return resolve(true);
  //   });
  // });

  if (!existSource) {
    questions = [
      {
        type: 'input',
        name: 'data',
        message:
          answers.type === TYPES_LAYER[0]
            ? 'Type a query or the name of your dataset'
            : 'Type the name of your tileset',
      },
    ];

    answers.type_source = TYPES_SOURCE[TYPES_LAYER.indexOf(answers.type)];

    answers = {
      ...answers,
      ...(await promptArgs({ prompter, args: answers, questions })),
    };
  } else {
    answers.data = '*';
    answers.type_source = TYPES_SOURCE[0];
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
  }

  answers = {
    ...answers,
    ...(await promptArgs({ prompter, args: answers, questions })),
  };

  return answers;
};

module.exports = {
  prompt,
};
