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

