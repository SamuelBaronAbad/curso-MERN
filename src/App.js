import React from "react";
import "./App.scss"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./config/routes";
import AuthProvider from "./providers/AuthProvider";

/* Envolvemos la web entera con el hook useAuth para que cuando el 
usario haga una negacion siempre se ejecute y sepamos si hay un user logueado o no */
function App() {
  return (
    // Siempre que la web vaya a cualquier sitio va a pasar por el AuthProvider
    <AuthProvider>
      <Router>
        <Switch>
          {routes.map((route, index) => (
            <RouterWithSubRoutes key={index} {...route} />
          ))}
        </Switch>
      </Router>
    </AuthProvider>
  );
}

// Renderizar rutas Padres e hij@s
function RouterWithSubRoutes(route) {

  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => <route.component routes={route.routes} {...props} />}
    />
  );
}

export default App;
