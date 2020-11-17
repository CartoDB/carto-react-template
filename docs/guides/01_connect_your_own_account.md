
### How to connect with your own account

This guide will show you how own to connect the app with your CARTO's account.

Edit `src/config/cartoSlice.js` file and add your own credentials to the initialState object:

```javascript
  initialState: {
    ...
    credentials: {
      username: '<your_username>',
      apiKey: '<your_api_key>',
      serverUrlTemplate: 'https://{user}.carto.com',
    },
    ...
  },
```

At this point, the Stores and KPI sections are not working. That's because the data sources of both sections are trying to fetch the data from your account and you don't have those datasets in your CARTO's account. To fix it, go to `Kpi.js` and `Stores.js` and link the data sources with the account where those datasets are by using the credentials property when calling the `addSource` reducer:

```javascript
dispatch(
  addSource({
    id: '...',
    data: '...',
    credentials: { username: public },
  })
);
```