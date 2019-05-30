import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';


let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/",
    "component": require('../../layouts/index.js').default,
    "routes": [
      {
        "path": "/",
        "exact": true,
        "component": require('../index.js').default
      },
      {
        "path": "/navManage/category/categoryEdit",
        "exact": true,
        "component": require('../navManage/category/categoryEdit.js').default
      },
      {
        "path": "/navManage/category/component/NavBread",
        "exact": true,
        "component": require('../navManage/category/component/NavBread.js').default
      },
      {
        "path": "/navManage/category/component/RadioForm",
        "exact": true,
        "component": require('../navManage/category/component/RadioForm.js').default
      },
      {
        "path": "/navManage/category/component/indexTable",
        "exact": true,
        "component": require('../navManage/category/component/indexTable.js').default
      },
      {
        "path": "/navManage/category",
        "exact": true,
        "component": require('../navManage/category/index.js').default
      },
      {
        "path": "/navManage/category/loginPage",
        "exact": true,
        "component": require('../navManage/category/loginPage.js').default
      },
      {
        "component": () => React.createElement(require('E:/workobjectself/with-nav-and-sidebar/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'pages', hasRoutesInConfig: false })
      }
    ]
  },
  {
    "component": () => React.createElement(require('E:/workobjectself/with-nav-and-sidebar/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'pages', hasRoutesInConfig: false })
  }
];
window.g_routes = routes;
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  window.g_plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
window.g_history.listen(routeChangeHandler);
routeChangeHandler(window.g_history.location);

export default function RouterWrapper() {
  return (
<Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
  );
}
