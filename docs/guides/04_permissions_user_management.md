
# Permissions and user management

CARTO supports [OAuth](https://en.wikipedia.org/wiki/OAuth) to communicate with our [APIs](https://carto.com/developers/). OAuth is the preferred way to manage credentials, so we recommend you use this protocol for implementing **authentication & authorization** in your applications.

OAuth `scopes` are used to specify what permissions will users have to give to the application. For example, `datasets:r:table_name` will grant `read` access to the table `table_name`.

The workflow is:

1) You login with the desired scopes.
2) You get an API_KEY (token) to call CARTO APIs but restricted to the requested scopes.

The first thing you need to do is go to your CARTO dashboard and create a new OAuth app as described in the [documentation](https://carto.com/developers/fundamentals/authorization/#oauth-apps), in order to get the clientID for your application.

Then, edit the `src/config/initialStateSlice.js` file and modify the clientId property in the `oauthInitialState` object. You can also modify the `scopes` property to specify what permissions you want to give the application.

The Datasets view in the [Sample Application](../../README.md#sample-application) includes an example showing how to list and load datasets from your account.

When you want the users to authenticate and give access to their CARTO account (it can be when loading the application or when you are using a restricted feature), you need to use the OAuthLogin component. This will display a popup with the implicit OAuth flow.

Once the flow has been completed you can get the user credentials like this:

```javascript
import { selectOAuthCredentials } from '@carto/react/redux';
const credentials = useSelector(selectOAuthCredentials);
```

This credentials can be used, for instance, when adding a new data source:

```javascript
dispatch(
  addSource({
    id: '<your_dataset_id>',
    data: '<your_sql_query>',
    credentials,
  })
);
```

Or to call directly to our APIs from your models. You have an example of this at [IsochroneModel](https://github.com/CartoDB/carto-react-template/blob/develop/template-sample-app/template/src/models/IsochroneModel.js).

The credentials object contains the username and the API key, so you can use them to call any of the CARTO REST APIs endpoints.
