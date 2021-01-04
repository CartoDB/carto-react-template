# Create a page with a layer and widgets

On this guide we're going to explain how to create a new page with a layer and 2 widgets.

### Upload the dataset

Go to your dashboard and click on `New Dataset`->`Upload`.

Copy the following URL and click on `Submit`

```url
https://public.carto.com/api/v2/sql?filename=retail_stores&q=select+*+from+public.retail_stores&format=shp
```

If you want to access the dataset from the application, you can make it public. You can also create an [API KEY](https://carto.com/developers/auth-api/guides/CARTO-Authorization/) and keep them private. Totally up to you.

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

It'll modify the routes to add the `/stores` path, add the view to the Header and create the new View at `src/components/views/Stores.js`

Now you're ready to start the server:

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

It'll create a new layer file `src/components/layers/StoresLayer.js`, if you check the code of `src/components/views/Stores.js` you will see how the layer is attached.

If you reload now, you'll see the new layer in the map.

The code that has been added to the view is:

```javascript

  const SOURCE_ID = `storesLayerSource`;
  const LAYER_ID = `storesLayer`;
  
  useEffect(() => {

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

1. The view dispatches the new source to the store.
2. The view dispatches the new layer to the store.
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
  // set required default props, they manage the viewport changes and filters
  // we'll explain what are the filters later in this guide with the widgets
  const DEFAULT_PROPS = useCartoProps(source);

  if (storesLayer && source) {
    // if the layer and the source are defined in the store
    return new CartoSQLLayer({
      ...DEFAULT_PROPS,
      id: 'storesLayer',
      data: source.data,
      credentials: source.credentials,
      getFillColor: [241, 109, 122],
      pointRadiusMinPixels: 2
    });
  }
}
```

Summary:

- To create a layer you need to define a function that returns a deck.gl layer.
- The layer must be added to the application layers array.
- You need to add the source and the layer to the store.
- `DEFAULT_PROPS` are required.

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
    formatter={currencyFormatter}
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
    formatter={currencyFormatter}
    viewportFilter
  />
</div>
```

Add the following imports:

```javascript
import { Divider } from '@material-ui/core';
import { AggregationTypes, FormulaWidget, CategoryWidget, HistogramWidget } from '@carto/react/widgets';
import { currencyFormatter } from 'utils/formatter';
```

### Widgets source data

Two source data types can be used:

- SQL: Widgets will consume `global` data, without listening to the viewport changes. `viewportFilter` prop must be false.

- Client-side: Widgets will consume `viewport features` data, listening to the viewport changes. `viewportFilter` prop must be true. The viewport is part of the store, any time it changes, the widget refresh to filter the data with the new viewport.

Remarks
* Setting `viewportFilter={false}` is the same as not specifying the prop, because the default value is false.
* BigQuery layers need to capture data from client-side, requires `viewportFilter` prop set to true. Otherwise, you will get an error.

## How the pieces work together

There are two main elements in the store: the source and the viewport.

The layer is filtered when the source changes.

The widget is re-rendered when the source or viewport changes.

Any time we change the viewport of the map (pan or zoom), the viewport changes and all the widgets (with the `viewportFilter` prop) are refreshed.

Any time a widget applies a filter (for example clicking on a widget category), the filter is dispatched to the store:

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

The filter is a change in the source, so it forces to re-render the widgets and filter layers that uses the same source.

The map applies filters using `DataFilterExtension` from deck.gl, applying the current filters of the source.
