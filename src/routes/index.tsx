import LoginPage from "../components/login";
import Companies from "../components/products";
import ProductsWithSearch from "../components/products/productPageWithSearch";
import Products from "../components/products/products";
import TestPage from "../components/test-page";

export const all_routes = [
    {
        title: "Home page",
        path: "/admin",
        component: Companies,
        exact:true,
        config: {
            showLink: true,
            structure: "layout"
        }
    },
    {
        title: "Home page",
        path: "/test-page",
        component: TestPage,
        exact:true,
        config: {
            showLink: true,
            structure: "layout"
        }
    },
    {
        title: "Home page",
        path: "/company-products/:id",
        component: Products,
        exact:true,
        config: {
            showLink: true,
            structure: "layout"
        }
    },
    {
        title: "Home page",
        path: "/company-products-search/:id",
        component: ProductsWithSearch,
        exact:true,
        config: {
            showLink: true,
            structure: "layout"
        }
    },
    {
        title: "Home page",
        path: "/login",
        component: LoginPage,
        exact:true,
        config: {
            showLink: true,
            structure: "nonelayout"
        }
    },
]