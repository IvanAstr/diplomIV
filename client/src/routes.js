import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
import Basket from "./pages/Basket"
import ProductPage from "./pages/ProductPage"
import {PaymentUs} from "./pages/PaymentUs"
import Shop from "./pages/Shop"
import {ContactUs} from "./pages/Cont"
import { ADMIN_ROUTE, BASKET_ROUTE, CONT_ROUTE, LOGIN_ROUTE, PRODUCT_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE,PAYMENT_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        element: <Admin/>
    },
    {
        path: BASKET_ROUTE,
        element: <Basket/>
    },
    {
        path: PAYMENT_ROUTE,
        element: <PaymentUs/>
    },
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        element: <Shop/>
    },
    {
        path: LOGIN_ROUTE,
        element: <Auth/>
    },
    {
        path: REGISTRATION_ROUTE,
        element: <Auth/>
    },    
    {
        path: PRODUCT_ROUTE + '/:id',
        element: <ProductPage/>
    },
    {
        path: CONT_ROUTE,
        element: <ContactUs/>
    }
]