import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { RootState } from './store';

interface Item {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  rating: {
    rate: number,
    count: number
  }
};


const favoriteAdapter = createEntityAdapter<Item>();

const initialState = favoriteAdapter.getInitialState();

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addItem: favoriteAdapter.addOne,
    deleteItem: favoriteAdapter.removeOne,
  },
});

export const { actions } = favoriteSlice;
export const selector = favoriteAdapter.getSelectors((state: RootState) => state.favorite);
export default favoriteSlice.reducer;