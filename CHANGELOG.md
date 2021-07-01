# CHANGELOG

## Not released

- Add lazy load for views [#241](https://github.com/CartoDB/carto-react-template/pull/241)
- Improve how the theme is personalized [#240](https://github.com/CartoDB/carto-react-template/pull/240)
- Improve default style in hygen template [#238](https://github.com/CartoDB/carto-react-template/pull/238)
- Refactor in skeleton template to material-ui classes & changes in default exports [#247](https://github.com/CartoDB/carto-react-template/pull/247)
- Update to latest carto-react (v1.1.0-alpha.4) and include new LegendWidget [#255](https://github.com/CartoDB/carto-react-template/pull/255)
- Update to latest deck.gl (8.5.0-alpha.11) [#255](https://github.com/CartoDB/carto-react-template/pull/255)

## (prerelease) 1.1.0-alpha.1 (2021-06-17)

- Update to latest carto-react (v1.1.0-alpha.3) adapting to new SQL API (executeSQL) [#242](https://github.com/CartoDB/carto-react-template/pull/242)
- Update to latest deck.gl (8.5.0-alpha.10) [#242](https://github.com/CartoDB/carto-react-template/pull/242)
- Allow public apps with Cloud Native [#245](https://github.com/CartoDB/carto-react-template/pull/245)

## (prerelease) 1.1.0-alpha.0 (2021-05-28)

- Cloud Native integration

## 1.0.2 (2021-05-05)

## 1.0.2 (2021-05-05)

- Update hygen to latest version, fixing hygen code injection for windows [#228](https://github.com/CartoDB/carto-react-template/pull/228)

## 1.0.1 (2021-04-22)

- Update @carto/react-\* dependencies to 1.0.1 and fix hygen for windows [#225](https://github.com/CartoDB/carto-react-template/pull/225)

## 1.0.0 (2021-03-23)

- Fix prettier when running lint:fix [#222](https://github.com/CartoDB/carto-react-template/pull/222)
- Improve error messages on formatters and popups [#223](https://github.com/CartoDB/carto-react-template/pull/223)

## 1.0.0-rc.3 (2021-03-23)

- Fix general React warning on SharedArrayBuffer [#218](https://github.com/CartoDB/carto-react-template/pull/218)
- Integrate carto-react lib with workers support [#219](https://github.com/CartoDB/carto-react-template/pull/219)

## 1.0.0-rc.2 (2021-03-12)

- Add improved htmlForFeature in skeleton [#215](https://github.com/CartoDB/carto-react-template/pull/215)
- Fix immutable/serializable checks for redux middleware in skeleton [#216](https://github.com/CartoDB/carto-react-template/pull/216)

## 1.0.0-rc.1 (2021-03-11)

- Add cypress e2e tests in CI [#194](https://github.com/CartoDB/carto-react-template/pull/194)
- Fix layer hygen unable to identify proper sources [#198](https://github.com/CartoDB/carto-react-template/pull/198)
- Fix cross browser geocoder marker display [#199](https://github.com/CartoDB/carto-react-template/pull/199)
- Change the 'config' folder name to 'store' [#201](https://github.com/CartoDB/carto-react-template/pull/201)
- Improve default popup with htmlForFeature [#202](https://github.com/CartoDB/carto-react-template/pull/202)
- Change BigQuery source type name from 'bq' to 'bigquery' [#203](https://github.com/CartoDB/carto-react-template/pull/203)
- Add new hygen generators for components, models and slices [#171](https://github.com/CartoDB/carto-react-template/pull/171)
- Adapt to new **multi-package** structure for carto-react libs [#206](https://github.com/CartoDB/carto-react-template/pull/206)
- Fix layer generator with second layer [#204](https://github.com/CartoDB/carto-react-template/pull/204)
- Fix bug in formatter applied to histogram [#211](https://github.com/CartoDB/carto-react-template/pull/211)
- Cleanup templates & pin deck.gl 8.4.10 [#212](https://github.com/CartoDB/carto-react-template/pull/212)

## 1.0.0-beta12 (2021-02-08)

- Refactor on basic JSX & JS stuff [#170](https://github.com/CartoDB/carto-react-template/pull/170)
- Fix error on supportedBrowsers path [#170](https://github.com/CartoDB/carto-react-template/pull/170)
- Disable immutable & serializable checks for redux store on production [#190](https://github.com/CartoDB/carto-react-template/pull/190)
- Fix the cleaning of the isochrone if user logouts[#188](https://github.com/CartoDB/carto-react-template/pull/188)
- Fix hard interactivity on mobile adding pickingRadius to layers [#191](https://github.com/CartoDB/carto-react-template/pull/191)
- Fix geocoding marker is not showing [#192](https://github.com/CartoDB/carto-react-template/pull/192)

## 1.0.0-beta11 (2021-02-02)

- Remove datasets section [#175](https://github.com/CartoDB/carto-react-template/pull/175)
- Client Side Widgets [#159](https://github.com/CartoDB/carto-react-template/pull/159)
- Fix basic tab layout id broken on first load [#162](https://github.com/CartoDB/carto-react-template/issues/162)
- Add sources and views selector in hygen layer generator [#165](https://github.com/CartoDB/carto-react-template/pull/165)
- Add hygen source generator [#165](https://github.com/CartoDB/carto-react-template/pull/165)
- Refactor source structure for simplification [#164](https://github.com/CartoDB/carto-react-template/issues/164)
- Add basic e2e tests to both sample-app and skeleton with cypress [#169](https://github.com/CartoDB/carto-react-template/pull/169)
- Update deck.gl version to 8.4 [#184](https://github.com/CartoDB/carto-react-template/pull/184)
- Update to CRA4 and React 17 [#186](https://github.com/CartoDB/carto-react-template/pull/186)

## 1.0.0-beta10 (2021-01-16)

- Fix missing babel dependencies when using CRA for both templates [#160](https://github.com/CartoDB/carto-react-template/issues/160)

## 1.0.0-beta9 (2020-12-18)

- Fix use of layerAttributes in UserDatasets [#154](https://github.com/CartoDB/carto-react-template/pull/154)
- Improve stores layout and loading [#155](https://github.com/CartoDB/carto-react-template/pull/155)
- Fix store filters when using breadcrumbs to all stores [#156](https://github.com/CartoDB/carto-react-template/pull/156)
- Improve mobility UX [#157](https://github.com/CartoDB/carto-react-template/pull/157)
- Improve layout for Google Maps basemaps [#157](https://github.com/CartoDB/carto-react-template/pull/157)

## 1.0.0-beta7 (2020-12-15)

- Refactor to use local UserMenuLogin for managing Login button [#144](https://github.com/CartoDB/carto-react-template/pull/144)
- Add a new forceOAuthLogin option to appSlice, so a fullscreen Login protects the whole app [#146](https://github.com/CartoDB/carto-react-template/pull/146)
- Refactor to adapt UserDatasets to datasets read-all scope [#147](https://github.com/CartoDB/carto-react-template/pull/147)
- Fix issue with UserDatasets removal [#147](https://github.com/CartoDB/carto-react-template/pull/147)
- Legend fixes for mobile [#148](https://github.com/CartoDB/carto-react-template/pull/148)
- Improve selected store style [#148](https://github.com/CartoDB/carto-react-template/pull/148)
- Mobile design improvements [#149](https://github.com/CartoDB/carto-react-template/pull/149)

## 1.0.0-beta6 (2020-12-04)

- Improve layout for mobile (specially for iOS) [#141](https://github.com/CartoDB/carto-react-template/pull/141)
- Fix selected store state in sample-app [#142](https://github.com/CartoDB/carto-react-template/pull/142)

## 1.0.0-beta5 (2020-11-27)

- Adapt layout for mobile [#134](https://github.com/CartoDB/carto-react-template/pull/134)
- Update favicons for better visibility on dark themes [#136](https://github.com/CartoDB/carto-react-template/pull/136)
- Detect unsupported browsers based on Browserslist configuration [#138](https://github.com/CartoDB/carto-react-template/pull/138)
- Fix number formatting issues in Safari [#133](https://github.com/CartoDB/carto-react-template/pull/133/)

## 1.0.0-beta4 (2020-11-25)

- Update @carto/react dependency to 1.0.0-beta5

## 1.0.0-beta3 (2020-11-24)

- Fix regenerator issue, updating @carto/react dependency to 1.0.0-beta2
- Fix to start with HTTPS by default, to allow oauth
- Refactor legends [#122](https://github.com/CartoDB/carto-react-template/pull/122)
- Fix routes with missing slash [#125](https://github.com/CartoDB/carto-react-template/pull/125)

## 1.0.0-beta1 (2020-11-20)

- Initial version: 2 templates, simple and full app
