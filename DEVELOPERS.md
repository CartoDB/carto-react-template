
# Developer notes

To develop for a template itself, you need to create a `package.json` file in the template folder and add it to the gitignore list, as this file would overwrite the one created by create-react-app when used. This is as easy as follows:

```bash
git clone https://github.com/CartoDB/carto-react-template.git
cd carto-react-template
cp -R hygen/_templates/ template-sample-app/template/_templates
cp -R hygen/_templates/ template-skeleton/template/_templates
cd template-sample-app/template
ln -s package.dev.json package.json
cd template-skeleton/template
ln -s package.dev.json package.json
```

Then you are ready to install the dependencies executing `yarn` in the template folder and start the development server with `yarn start`.

## Testing the template generation

> ⚠️ Important: remember to synchronize the changes applied to your `template/package.json` with `template.json` and remove the `template/package.json` file before testing or execute `yarn clean` to clean it automatically.

You can test the template locally by calling `create-react-app` specifying the folder of this project:

```bash
npx create-react-app test-template --template file:./carto-react-template/template-sample-app
```

## Publishing the templates to npm

> ⚠️ Important: remember to set the right version for each template, tag the release in the GitHub repository and deploy the sample app with the latest changes

For each template, execute the release command from its **base folder**. Before this command is executed, a pre-hook will clean all unnecesary development files and folders and copy the hygen templates, before making the npm release

```bash
cd template-sample-app
yarn release
```


## Deploying the sample app

The sample app corresponding to https://sample-app-react.carto.com/ is hosted in Firebase, so before deploying it you'll need to log into Firebase using:

```bash
cd template-sample-app/template
yarn firebase login
```

Then, just build the sample-app template and deploy it by executing:

```bash
cd template-sample-app/template
yarn build
yarn firebase deploy
```

### Updating supported browsers

This project supports [browserslist](https://github.com/browserslist/browserslist) and it has an unsupported browser page. In case of updating browserslist configuration, ensure to update the detection script by running:

```bash
yarn updateSupportedBrowsers
```

## Using locally the CARTO for React library

In order to work side by side with a local version of the `CARTO for React library` packages (available at https://github.com/CartoDB/carto-react`), follow these instructions:

```bash
git clone https://github.com/CartoDB/carto-react.git
cd react
yarn
yarn start
yarn link-all
```

Now that all packages are compiled, link them into `carto-react-template` with:

```bash
cd carto-react-template
cd template-sample-app/template
yarn link-carto-react
yarn start

cd template-skeleton/template
yarn link-carto-react
yarn start
```

From this moment, template-sample-app or template-skeleton will be using your local version of the library packages.
