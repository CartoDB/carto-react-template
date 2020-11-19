# Create a page with a layer and widgets

On this guide we're going to explain how to create a new page with a layer and 2 widgets.

### Upload the dataset

Go to your dashboard and click on `New Dataset`->`Upload`.

Copy the following URL and click on `Submit`

```url
https://public.carto.com/api/v2/sql?filename=retail_stores&q=select+*+from+public.retail_stores&format=shp
```

Make both datasets public. You can also create an API KEY and keep them private. Totally up to you.

### Create a view

Now, we're going to create a view called Stores that respond to the path /stores.

There is an interactive command to generate the code required for a View:

```bash
yarn hygen view new
```

And answer the following:

```bash
✔ Name: Stores
✔ Route path: /stores
✔ Do you want a link in the menu? (y/N) y
```

It will modify the routes to add the `/stores` path, add the view to the Header and create the new View at `src/components/views/Stores.js`

Now you're ready to start the server.

Execute:

```bash
yarn
yarn start
```

You should see the map with a `Hello World` on the left sidebar.

### Create a layer

We're going to visualize now the dataset we've just created.

Let's create the required code for the Layer:

```bash
yarn hygen layer new
```

And answer the following (be sure you attach the layer to the view previously created):

```bash
✔ Name: StoresLayer
✔ Choose type · SQL dataset
✔ Type a query select store_id, storetype, revenue, address, the_geom_webmercator from retail_stores
✔ Do you want to attach to some view (y/N) y
✔ View name:  Stores
```

It'll create a new Layer file `src/components/layers/StoresLayer.js`, if you check the code of `src/components/views/Stores.js` you will see how the layer is attached.

If you reload now, you'll see the new layer in the map.

The code that has been added to the view is:

```javascript
  useEffect(() => {

    const SOURCE_ID = `storesLayerSource`
    const LAYER_ID = `storesLayer`

    // Add the source to the store
    dispatch(
      addSource({
        id: SOURCE_ID,
        data: `select store_id, storetype, revenue, address, the_geom_webmercator  from retail_stores`,
        type: 'sql',
      })
    );

    // Add the layer to the store
    dispatch(
      addLayer({
        id: LAYER_ID,
        source: SOURCE_ID,
      })
    );

    // Cleanup
    return function cleanup() {
      dispatch(removeLayer(LAYER_ID));
      dispatch(removeSource(SOURCE_ID));
    };
  }, [dispatch]);
```
  
`dispatch` function dispatches an action to Redux store. This is how this works:

1. The view dispatch the new source to the store.
2. The view dispatch the new layer to the store.
3. The Map Component is re-rendered since the store has changed.
4. The Map Component get all the layers in the store and draw them.

That's reactive programming, we can add the layer from anyplace of the application just dispatching the right action.

Now let's take a look at `src/components/layers/StoresLayer.js`:

```javascript
export default function StoresLayer() {
  // get the layer from the store
  const { storesLayer } = useSelector((state) => state.carto.layers);
  // get the source from the store
  const source = useSelector((state) => selectSourceById(state, storesLayer?.source));

  if (storesLayer && source) {
    // if the layer and the source are defined in the store
    return new CartoSQLLayer({
      id: 'storesLayer',
      // buildQueryFilters apply the current filters of the source to original query
      // we'll explain what are the filters later in this guide with the widgets
      data: buildQueryFilters(source),
      credentials: source.credentials,
      getFillColor: [241, 109, 122],
      pointRadiusMinPixels: 2,
    });
  }
}
```

Summary:

- To create a layer you need to define a function that returns a deck.gl layer.
- The layer must be added to the application layers array.
- You need to add the source and the layer to the store.

### Create widgets

Let's create a Formula and a Category Widget inside the View.

Replace the text `Hello World` with:

```javascript
<div>
  <FormulaWidget
    title='Total revenue'
    dataSource={SOURCE_ID}
    column='revenue'
    operation={AggregationTypes.SUM}
    viewportFilter
  ></FormulaWidget>

  <Divider />

  <CategoryWidget
    id='revenueByStoreType'
    title='Revenue by store type'
    dataSource={SOURCE_ID}
    column='storetype'
    operationColumn='revenue'
    operation={AggregationTypes.SUM}
    viewportFilter
  />
</div>
```

Add the following imports:

```javascript
import { AggregationTypes, FormulaWidget, CategoryWidget, HistogramWidget } from 'lib';
import { currencyFormatter } from 'utils/formatter';
```

Move the `const` definition outside the useEffect.

Widgets are listening to changes changes on the viewport (if the viewportFilter prop is passed), the viewport is part of the store, any time it changes, the widget refresh to filter the data with the new viewport.

## How the pieces work together

There are two main elements in the store the source and the viewport.

The layer re-render when the source changes.

The wiget re-render then the source changes or the viewport change.

Any time we change the viewport of the map (pan or zoom) the viewport change and all the widgets (with the viewportFilter prop) are refreshed.

Any time a widget apply a filter (for example click on a widget category), the filter is dispatched to the store:

```javascript
dispatch(
  addFilter({
    id: 'source',
    column,
    type: FilterTypes.IN,
    values: categories
  })
)
```

The filter is a change in the source, so it forces to re-render all the layers and widgets that uses the same source.

The map apply the filters via buildQueryFilters function that apply the current filters of the source.
