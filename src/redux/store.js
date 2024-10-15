// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from '../redux/cardsSlice'; // Skapa reducer i nästa steg
import themeReducer from './themeSlice';


const store = configureStore({
  reducer: {
    cards: cardsReducer,
    theme: themeReducer,
  },
});

export default store;
