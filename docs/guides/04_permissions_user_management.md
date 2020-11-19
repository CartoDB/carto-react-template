
# Permissions and user management

CARTO supports OAuth for accessing the datasets in your CARTO account. The Datasets view in the sample application includes an example showing how to list and load datasets from your account.

OAuth is the preferred way to manage credentials in CARTO so we recommend you use this protocol for implementing authentication & authorization in your applications.

If you want to integrate your application with CARTO using OAuth, the first thing you need to do is go to your CARTO dashboard and create a new OAuth app as described in the [documentation](https://carto.com/developers/fundamentals/authorization/#oauth-apps), in order to get the clientID for your application.

Then you need to edit the src/config/initialStateSlice.js file and modify the clientId property in the `oauthInitialState` object. You can also modify the `scopes` property to specify what permissions you want to give the application.

When you want the users to authenticate and give access to their CARTO account (it can be when loading the application or when you are using a restricted feature), you need to use the OAuthLogin component. This will display a popup with the implicit OAuth flow.

Once the flow has been completed you can get the user credentials like this:

```javascript
import { selectOAuthCredentials } from '@carto/react/redux';
const credentials = useSelector(selectOAuthCredentials);
```

This credentials can be used, for instance, when adding a new data source using the reducer:

```javascript
dispatch(
  addSource({
    id: '<your_dataset_id>',
    data: '<your_sql_query>',
    credentials,
  })
);
```

The credentials object contains the username and the API key so you can use them to call any of the CARTO REST APIs endpoints.
