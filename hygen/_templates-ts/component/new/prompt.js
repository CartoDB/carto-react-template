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

  questions = questions.concat([
    {
      type: 'confirm',
      name: 'add_style',
      message: 'Do you want to have custom styles?',
    },
  ]);

  return await promptArgs({ prompter, args, questions });
};

module.exports = {
  prompt,
};
