// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
const { promptArgs, doesFileExists } = require('../../promptUtils');

const SOURCE_TYPES = ['sql', 'bq'];

const LAYER_TYPES = {
  [SOURCE_TYPES[0]]: {
    title: 'SQL dataset',
    msg: 'Type a query',
  },
  [SOURCE_TYPES[1]]: {
    title: 'BigQuery Tileset',
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

  // Check name to remove source word if the user added it by (his/her)self
  let answers = await promptArgs({ prompter, args, questions });
  answers.name = answers.name.replace('Source', '').replace('source', '');

  // Check if source already exists
  const fileName = [answers.name[0].toUpperCase(), ...answers.name.slice(1, answers.name.length)].join('')
  const doesSourceAlreadyExists = await doesFileExists(['src', 'data', 'sources', `${fileName}Source.js`]);
  if (doesSourceAlreadyExists) throw new Error(`The source ${answers.name} already exists.`);

  questions = [
    {
      type: 'select',
      name: 'type',
      message: 'Choose type',
      choices: [...Object.values(LAYER_TYPES)],
    },
  ];

  answers = {
    ...answers,
    ...(await promptArgs({ prompter, args, questions })),
  };

  answers.type =
    LAYER_TYPES[SOURCE_TYPES[0]].title === answers.type
      ? SOURCE_TYPES[0]
      : SOURCE_TYPES[1];

  questions = [
    {
      type: 'input',
      name: 'data',
      message: LAYER_TYPES[answers.type].msg,
    },
  ];

  return { ...answers, ...(await promptArgs({ prompter, args, questions })) };
};

module.exports = {
  prompt,
};
