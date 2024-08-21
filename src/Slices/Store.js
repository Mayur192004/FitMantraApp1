import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default: localStorage
import rootReducer from '../reducer'; // Import your rootReducer

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store using configureStore
export const store = configureStore({
  reducer: persistedReducer,
});

// Create a persistor
export const persistor = persistStore(store);
