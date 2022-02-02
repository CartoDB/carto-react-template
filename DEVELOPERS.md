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
2. Run `./scripts/bootstrap.sh` to start with all templates ready (and have a bit of patience)
3. For each template:
   - move to the internal folder of the template, with `cd template`
     3.1. carto-react lib
     - (manually) upgrade if required all @carto/react-\* package versions
     - [if required] remove the link to @carto/react-\* packages with `yarn unlink-carto-react`
     - ensure latest references with `yarn`. Delete previously node_modules if you feel a bit unsure :)
       3.2. app works fine
     - launch the app, with `yarn start`
     - [for those templates with e2e tests] test cypress locally, with `yarn cy:run`, keeping the app started
     - manual review from browser (see errors & warnings)
     - stop the app
       3.3. test locally the cra template
     - move to template root folder with `cd ..` (eg. template-base-2)
     - run `yarn clean`
     - [if you want to test templates] copy the hygen `_templates` or `_templates-ts`, from root directory to your `template-x/template/_templates` directory, so you can use them inside the client project
     - use create-react-app to build a project (see instructions above)
     - test cra project result as a user, including hygen generators
4. Bump manually package version in package.json (root level --> package.json & inside template --> package.dev.json), checking @carto/react-\* package versions are also correct.
5. Update changelog: rename 'Unreleased' to new version, eg 1.0.0-rc.3 (2021-03-23)
6. Push branch to remote to run CI (all test green) with `git push`
7. Execute the release command, for each template, from its **base folder** (eg. template-sample-app-2): `yarn publish:prerelease` or `yarn publish:release`. Before the npm publication, a prepare-release script will clean all unnecesary development files and folders and copy the latest hygen templates.
8. The release process removes certain files and folders, to have a clean publication (as cypress folder and package.dev.json), but those are required, so don't commit that change.
9. After a succesful release, merge the PR and create a tag in github
10. Ensure all template packages have the correct tags at npm for each version, with `npm dist-tag ls`. A prerelease shouldn't be set as latest, just an official release
11. If prerelease didn't work properly, you can set a specific (stable) version to be set again as latest, eg: `npm dist-tag add @carto/cra-template-base-2@1.1.0 latest` and/or stablish some specific version to prerelease explicitly with eg: `npm dist-tag add @carto/cra-template-base-2@1.2.0-beta.0 prerelease`
12. Deploy the sample app template to firebase (if required)

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

In order to work side by side with a local version of the `CARTO for React library` packages (available at https://github.com/CartoDB/carto-react`), both can be linked. Basic steps are:

```bash
git clone https://github.com/CartoDB/carto-react.git
cd carto-react
yarn
yarn build:watch
yarn link-all
```

Once all lib packages are compiled, link them into the proper `carto-react-template` with:

```bash
cd carto-react-template
cd <template>/template
yarn link-carto-react
yarn start
```

From this moment, the template will be using your local version of the library packages, allowing a faster development.
