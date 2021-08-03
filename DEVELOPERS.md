# Developer notes

```bash
./scripts/bootstrap.sh
```

Then you are ready to start each template, by running `yarn start` at the template folder.

## Testing the template generation

> ⚠️ Important: remember to synchronize the changes applied to your `template/package.json` with `template.json` and remove the `template/package.json` file before testing or execute `yarn clean` to clean it automatically.

You can test the template locally by calling `create-react-app` specifying the folder of this project:

```bash
npx create-react-app test-template --template file:./carto-react-template/template-sample-app-2
```

You can also test an specific version (eg. an alpha already published) with something like:
```bash
npx create-react-app my-sample-app-alpha --template  @carto/cra-template-sample-app-2@1.1.0-alpha.0
```

## Publishing the templates to npm

Follow these steps:

1. Open a new branch for the release from master, eg. `git checkout -b release-v1.0.0-rc.3`
2. For each template:
   - remove the link to @carto/react-\* packages with `yarn unlink-carto-react`
   - ensure latest references with `yarn`. Delete previously node_modules if you feel a bit unsure :)
   - launch the app, with `yarn start`
   - test cypress locally, with `yarn cy:run`
   - manual review from browser (see errors & warnings)
   - from template root folder (eg. template-base-2), run `yarn clean`
   - copy the hygen templates, so you can test them inside the client project
   - use create-react-app to build a project
   - test cra project result as a user, including hygen generators
3. Bump manually package version in package.json (root level --> package.json & inside template --> package.dev.json), checking @carto/react-\* package versions are also correct.
4. Update changelog: rename 'Unreleased' to new version, eg 1.0.0-rc.3 (2021-03-23)
5. Push branch to remote to run CI (all test green) with `git push`
6. Execute the release command, for each template, from its **base folder** (eg. template-sample-app-2): `yarn publish:prerelease` or `yarn publish:release`. Before the npm publication, a prepare-release script will clean all unnecesary development files and folders and copy the latest hygen templates.
7. After a succesful release, merge the PR and create a tag in github
8. Ensure both packages have the correct tags at npm for each version, with `npm dist-tag ls`. A prerelease shouldn't be set as latest, just an official release
9. Deploy the sample app template to firebase (if required)

## Deploying the sample app

The sample app corresponding to https://sample-app-react.carto.com/ is hosted in Firebase, so before deploying it you'll need to log into Firebase using:

```bash
cd template-sample-app-2/template
yarn firebase login
```

Then, just build the sample-app template and deploy it by executing:

```bash
cd template-sample-app-2/template
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
cd <template>/template
yarn link-carto-react
yarn start
```

From this moment, template-sample-app-2 or template-base-2 will be using your local version of the library packages.
