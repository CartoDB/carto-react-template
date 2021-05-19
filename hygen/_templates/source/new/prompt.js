// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
const {
  promptArgs,
  checkName,
  MODES,
  getTypesImport,
  getProvidersImport,
  getValidTypesForProvider,
} = require('../../promptUtils');

const { MAP_TYPES, PROVIDERS } = require('@deck.gl/carto');

const mode = process.env.CARTO_REACT_MODE || MODES.CARTO;

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
  answers.name = checkName(answers.name, 'Source');

  questions = [
    {
      type: 'select',
      name: 'provider',
      message: 'Choose provider',
      choices: [...Object.values(PROVIDERS)],
    },
  ];

  answers = {
    ...answers,
    ...(await promptArgs({ prompter, args: answers, questions })),
  };

  if (mode === MODES.CARTO_CLOUD_NATIVE) {
    questions.push( 
      {
        type: 'input',
        name: 'connection',
        message: 'Enter a valid connection name',
      },
      {
        type: 'select',
        name: 'type',
        message: 'Choose type',
        choices: getValidTypesForProvider(answers.provider),
      },
    );
  }

  answers = {
    ...answers,
    ...(await promptArgs({ prompter, args: answers, questions })),
  };

  answers.mode = mode;

  questions = [
    {
      type: 'input',
      name: 'data',
      message: `Enter a ${answers.type}`,
    },
  ];

  answers.type = getTypesImport(answers.type);

  if (mode === MODES.CARTO_CLOUD_NATIVE) {
    answers.provider = getProvidersImport(answers.provider);
  }

  return { ...answers, ...(await promptArgs({ prompter, args: answers, questions })) };
};

module.exports = {
  prompt,
};
