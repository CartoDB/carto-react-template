# Developer Notes

## Getting started

To develop the template itselft it is needed to add an ignored `package.json` to the template folder, as this file would overwrite the one created by create-react-app when used. This is as easy as follows:

```
git clone git@github.com:CartoDB/cra-template-carto.git
cd cra-template-carto
cd template
cp package.dev.json package.json
```

Then you are ready to install the dependencies and start developing executing
`yarn` and `yarn start`.

## Testing the template generation

> ⚠️ Important: remember to synchronize the changes applied to your `template/package.json` with `template/package.dev.json` and `template.json` and remove the `template/package.json` file before testing.

You can test the template locally by calling `create-react-app` specifying the folder of this project:

```
npx create-react-app test-template --template file:./cra-template-carto
```

## Publishing the template

> ⚠️ Important: remember to synchronize the changes applied to your `template/package.json` with `template/package.dev.json` and `template.json` and remove the `template/package.json` file before publishing.

To publish this template execute npm publish from the **root directory** of this project.

```
npm publish --access public
```

## Using local dependencies

In order to use dependencies from the local environment you can make use of [`yarn link`](yarnpkg.com/en/docs/cli/link). For example, for Airship, you can go as follows:

```
git clone git@github.com:CartoDB/airship.git
cd airship
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
