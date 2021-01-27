// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
const { promptArgs } = require('../../promptUtils');

const prompt = async ({ prompter, args }) => {
  let questions = [];

  if (!args.name) {
    questions.push({
      type: 'input',
      name: 'name',
      message: 'Name:',
    });
  }

  let { name } = await promptArgs({ prompter, args, questions });
  name = name.replace('Model', '').replace('model', '') + 'Model';

  return { name };
};

module.exports = {
  prompt,
};
