import dataReducer from "./dataSlice";
import cartReducer from "./cartSlice";
import commonReducer from "./commonSlice";
import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    data: dataReducer,
    cart: cartReducer,
    common: commonReducer,
  })
);

let store = createStore(persistedReducer);
let persistor = persistStore(store);

export { store, persistor };
