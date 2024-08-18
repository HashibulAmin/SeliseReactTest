import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistStore, persistReducer } from 'redux-persist';
import appointmentReducer from './appointment';
import authReducer from './auth';

// Step 1: Create persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'appointment'], // Only persist the 'auth' reducer
};

// Step 2: Combine reducers
const rootReducer = combineReducers({
  appointment: appointmentReducer,
  auth: authReducer,
});

// Step 3: Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Step 4: Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types in serializability checks
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Step 5: Create the persistor
export const persistor = persistStore(store);

export default store;
