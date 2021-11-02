import React from "react";
import { Route, Switch } from "react-router-dom";

function Dashboard(props) {
  return (
    <Switch>
      {props.routes.map((prop, key) => {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      })}
    </Switch>
  );
}

export default Dashboard;
