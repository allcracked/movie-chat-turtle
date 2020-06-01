import React from "react";
import { RouteProps, Route, Redirect } from "react-router";
import { useSelector } from "react-redux";

import { RootState } from "../../store/index";

const SecureRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.loggedUser.loggedIn
  );

  return (
    <Route
      {...rest}
      render={(props): React.ReactElement =>
        isLoggedIn && Component ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default SecureRoute;
