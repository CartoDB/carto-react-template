// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
const { promptArgs, readFile, getFiles } = require('../../promptUtils');

const VIEWS_DIR = 'components/views'

const SOURCE_TYPES = ['sql', 'bq'];

const LAYER_TYPES = {
  [SOURCE_TYPES[0]]: 'CartoSQLLayer',
  [SOURCE_TYPES[1]]: 'CartoBQTilerLayer',
};

const prompt = async ({ prompter, args }) => {
  let questions = [];

  if (!args.name) {
    questions.push({
      type: 'input',
      name: 'name',
      message: 'Name:',
    });
  }

  // Check name to remove layer word if the user added it by (his/her)self
  let answers = await promptArgs({ prompter, args, questions });
  answers.name = answers.name.replace('Layer', '').replace('layer', '') + 'Layer';

  const sourceFiles = await getFiles('src/data/sources');
  const sourcesOpts = sourceFiles.reduce((total, { name }) => {
    name = name.replace('.js', '');
    if (name.includes('Source')) {
      total.push({ title: name });
    }
    return total;
  }, []);

  if (!sourcesOpts.length) {
    throw new Error('There isn\'t any source to choose.');
  }

  questions = [
    {
      type: 'select',
      name: 'source_file',
      message: 'Choose a source',
      choices: [...sourcesOpts],
    },
  ];

  answers = {
    ...answers,
    ...(await promptArgs({ prompter, args: answers, questions })),
  };

  // Detect what kind of layer we need (CartoSQLLayer, CartoBQTilerLayer)
  const selectedSourceFileContent = readFile(`src/data/sources/${answers.source_file}.js`);
  const res = /(?:type: ')(?<type>[\w]*)(?:')/g.exec(selectedSourceFileContent);
  answers.type_source = 'sql';

  if (res) {
    const { groups: { type: sourceType } } = res;
    if (SOURCE_TYPES.indexOf(sourceType) === -1) {
      throw new Error('The source has an unknown type.');
    }
    answers.type_source = sourceType;
  }
  answers.type_className = LAYER_TYPES[answers.type_source];

  questions = [
    {
      type: 'confirm',
      name: 'attach',
      message: 'Do you want to attach to some view',
    },
  ];

  answers = {
    ...answers,
    ...(await promptArgs({ prompter, args: answers, questions })),
  };

  if (answers.attach) {
    const viewFiles = await getFiles(`src/${VIEWS_DIR}`);
    const viewsOpts = viewFiles.reduce((total, { path, name }) => {
      name = name.replace('.js', '');
      if (/[A-Z]/.test(name[0])) {
        total.push({
          title: `${name}${path !== `${VIEWS_DIR}/${name}` ? ' ('+ path.replace(VIEWS_DIR, 'views') +')' : ''}`
        });
      }
      return total;
    }, []);

    if (!viewsOpts.length) {
      throw new Error('There isn\'t any view to choose.');
    }

    questions = [
      {
        type: 'select',
        name: 'view',
        message: 'Choose a view',
        choices: [...viewsOpts],
      },
    ];

    answers = {
      ...answers,
      ...(await promptArgs({ prompter, args: answers, questions })),
    };

    if (answers.view.includes('views/')) {
      const selectedViewInitialPath = answers.view.split('(')[1].replace(')', '');
      answers.view_path = viewFiles.find(viewFile => {
        return viewFile.path === selectedViewInitialPath.replace('views', VIEWS_DIR)
      }).path;
    } else {
      answers.view_path = `${VIEWS_DIR}/${answers.view}.js`;
    }
  }

  return answers;
};

module.exports = {
  prompt,
};
