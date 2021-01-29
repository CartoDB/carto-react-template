// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
const { promptArgs, getViews, createFolder, pascalCase2KebabCase, moveFile } = require('../../promptUtils');

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
      type: 'input',
      name: 'route',
      message: 'Route path:',
    },
    {
      type: 'confirm',
      name: 'linked',
      message: 'Do you want a link in the menu?',
    },
  ]);

  let answers = await promptArgs({ prompter, args, questions });

  if (!answers.route.startsWith('/')) {
    answers.route = `/${answers.route}`
  }

  questions = [
    {
      type: 'confirm',
      name: 'is_child',
      message: 'Is this view a child of a certain view?',
    },
  ];

  answers = {
    ...answers,
    ...(await promptArgs({ prompter, args: answers, questions })),
  };

  if (answers.is_child) {
    const [, viewOpts] = await getViews();

    if (!viewOpts.length) {
      throw new Error('There isn\'t any view to choose.');
    }

    questions = [
      {
        type: 'select',
        name: 'view',
        message: 'Which view?',
        choices: [...viewOpts],
      },
    ];

    answers = {
      ...answers,
      ...(await promptArgs({ prompter, args: answers, questions })),
    };

    // Use regex to get the path of the view selected
    const { groups: { path: selectedViewPath } } = /\((?<path>[\w\/.\-_]*)/g.exec(answers.view)

    // Split the path of the selected view
    const [folderContainer, fileName] = selectedViewPath.split('/').slice(1).slice(-2);
    const fileNameWithoutExtension = fileName.replace('.js', '');

    // If the selected view has the same name as the folder
    // that container it, means that the view is in own folder.
    if (pascalCase2KebabCase(fileNameWithoutExtension) === folderContainer) {
      // So, we can create a subfolder called 'view'
      // to contain the view we're trying to create.
      answers.view_path = `src/components/${selectedViewPath.replace(`/${fileName}`, '')}/views`
      createFolder(answers.view_path);
    } else {
      // otherwise, if the folder doesn't have the same name
      // that means that it isn't in its folder,
      // so we should create a new one.
      const newFolderName = pascalCase2KebabCase(fileNameWithoutExtension);
      const selectedViewPathInsideView = selectedViewPath.split(/^views/g)[1].replace(fileName, '');
      const newFolderPath = `src/components/views${selectedViewPathInsideView}${newFolderName}`;
      createFolder(newFolderPath);

      // Once the folder is created, move the view into that folder
      const oldViewPath = `src/components/${selectedViewPath}`;
      const newViewPath = `${newFolderPath}/${fileName}`;
      moveFile(oldViewPath, newViewPath);

      // Now, we're ready to create the views folder
      answers.view_path = `${newFolderPath}/views`;
      createFolder(answers.view_path);
    }
  } else {
    answers.view_path = 'src/components/views';
  }

  return answers;
};

module.exports = {
  prompt,
};
