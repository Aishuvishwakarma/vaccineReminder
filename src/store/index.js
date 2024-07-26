import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import createSagaMiddleware from 'redux-saga';
import storage from "redux-persist/lib/storage";
import { createLogger } from "redux-logger";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers";
import watchSaga from './sagas'; 
const sagaMiddleware = createSagaMiddleware();


const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [sagaMiddleware];
if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middleware),
});

sagaMiddleware.run(watchSaga);

export const persistor = persistStore(store);
