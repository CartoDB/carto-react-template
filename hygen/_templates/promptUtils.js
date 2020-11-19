async function promptArgs({ prompter, args, questions }) {
  const answers = await prompter.prompt(questions.filter(({ name }) => !args[name]));
  return { ...answers, ...args };
}

module.exports = {
  promptArgs,
};
