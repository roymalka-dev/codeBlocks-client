import { lazy } from "react";
import { RouteObject } from "../types/routes.types";
import MainLayout from "../layouts/MainLayout";
import ComponentLoader from "../components/loaders/ComponentLoader";

const LoginPage = lazy(() => import("../views/login/LoginPage"));
const LobyPage = lazy(() => import("../views/loby/LobyPage"));
const BlockPage = lazy(() => import("../views/block/BlockPage"));

export const routes: RouteObject[] = [
  {
    key: "login",
    path: "/",
    element: LoginPage,
    loader: ComponentLoader,
  },
  {
    key: "mainLayout",
    path: "/",
    element: MainLayout,
    loader: ComponentLoader,
    children: [
      {
        key: "loby",
        path: "/loby",
        element: LobyPage,
        loader: ComponentLoader,
      },
      {
        key: "block",
        path: "/block/:id",
        element: BlockPage,
        loader: ComponentLoader,
      },
    ],
  },
];
