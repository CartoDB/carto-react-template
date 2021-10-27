// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
const {
  promptArgs,
  checkName,
  PLATFORMS,
  getTypesImport,
} = require('../../promptUtils');

const { MAP_TYPES } = require('@deck.gl/carto');

const platform = process.env.CARTO_PLATFORM;

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

  if (platform === PLATFORMS.CARTO_3) {
    questions = [
      {
        type: 'input',
        name: 'connection',
        message: 'Enter a valid connection name',
      },
      {
        type: 'select',
        name: 'type',
        message: 'Choose type',
        choices: [...Object.values(MAP_TYPES)],
      },
    ];

    answers = {
      ...answers,
      ...(await promptArgs({ prompter, args: answers, questions })),
    };
  } else {
    questions = [
      {
        type: 'select',
        name: 'type',
        message: 'Choose type',
        choices: [MAP_TYPES.TILESET, MAP_TYPES.QUERY],
      },
    ];
  }

  answers = {
    ...answers,
    ...(await promptArgs({ prompter, args: answers, questions })),
  };

  answers.platform = platform;

  questions = [
    {
      type: 'input',
      name: 'data',
      message: `Enter a ${answers.type}`,
    },
  ];

  answers.type = getTypesImport(answers.type);

  answers = {
    ...answers,
    ...(await promptArgs({ prompter, args: answers, questions })),
  };
  
  return answers
};

module.exports = {
  prompt,
};
