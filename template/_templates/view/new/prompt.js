// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
const { promptArgs } = require('../../promptUtils');

const prompt = async ({ prompter, args }) => {
  let questions = [
    {
      type: 'input',
      name: 'route',
      message: 'Link to route:',
    },
    {
      type: 'confirm',
      name: 'linked',
      message: 'Do you want a link in the menu?',
    },
  ];
  let answers = await promptArgs({ prompter, args, questions });

  return answers;
};

module.exports = {
  prompt,
};
