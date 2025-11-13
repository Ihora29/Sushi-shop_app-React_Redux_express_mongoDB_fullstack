import * as React from "react";
import { lazy } from "react";
import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
//  Основні компоненти
const AppLayout = lazy(() => import("../Components/AppLayout"));
const ErrorPage = lazy(() => import("../Components/ErrorPage"));
const MainPage = lazy(() => import("../Components/MainPage"));

//  Продукти
const CardSushi = lazy(() => import("../Components/ProductsCard/CardSushi"));
const CardSets = lazy(() => import("../Components/ProductsCard/CardSets"));
const CardDrinks = lazy(() => import("../Components/ProductsCard/CardDrinks"));
const CardMoti = lazy(() => import("../Components/ProductsCard/CardMoti"));
const Card = lazy(() => import("../Components/ProductsCard/Card"));
const SaleItems = lazy(() => import("../Components/ProductsCard/SaleItems"));

//  Акції та знижки
const Actions = lazy(() => import("../Components/Actions&Sale/Actions"));
const HBAction = lazy(() => import("../Components/Actions&Sale/HBAction"));
const ActionItemOfWeek = lazy(() => import("../Components/Actions&Sale/ActionItemOfWeek"));
const Action3in5 = lazy(() => import("../Components/Actions&Sale/Action3in5"));
const ActionTakeYourself = lazy(() => import("../Components/Actions&Sale/ActionTakeYourself"));

//  Сторінки замовлення та доставки
const MakeOrderPage = lazy(() => import("../Components/MakeOrderPage"));
const ZoneDelivery = lazy(() => import("../Components/delivery/ZoneDilivery"));
const CheckForBuy = lazy(() => import("../Components/popUp/CheckForBuy"));

//  Footer
const About = lazy(() => import("../Components/Footer/About"));
const OfertaPage = lazy(() => import("../Components/Footer/OfertaPage"));
const AboutUsPage = lazy(() => import("../Components/Footer/AboutUsPage"));

//  Кабінет користувача
const UserCabinet = lazy(() => import("../Components/user-cabinet/UserCabinet"));
const ChangeUserName = lazy(() => import("../Components/user-cabinet/ChangeUserName"));
const ChangeUserPass = lazy(() => import("../Components/user-cabinet/ChangeUserPass"));
const OrderHistory = lazy(() => import("../Components/user-cabinet/OrderHistory"));





const withSuspense = (Component) => (
    <Suspense fallback={<div>Loading...</div>}>
        <Component />
    </Suspense>
);

export const router = createBrowserRouter([
    {
        path: "/",
        element: withSuspense(AppLayout),
        errorElement: withSuspense(ErrorPage),
        children: [
            { index: true, element: withSuspense(MainPage) },
            { path: "sushi", element: withSuspense(CardSushi) },
            { path: "sets", element: withSuspense(CardSets) },
            { path: "moti", element: withSuspense(CardMoti) },
            { path: "drinks", element: withSuspense(CardDrinks) },
            { path: "product/:id", element: withSuspense(Card) },
            { path: "actions", element: withSuspense(Actions) },
            { path: "happy-birthday", element: withSuspense(HBAction) },
            { path: "roll-of-week", element: withSuspense(ActionItemOfWeek) },
            { path: "3in5", element: withSuspense(Action3in5) },
            { path: "take-yourself", element: withSuspense(ActionTakeYourself) },
            { path: "oferta", element: withSuspense(OfertaPage) },
            { path: "about-us", element: withSuspense(AboutUsPage) },
            { path: "create-order", element: withSuspense(MakeOrderPage) },
            { path: "best&sale_products", element: withSuspense(SaleItems) },
            {
                path: "user-cabinet/",
                element: withSuspense(UserCabinet),
                children: [
                    { path: "", element: withSuspense(ChangeUserName) },
                    { path: "changepass", element: withSuspense(ChangeUserPass) },
                    { path: "orderhistory", element: withSuspense(OrderHistory) },
                ],
            },
            { path: "zone-delivery", element: withSuspense(ZoneDelivery) },
            { path: "client-check", element: withSuspense(CheckForBuy) },
        ],
    },
]);
