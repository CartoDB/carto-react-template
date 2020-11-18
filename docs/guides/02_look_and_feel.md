### How to adapt the look & feel

When you are building your own application, you usually want to adapt the look & feel to use a different typography or define your own primary and secondary colors.

The user interface components are based on Material-UI. We have created a default CARTO theme. You can customize the theme by changing the theme configuration variables. You can find the variables defined for the CARTO theme in the carto-theme.js file in the react-airship-ui package.

There are lots of properties that you can adapt to your needs. Some of the main configuration properties are:

- <code>[palette](https://material-ui.com/customization/palette/)</code>. Definition of colors (primary, secondary, error, warning…)
- <code>[typography](https://material-ui.com/customization/typography/)</code>. Default font family, heading styles, body styles…
- <code>[breakpoints](https://material-ui.com/customization/breakpoints/)</code>. Support for different screen sizes.