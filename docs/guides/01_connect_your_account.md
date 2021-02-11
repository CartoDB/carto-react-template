
# Connect your CARTO account

As a first step you need to connect your CARTO account.

Edit `src/store/initialStateSlice.js` file and add your own credentials.

```javascript
    ...
    credentials: {
      username: '<your_username>',
      apiKey: '<your_api_key>',
      serverUrlTemplate: 'https://{user}.carto.com',
    },
    ...
  },
```

The API KEY could be set to `default_public` if you're dealing with public datasets and you don't need to use dataservices (geocoding, routing or isochrones).

If you're dealing with private data and/or data services you need to provide a valid [API KEY](https://carto.com/developers/auth-api/guides/CARTO-Authorization/).

OAuth Apps are available for more complex use cases, we'll cover this later on [Permissions and user management](04_permissions_user_management.md).

Once you've connected your account, jump to the next guide [Create a page with a layer and widgets](02_page_layer_widgets.md).
