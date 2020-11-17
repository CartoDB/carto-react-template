# CARTO for React

Welcome to CARTO for React!

The best way to develop Location Intelligence Apps usign CARTO platform + deck.gl.

**Video or GIF to show how to create a map with widgets**

It's based on the most popular toolchain [Create React App](https://github.com/facebook/create-react-app) and it'll allow you to start with a well designed structure following the best practices for modern frontend development and an integrated toolchain for testing, building and deploying your application.

## Getting started

The basic prerequisite for using Create React App is to have a package manager ([npm](https://www.npmjs.com/get-npm) and [yarn](https://yarnpkg.com/)) previously installed.

```bash
npx create-react-app my-app --template @carto
```

As we're using `create-react-app`, you can use some of the available [deployment methods](https://create-react-app.dev/docs/deployment) like [GitHub pages](https://create-react-app.dev/docs/deployment/#github-pages), [Firebase](https://create-react-app.dev/docs/deployment/#firebase), [Azure](https://create-react-app.dev/docs/deployment/#azure), [Netlify](https://create-react-app.dev/docs/deployment/#netlify), [Heroku](https://create-react-app.dev/docs/deployment/#heroku), [Amazon S3 and CloudFront](https://create-react-app.dev/docs/deployment/#s3-and-cloudfront), [AWS Amplify](https://create-react-app.dev/docs/deployment/#aws-amplify), [Vercel](https://create-react-app.dev/docs/deployment/#vercel) or even use your own [static server](https://create-react-app.dev/docs/deployment/#static-server)

## Architecture

![alt_text](docs/images/architecture.png 'Architecture')

CARTO for react is based on the following libraries:

- [CARTO for deck.gl](https://carto.com/developers/deck-gl) as the library to visualize maps. For the basemaps you can use either Google Maps or CARTO basemaps.
- [React](https://reactjs.org/) as the JavaScript library for building user interfaces and [Redux](https://redux.js.org/) for managing global state for the application. We use [React-Redux](https://react-redux.js.org/) for managing the interactions between the React components with the Redux store.
- [Material-UI](https://material-ui.com/): UI React components for faster and easier web development.
- [@carto/react](https://www.npmjs.com/package/@carto/react): Library to provide integration con CARTO platform, geospatial widgets and a custom theme for [Material-UI](https://material-ui.com/)

**Why React?**

Location intelligence apps tend to be apps with a reduce number of pages but with a lots of functionality at each page and with many relation between them.

In the past the were developed using imperative programming with MVC patterns or similar, but it easily ends up in a messy applicattion with a huge amount of relation between each components. And each time you need to add something new a new bug is also introduced.

The reactive programming (React and deck.gl) comes to fix this issue and make your application easy to maintain, to test and to scale. We're 100% sure that you can create something manageable even if your application is really complex and includes lots of features with multiple interactions.

Yes, it's a new paradigm, but once you'll learn it, you'll love it.

## How-to Guides

- [Create a page with a layer and widgets](docs/guides/00_page_layer_widgets.md)
- [Connect your own account](docs/guides/01_connect_your_own_account)
- [Look and Feel](docs/guides/02_look_and_feel.md)
- [Permissions and user management](docs/guides/03_permissions_user_management.md)

## @carto/react

Library to provide integration con CARTO platform, geospatial widgets and a custom theme for [Material-UI](https://material-ui.com/)

Checkout our [reference](docs/carto_react_reference.md)

## Frequently Asked Questions (FAQ)

Q: Installing npm modules, learning React with Redux, learning Material-UI, it is just too much for my application, is there a simpler way?

A: If your application is not so complex and does not need the benefits added by this template, you can just use CARTO for deck.gl with the scripting API. Please check the [examples](https://carto.com/developers/deck-gl/examples/).

Q: I’m using Vue or Angular for building my applications, what are my options?

A: At this moment, we only have a template for React using Create React App. If you are building an application using Vue, Angular or other JavaScript framework, you don’t have to worry, it is completely feasible and you just need to use the CARTO for deck.gl pure JavaScript flavor. Please check the [example](https://github.com/CartoDB/viz-doc/tree/master/deck.gl/examples/pure-js).

## Sample Application

The template, when installed, creates a sample application with a simple layout (toolbar, left sidebar and map area). The application uses a dataset with retail locations and another related dataset with the monthly revenue information for each location.

The main goal is to show how you can implement commonly found features in location intelligence applications using the boilerplate architecture. The application includes the following views/pages:

- **Stores view**. This view demonstrates how to:
  - Visualize a CARTO dataset applying a by-value style (color based on store type) and create a corresponding legend.
  - Include interactive data-driven widgets that allow the users to get information about the dataset and filter the information in the map.
    - Formula widget showing the total revenue from all the stores
    - Category widget showing the revenue by store type
    - Histogram widget showing revenue buckets
  - Search a location by address, city… using CARTO geocoding services through the Data Services API and zoom to the results.
  - Create a tool (lasso) that interacts with the map and the widgets. The user will draw a polygon and the stores will get filtered, both in the map and the widgets.
  - Display information about a feature when hovering over. When we hover over the store, we will display a pop-up or tooltip with the total revenue for the store.
  - Select a feature and display detailed information. When we click on a store, the map will be centered in the location and the store will be highlighted. The following information will be displayed in the sidebar:
    - The nearest 3 stores with a link to them, distance and total revenue
    - Total revenue of the store
    - Histogram (line chart) with the store revenue per month, showing the average per month of all stores for comparison
- **KPI view**. This view shows how to:
  - Visualize a CARTO dataset using a choropleth map with manual breaks where the store color depends on the total revenue per area and create a corresponding legend.
  - Include interactive data-driven widgets that allow the users to get information about the dataset and filter the information in the map.
    - Formula widget with the total revenue from all stores
    - Category widget showing the total revenue per area
    - Histogram widget showing the total revenue per month
- **Isochrones view**. This view demonstrates how to:
  - Calculate isochrones using CARTO Data Services API. We can select a store from a list in the sidebar and calculate isochrones specifying the mode (car or walking) and range (time in minutes)
- **Datasets view**. This view shows how to:
  - Display the list of datasets from the user CARTO account using OAuth and the CARTO Datasets API.
  - Add a dataset from the user CARTO account to the map with a default style.

## Appendix. Application file structure

If you look at the code, you will find the package. json file in the root directory with all the package dependencies, along with the README.md with basic instructions for starting the app in development mode, launch the tests, build the application for production and more.

The public directory includes the index.html file, that is a standard create-react-app index.html file with the only addition of the Montserrat font, the manifest.json file and some icons and logos.

The src directory contains the code for the application organized as follows:

- src root folder
- The main App component (App.js) that setups the routes using react-router-dom and the application theme using Material-UI
- The index.js file that reads the store from the config/store file and defines the basic layout for the application, rendering it to the #root HTML element. The outermost component is React.StrictMode that adds additional checks and warnings for the inner components. Inside the StrictMode component we have the redux Provider component initialized with the store property. Inside the Provider component we have the react-router-dom BrowserRouter component for managing the routes within the application and finally inside this component we have our App component:

  ```javascript
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
  ```

- The routes.js file where the different application routes used by react-router-dom are defined
- The standard serviceWorker.js and setupTests.js files created by create-react-app
- components folder
  - The common/map subfolder contains the main classes for working with the map (Map.js) and the layers.
    - The basemap type (Mapbox or Google Maps) is defined in the state.carto.baseMap state variable.
    - The Map component returns the &lt;DeckGL> component for Mapbox basemaps and the boilerplate &lt;GoogleMap> component for Google Maps basemaps.
    - The layers subfolders contains several examples of CartoSQLLayer and CartoBQTilerLayer
  - The common/widgets subfolder contains the widgets (CategoryWidget, FormulaWidget…) that use the corresponding UI classes from the UI library (CategoryWidgetUI, FormulaWidgetUI…)
  - The views subfolder contains the specific layout for each one of the views/pages.
    - The Home component contains the overall layout based on the Material-UI &lt;Grid> component. Within this component we have an &lt;AppBar> component that includes the links to the pages and the Avatar and another &lt;Grid> below the &lt;AppBar> that defines the left sidebar and the map area with the &lt;Map> component and the &lt;Legend> component. The sidebar is itself another &lt;Grid> component 350px wide and taking over the remaining height available, containing an &lt;Outlet> component.
    - Every view (Stores, KPI…) returns an &lt;Outlet> component that includes the specific components used in that view/page.
- The config directory includes the configuration for the app:
  - Basemaps definition (baseMaps.js)
  - Initial state and reducer functions (cartoSlice.js). This is using the createSlice function from Redux toolkit that takes an initial state and a set of reducers, and generates action creators and action types corresponding to the reducers and the state.
    - The state defines the following properties:
      - viewState
      - viewport
      - baseMap
      - credentials
      - layers
      - dataSources
    - The reducers define how to handle the different action types. We have defined reducers for adding and removing datasets, adding and removing layers, setting a basemap… The reducers always take state and action arguments and apply some modifications to the state depending on the action.
- The models directory includes the functions that make queries to the CARTO database using the Airship API package that takes advantage of CARTO SQL API.
.

## Developer Notes

### Getting started

To develop the template itself you need to create a `package.json` file in the template folder and add it to the gitignore list, as this file would overwrite the one created by create-react-app when used. This is as easy as follows:

```bash
git clone git@github.com:CartoDB/cra-template-carto.git
cd cra-template-carto
cd template
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

> ⚠️ Important: remember to synchronize the changes applied to your `template/package.json` with `template/package.dev.json` and `template.json` and remove the `template/package.json` file before publishing.

To publish this template execute npm publish from the **root directory** of this project.

```bash
npm publish --access public
```
