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

    activateCard: (state, action) => {
      // Se till att bara ett kort är aktivt
      state.cards = state.cards.map((card) =>
        card.id === action.payload
          ? { ...card, isActive: true }
          : { ...card, isActive: false }
      );
    },

      deleteCard: (state, action) => {
        state.cards = state.cards.filter(card => card.id !== action.payload);
      },
    },
  });
  
  export const { addCard, activateCard, deleteCard } = cardsSlice.actions;
  export default cardsSlice.reducer;
  