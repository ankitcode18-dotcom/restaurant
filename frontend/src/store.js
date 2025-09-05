import { configureStore } from '@reduxjs/toolkit';
import UserReducer from "./reducers/User"
import AdminReducer from "./reducers/Admin"
import CartReducer from "./reducers/Cart"

const store = configureStore(
    {
        reducer: {
            "user": UserReducer,
            "admin": AdminReducer,
            "cart": CartReducer
        }
    }
)

export default store;