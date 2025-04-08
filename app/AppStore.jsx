import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE
} from 'redux-persist';
import authReducer from '../slices/AuthSlice';
import cartReducer from '../slices/cartSlice';

const persistAuthConfig = {
    key: 'auth',
    storage: AsyncStorage,
};

const persistCartConfig = {
    key: 'cart',
    storage: AsyncStorage,
};

const rootReducer = combineReducers({
    auth: persistReducer(persistAuthConfig, authReducer),
    cart: persistReducer(persistCartConfig, cartReducer),
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
});