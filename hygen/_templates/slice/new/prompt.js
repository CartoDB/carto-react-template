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

  if (!args.ts) {
    questions = questions.concat([
      {
        type: 'confirm',
        name: 'ts',
        message: 'Do you want TypeScript?',
      },
    ]);
  }

  let { name } = await promptArgs({ prompter, args, questions });
  name = name.replace('Slice', '').replace('slice', '');

  return { name, file_name: `${name}Slice` };
};

module.exports = {
  prompt,
};
