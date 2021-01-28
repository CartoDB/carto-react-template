# CHANGELOG

## Not released
- Remove datasets section as the underlying server API is not ready yet [#175](https://github.com/CartoDB/carto-react-template/pull/175)
- Client Side Widgets [#159](https://github.com/CartoDB/carto-react-template/pull/159)
- Fix basic tab layout id broken on first load [#162](https://github.com/CartoDB/carto-react-template/issues/162)
- Add sources and views selector in hygen layer generator [#165](https://github.com/CartoDB/carto-react-template/pull/165)
- Add hygen source generator [#165](https://github.com/CartoDB/carto-react-template/pull/165)
- Refactor source structure for simplification [#164](https://github.com/CartoDB/carto-react-template/issues/164)
- Add basic e2e tests to both sample-app and skeleton with cypress [#169](https://github.com/CartoDB/carto-react-template/pull/169)

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
