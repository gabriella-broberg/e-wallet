// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from '../redux/cardsSlice'; // Skapa reducer i nästa steg

const store = configureStore({
  reducer: {
    cards: cardsReducer,
  },
});

export default store;
