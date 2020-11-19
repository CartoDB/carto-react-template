# CARTO for React

Welcome to CARTO for React! The best way to develop Location Intelligence (LI) Apps usign CARTO platform + React + deck.gl.

**Video or GIF to show how to create a map with widgets**

It's based on the most popular toolchain [Create React App](https://github.com/facebook/create-react-app) and it'll allow you to start with a well designed structure following the best practices for modern frontend development and an integrated toolchain for testing, building and deploying your application.

## Getting started

The basic prerequisite for using Create React App is to have a package manager ([npm](https://www.npmjs.com/get-npm) and [yarn](https://yarnpkg.com/)) previously installed.

```bash
npx create-react-app my-app --template @carto
```

Install dependencies and start the server:

```bash
yarn
yarn start
```

A full [Sample Application](#sample-application) with the most common functionality is available at https://sample-app-react.carto.com

Want to continue? Start [connecting your CARTO account](docs/guides/01_connect_your_account.md).

**Deploy**

Use CARTO platform and deploy everywhere. These are the deployment methods available:

* [GitHub pages](https://create-react-app.dev/docs/deployment/#github-pages)
* [Firebase](https://create-react-app.dev/docs/deployment/#firebase)
* [Azure](https://create-react-app.dev/docs/deployment/#azure)
* [Netlify](https://create-react-app.dev/docs/deployment/#netlify)
* [Heroku](https://create-react-app.dev/docs/deployment/#heroku)
* [Amazon S3 and CloudFront](https://create-react-app.dev/docs/deployment/#s3-and-cloudfront)
* [AWS Amplify](https://create-react-app.dev/docs/deployment/#aws-amplify)
* [Vercel](https://create-react-app.dev/docs/deployment/#vercel)
* or even use your own [static server](https://create-react-app.dev/docs/deployment/#static-server)

## How-to Guides

* [Connect your CARTO account](docs/guides/01_connect_your_account.md)

* [Create a page with a layer and widgets](docs/guides/02_page_layer_widgets.md)

* [CARTO and Google Basemaps](docs/guides/03_basemap.md)

* [Permissions and user management](docs/guides/04_permissions_user_management.md)

* [Look and feel](docs/guides/05_look_and_feel.md)

## Architecture

![alt_text](docs/images/architecture.png 'Architecture')

CARTO for react is based on the following libraries:

- [CARTO for deck.gl](https://carto.com/developers/deck-gl) as the library to visualize maps. For the basemaps you can use either Google Maps or CARTO basemaps.
- [React](https://reactjs.org/) as the JavaScript library for building user interfaces and [Redux](https://redux.js.org/) for managing global state for the application. We use [React-Redux](https://react-redux.js.org/) for managing the interactions between the React components with the Redux store.
- [Material-UI](https://material-ui.com/): UI React components for faster and easier web development.
- [@carto/react](https://www.npmjs.com/package/@carto/react): A library created to make easy integration with CARTO platform and its APIs, geospatial widgets and a custom theme for [Material-UI](https://material-ui.com/).

**Why React?**

LI Apps tend to be applications with a reduced number of pages, but with lots of functionalities at each page and many relations between them.

In the past, they were developed using imperative programming (with MVC patterns or similar), but it easily ends up in a messy application with a huge amount of relations between components. And each time you need to add something new, a new bug is also introduced.

The reactive programming (React and deck.gl) comes to fix this issue and make your application easy to maintain, to test and to scale. We're 100% sure that you can create something manageable even if your application is really complex and includes lots of features with multiple interactions.

Yes, it's a new paradigm, but once you learn it, you'll love it.

## Folder structure

* **src/config**: configuration of the application.
* **src/components/common**: common components as Header, Footer, Menus, etc
* **src/components/layers**: deck.gl layers that area available to the Map component.
* **src/components/views**: pages which match with routes.
* **src/models**: async functions to connect with external APIs.
* **src/utils**: general utils.
* **public**: the public folder contains the HTML file so you can tweak it, for example, to set the page title.

Main files:

* **routes.js**: the file where views and routes are matched.
* **views/Main.js**: the general component that defines the layout of the application.
* **config/initialStateSlice.js**: the file that define the configuration of CARTO as default values for the slices. Set your CARTO account, apiKeys, basemap, OAuth apps, etc...
* **config/appSlice.js**: general slice of the app to include/extend with custom app functionality.

## UI components

CARTO for React comes with a set of [UI components](https://storybook-react.carto.com) ready to be used to create the best LI Apps.

## @carto/react

We've created this library to:

1. Make easy integration with CARTO platform and its APIs.

2. Provide a catalog of very useful widgets for LI Apps.

3. Create a custom theme for [Material-UI](https://material-ui.com/) to reduce the design work of your team.

There is a full [reference](docs/carto_react_reference.md) available.

## Frequently Asked Questions (FAQ)

**Installing npm modules, learning React with Redux, learning Material-UI, it is just too much for my application, is there a simpler way?**

If your application is not so complex and does not need the benefits added by this template, you can just use CARTO for deck.gl with the scripting API. Please check the [examples](https://carto.com/developers/deck-gl/examples/).

**I’m using Vue or Angular for building my applications, what are my options?**

At this moment, we only have a CARTO for React. If you are building an application using Vue, Angular or other JavaScript framework, you don’t have to worry, it is completely feasible and you just need to use the CARTO for deck.gl pure JavaScript flavor. Please check the [example](https://github.com/CartoDB/viz-doc/tree/master/deck.gl/examples/pure-js).

## Sample Application

A full [Sample Application](#sample-application) with the most common functionality when creating LI Apps is also available at https://sample-app-react.carto.com

To download it, just run:

```bash
npx create-react-app my-app --template @carto/sample-app
```

This application uses a dataset with retail locations and another related dataset with the monthly revenue information for each location. It includes the following views/pages:

- **Stores view**. This view demostrates how to:
  - Visualize a CARTO dataset applying a by-value style (color based on store type) and create a corresponding legend.
  - Include interactive data-driven widgets that allow the users to get information about the dataset and filter the information in the map.
    - Formula widget showing the total revenue from all the stores
    - Category widget showing the revenue by store type
    - Histogram widget showing revenue buckets
  - Search a location by address, city… using CARTO geocoding services through the Data Services API and zoom to the results.
  - Display information about a feature when hovering over. When we hover over the store, we will display a pop-up or tooltip with the total revenue for the store.
  - Select a feature and display detailed information. When we click on a store, the map will be centered in the location and the store will be highlighted. It demostrates how you can use CARTO SQL API to create spatial queries against CARTO. The following information will be displayed in the sidebar:
    - Total revenue of the store
    - Histogram (line chart) with the store revenue per month, showing the average per month of all stores for comparison
    - Calculate an isochrone using CARTO Data Services API. We can select a store from a list in the sidebar and calculate isochrones specifying the mode (car or walking) and range (time in minutes)

- **KPI view**. This view shows how to build a geospatial bussiness dashboard by creating a KPI in a few lines of code:
  - Visualize a CARTO dataset using a choropleth map with manual breaks where the store color depends on the total revenue per area and create a corresponding legend.
  - Include interactive data-driven widgets that allow the users to get information about the dataset and filter the information in the map.
    - Formula widget with the total revenue from all stores
    - Category widget showing the total revenue per area
    - Histogram widget showing the total revenue per month

- **Datasets view**. This view shows how to:
  - Display the list of datasets from the user CARTO account using OAuth and the CARTO Datasets API.
  - Add a dataset from the user CARTO account to the map with a default style.

## Code Generator

We use [Hygen](https://www.hygen.io/) to generate the code of the most common operations.

Create a new View:

```bash
yarn hygen view new
```

Create a new Layer (and optionally attach to the previous view):

```bash
yarn hygen layer new
```

For further information:

```bash
yarn hygen help
```

## Developer Notes
### Getting started

To develop the template itself you need to create a `package.json` file in the template folder and add it to the gitignore list, as this file would overwrite the one created by create-react-app when used. This is as easy as follows:

```bash
git clone git@github.com:CartoDB/cra-template-carto.git
cd cra-template-carto
cp -R hygen/_templates template-sample-app/template/_templates
cp -R hygen/_templates template-skeleton/template/_templates
cd template-sample-app/template
ln -s package.dev.json package.json
cd template-skeleton/template
ln -s package.dev.json package.json
```

Then you are ready to install the dependencies executing `yarn` in the template folder and start the development server with `yarn start`.

### Testing the template generation

> ⚠️ Important: remember to synchronize the changes applied to your `template/package.json` with `template/package.dev.json` and `template.json` and remove the `template/package.json` file before testing.

You can test the template locally by calling `create-react-app` specifying the folder of this project:

```bash
npx create-react-app test-template --template file:./cra-template-carto
```

### Publishing the template

REMEMBER TO COPY the `hygen/_templates` folder.

> ⚠️ Important: remember to synchronize the changes applied to your `template/package.json` with `template/package.dev.json` and `template.json` and remove the `template/package.json` file before publishing.

To publish this template execute npm publish from the **root directory** of this project.

```bash
npm publish --access public
```

### Using local @carto/react library

In order to work with a local version of `@carto/react` library follow these instructions:

```bash
cd <your dev folder outside cra-template-carto>
git clone https://github.com/CartoDB/react.git
cd react
yarn
yarn build
cd dist
yarn link
```

Now that `@carto/react` is compiled, link it into `cra-template-carto`

```bash
cd cra-template-carto
cd template-sample-app/template
yarn link @carto/react
yarn start
cd template-skeleton/template
yarn link @carto/react
yarn start
```

In this moment, cra-template-carto will be using your local `@carto/react` library version.