// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
const { promptArgs } = require('../../promptUtils');

const TYPES_SOURCE = ['SQL dataset', 'BigQuery Tileset'];
const TYPES_SOURCE_LOCALES = ['sql', 'bigquery'];

const prompt = async ({ prompter, args }) => {
  let questions = [];
  if (args.name && !args.id) {
    args.id = args.name;
  }

  if (!args.id) {
    questions.push({
      type: 'input',
      name: 'id',
      message: 'ID:',
    });
  }

  questions.push({
    type: 'select',
    name: 'type',
    message: 'Choose type',
    choices: [...TYPES_SOURCE],
  });
  let answers = await promptArgs({ prompter, args, questions });

  questions = [
    {
      type: 'input',
      name: 'data',
      message:
        answers.type === TYPES_SOURCE[0]
          ? 'Type a query or the name of your dataset'
          : 'Type the name of your tileset',
    },
  ];

  answers.type = TYPES_SOURCE_LOCALES[TYPES_SOURCE.indexOf(answers.type)];

  answers = {
    ...answers,
    ...(await promptArgs({ prompter, args: answers, questions })),
  };

  return answers;
};

module.exports = {
  prompt,
  TYPES_SOURCE,
};
