# DoWeb

This is a sample project to practice react concepts. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation and use

- Clone project
- Run yarn to install packages
- Customize node_modules/react-scripts/config/webpack.config.dev.js to add yaml loader

```
   {
      test: /\.ya?ml$/,
      use: ['json-loader', 'yaml-loader']
   },
```

- Start the app server and database server
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
