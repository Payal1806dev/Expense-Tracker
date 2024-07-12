import React from "react";
import { Route, Routes } from "react-router-dom";
import { PrivateRouter } from "./PrivateRouter";

import Login from "../components/Login";
import routes from "../constants/routes";
import CategoryManagement from "../components/CategoryManagement";

import UsersManagement from "../components/UserManagement";

export const PublicRouter = () => {
  return (
    <>
      <Routes>
        
        <Route
          path={routes.LOGIN}
          element={<PrivateRouter component={Login} route={routes.LOGIN} />}
        />

        <Route
          path={routes.CATEGORY_MANAGEMENT}
          element={
            <PrivateRouter
              component={CategoryManagement}
              route={routes.CATEGORY_MANAGEMENT}
            />
          }
        />
      
        <Route
          path={routes.USER_MANAGEMENT}
          element={
            <PrivateRouter
              component={UsersManagement}
              route={routes.USER_MANAGEMENT}
            />
          }
        />
      </Routes>
    </>
  );
};
