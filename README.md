# @carto/cra-template

This repository contains the official CARTO template for [Create React App](https://github.com/facebook/create-react-app). The template is the best way for kickstarting application development with CARTO for deck.gl and React. If you start your application with this template, you will begin with a well designed structure following the best practices for modern frontend development and an integrated toolchain for testing, building and deploying your application.

The template uses the following technologies/frameworks (in addition to React):

- [CARTO for deck.gl](https://carto.com/developers/deck-gl) as the library to visualize maps. For the basemaps you can use either Google Maps or CARTO basemaps.
- [Redux](https://redux.js.org/) for managing global state for the application. We use [React-Redux](https://react-redux.js.org/) for managing the interactions between the React components with the Redux store.
- [Material-UI](https://material-ui.com/): UI React components for faster and easier web development.
- [react-airship-ui](https://www.npmjs.com/package/@carto/react-airship-ui): CARTO theme for [Material-UI](https://material-ui.com/) and React geospatial ui widgets.

You can access additional documentation [here](template/docs/README.md).

## Usage

If you want to create a new React application using the template, you need to execute the following instruction:

```bash
npx create-react-app my-app --template @carto
```

## Developer Notes

### Getting started

To develop the template itself you need to create a `package.json` file in the template folder and add it to the gitignore list, as this file would overwrite the one created by create-react-app when used. This is as easy as follows:

```
git clone git@github.com:CartoDB/cra-template-carto.git
cd cra-template-carto
cd template
ln -s package.dev.json package.json
```

Then you are ready to install the dependencies executing `yarn` in the template folder and start the development server with `yarn start`.

### Testing the template generation

> ⚠️ Important: remember to synchronize the changes applied to your `template/package.json` with `template/package.dev.json` and `template.json` and remove the `template/package.json` file before testing.

You can test the template locally by calling `create-react-app` specifying the folder of this project:

```
npx create-react-app test-template --template file:./cra-template-carto
```

### Publishing the template

> ⚠️ Important: remember to synchronize the changes applied to your `template/package.json` with `template/package.dev.json` and `template.json` and remove the `template/package.json` file before publishing.

To publish this template execute npm publish from the **root directory** of this project.

```
npm publish --access public
```

### Using local dependencies

In order to use dependencies from the local environment you can make use of [`yarn link`](yarnpkg.com/en/docs/cli/link). For example, for Airship, you can go as follows:

```
git clone git@github.com:CartoDB/airship.git
cd airship
git checkout airship-3.0
yarn
yarn local-link
yarn dev
```

Then at the root of this project:

```
cd template
yarn link @carto/react-airship-ui
yarn start
```

> ⚠️ Important: remember to test this project with **unlinked** libraries before publishing.
