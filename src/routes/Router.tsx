import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { routes } from "./routes";
import { RouteObject } from "../types/routes.types";
import { Suspense } from "react";

export const router = createBrowserRouter(
  createRoutesFromElements(
    routes?.map((route: RouteObject) => (
      <Route
        key={route.key}
        path={route.path}
        element={
          <Suspense fallback={<route.loader />}>
            {route.element ? <route.element /> : null}
          </Suspense>
        }
      >
        {route.children?.map((child: RouteObject) => (
          <Route
            key={child.key}
            path={child.path}
            element={
              <Suspense fallback={<route.loader />}>
                {child.element ? <child.element /> : null}
              </Suspense>
            }
          />
        ))}
      </Route>
    ))
  )
);
