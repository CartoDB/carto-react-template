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

Now, we're going to create a view called Stores that respond to the path `/stores`.

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

### Create a source

A source is the main piece code in a CARTO React project. Layers and widgets depends both on the sources. That's why it's important to know how to create them correctly.

The sources and the models are the only one pieces that contact with the CARTO backend, but there are some difference:

1. The model exports simple functions that receive parameters and make a request to receive the values that feed a view. That request can be against the CARTO SQL API or your own backend.
2. The source exports a plain object with a certain structure that will be understood by CARTO React library to feed layers or widgets with the CARTO SQL API and Maps API.

Both model and source folders can be found inside the `/data` folder:

```
└── data
    ├── models
    └── sources
```

The goal of `/data` folder is to easily differentiate the parts of the project that have a communication with external services, like CARTO APIs, your own backend, geojson files or whatever.

To create a source you can use hygen:

```yarn hygen source new```

In this case, we're going to create a new source that can feed a layers & widgets with the dataset we uploaded before. In this case, it's going to be called `StoresSource` (source word is optional):

```bash
✔ Name: StoresSource
✔ Choose type: SQL dataset
✔ Type a query: select cartodb_id, store_id, storetype, revenue, address, the_geom_webmercator from retail_stores
```

After filling all the requirements, it creates a new file `src/data/sources/storesSource.js` that will contains the following basic structure:

```javascript
const STORES_SOURCE_ID = 'StoresSource';

const source = {
  id: STORES_SOURCE_ID,
  data: `
    select cartodb_id, store_id, storetype, revenue, address, the_geom_webmercator from retail_stores
  `,
  type: 'sql',
};

export default source;
```

This structure can be improved and it's **highly recommended** to follow those improvements: create a new constant called `STORES_SOURCE_COLUMNS` that exposes the columns that will be used, for example, in widgets. An example would be a widget that sum the revenues, then we will have:

```javascript
export const STORES_SOURCE_COLUMNS = {
  REVENUE: 'revenue',
  STORE_TYPE: 'storeType',
} 

export default {
  id: STORES_SOURCE_ID,
  data: `
    select
      store_id,
      storetype as ${STORES_SOURCE_COLUMNS.STORE_TYPE},
      revenue as ${STORES_SOURCE_COLUMNS.REVENUE},
      address,
      the_geom_webmercator
    from retail_stores
  `,
  type: 'sql',
};
```

Doing that, our code with be less trend to have bugs due to future changes in the model of the database, you will use in the widgets `STORES_SOURCE_COLUMNS.REVENUE` and you won't care about how revenue is getted or what it the column that contain that value. It's better for teams with different roles where the backend engineer take the responsability to define the models and sources and the frontend just consume them in a safe way using constants defined by the backend.

### Create a layer

We're going to visualize now the source we've just created.

Let's create the required code for the Layer:

```bash
yarn hygen layer new
```

And answer the following (be sure you attach the layer to the view previously created):

```bash
✔ Name: StoresLayer
✔ Choose a source: StoresSource
✔ Do you want to attach to some view (y/N) y
✔ Choose a view: Stores
```

It'll create a new layer file `src/components/layers/StoresLayer.js`, if you check the code of `src/components/views/Stores.js` you will see how the layer is attached.

If you reload now, you'll see the new layer in the map.

The code that has been added to the view is:

```javascript
  import { STORES_LAYER_ID } from 'components/layers/StoresLayer';
  import storesSource from 'data/sources/storesSource';

  useEffect(() => {
    // Add the source to the store
    dispatch(
      addSource(storesSource)
    );

    // Add the layer to the store
    dispatch(
      addLayer({
        id: STORES_LAYER_ID,
        source: storesSource.id,
      })
    );

    // Cleanup
    return () => {
      dispatch(removeLayer(STORES_LAYER_ID));
      dispatch(removeSource(storesSource.id));
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
export const STORES_LAYER_ID = 'storesLayer';

export default function StoresLayer() {
  // get the layer from the store
  const { storesLayer } = useSelector((state) => state.carto.layers);
  // get the source from the store
  const source = useSelector((state) => selectSourceById(state, storesLayer?.source));
  // set required CARTO filter props, they manage the viewport changes and filters
  // we'll explain what are the filters later in this guide with the widgets
  const cartoFilterProps = useCartoLayerFilterProps(source);

  if (storesLayer && source) {
    // if the layer and the source are defined in the store
    return new CartoSQLLayer({
      ...cartoFilterProps,
      id: STORES_LAYER_ID,
      data: source.data,
      credentials: source.credentials,
      getFillColor: [241, 109, 122],
      pointRadiusMinPixels: 2
    });
  }
}
```

Summary:

- To create a layer you need to:
    1. Define a function that returns a deck.gl layer.
    2. Exports the ID as a constant.
- The layer must be added to the application layers array.
- You need to add the source and the layer to the store.
- `cartoFilterProps` are required.

### Create widgets

Let's create a Formula and a Category Widget inside the View.

Replace the text `Hello World` with:

```javascript
<div>
  <FormulaWidget
    id='totalRevenue'
    title='Total revenue'
    dataSource={storesSource.id}
    column={STORES_SOURCE_COLUMNS.REVENUE}
    operation={AggregationTypes.SUM}
    formatter={currencyFormatter}
    viewportFilter
  ></FormulaWidget>

  <Divider />

  <CategoryWidget
    id='revenueByStoreType'
    title='Revenue by store type'
    dataSource={storesSource.id}
    column={STORES_SOURCE_COLUMNS.STORE_TYPE}
    operationColumn={STORES_SOURCE_COLUMNS.REVENUE}
    operation={AggregationTypes.SUM}
    formatter={currencyFormatter}
    viewportFilter
  />
</div>
```

> **Note**: as you can see, we are using here the `STORES_SOURCE_COLUMNS` that we created before. It's **very important** to use constants and avoid to hardcode column names.

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
    id: source.id,
    column,
    type: FilterTypes.IN,
    values: categories
  })
)
```

The filter is a change in the source, so it forces to re-render the widgets and filter layers that uses the same source.

The map applies filters using `DataFilterExtension` from deck.gl, applying the current filters of the source.
