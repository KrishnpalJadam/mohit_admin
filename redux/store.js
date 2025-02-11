import { configureStore } from "@reduxjs/toolkit";

// ** Slices
import admins from "./slices/admins.js";
import roles from "./slices/roles.js";
import siteSettings from "./slices/siteSettings.js";
import staticPages from "./slices/staticPages.js";
import homepage from "./slices/homepage.js";
import coupons from "./slices/coupons.js";
import shipping from "./slices/shipping.js";
import productSettings from "./slices/productSettings.js";
import products from "./slices/products.js";
import orders from "./slices/orders.js";
import customers from "./slices/customers.js";

//** Store
const store = configureStore({
  reducer: {
    admins,
    roles,
    siteSettings,
    staticPages,
    homepage,
    coupons,
    shipping,
    productSettings,
    products,
    orders,
    customers,
  },
});

export default store;
