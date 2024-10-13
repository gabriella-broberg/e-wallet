
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  cards: [
    {
      id: '1',
      cardNumber: '1234 5678 9123 4567',
      cardHolder: 'John Doe',
      validThru: '12/25',
      vendor: 'visa',
      bank: 'Swedbank',
      isActive: true,
    },
    
  ],
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
