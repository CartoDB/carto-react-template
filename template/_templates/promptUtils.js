async function promptArgs({ prompter, args, questions }) {
  // const providedArgs = questions.reduce((selectedArgs, question) => {
  //   if (args[question.name]) selectedArgs[question.name] = args[question.name];
  //   return selectedArgs;
  // }, {});
  const answers = await prompter.prompt(questions.filter(({ name }) => !args[name]));
  return { ...answers, ...args };
}

module.exports = {
  promptArgs,
};
