// redux/cardsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cards: [],
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, action) => {
      state.cards.push(action.payload);
    },
    updateCard: (state, action) => {
      const index = state.cards.findIndex(card => card.id === action.payload.id);
      if (index !== -1) {
        state.cards[index] = action.payload; // Uppdatera kortet
      }
    },
    deleteCard: (state, action) => {
      state.cards = state.cards.filter(card => card.id !== action.payload);
    },
    activateCard: (state, action) => {
      state.cards = state.cards.map(card =>
        card.id === action.payload
          ? { ...card, isActive: true }
          : { ...card, isActive: false }
      );
    },
  },
});

export const { addCard, updateCard, deleteCard, activateCard } = cardsSlice.actions;
export default cardsSlice.reducer;
