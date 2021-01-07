import React from "react";
import "./App.scss"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./config/routes";


function App() {

  return (
   <Router>
     <Switch>
     {routes.map((route, index) => (
       <RouterWithSubRoutes key={index} {...route} />
     ))}
     </Switch>
   </Router>
  );
}

// Renderizar rutas Padres e hij@s
function RouterWithSubRoutes (route){

  return (
    <Route 
    path={route.path}
    exact={route.exact}
    render={props => <route.component routes={route.routes} {...props} />}
    />
  );
}

export default App;
