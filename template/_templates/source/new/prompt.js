// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
const { Select, Input } = require('enquirer');
const { createPrompt } = require('../../promptUtils');

const TYPES = ['SQL dataset', 'Tileset'];

module.exports = {
  prompt: async () => {
    const answers = {};

    answers['type'] = await createPrompt(
      new Select({
        name: 'type',
        message: `Choose type:`,
        choices: [...TYPES],
      })
    );

    answers['data'] = await createPrompt(
      new Input({
        name: 'data',
        message:
          answers.type === TYPES[0]
            ? 'Type a query or the name of your dataset'
            : 'Type the name of your tileset',
      })
    );

    return answers;
  },
};
