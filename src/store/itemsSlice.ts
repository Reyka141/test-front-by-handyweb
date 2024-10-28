import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface Item {
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

interface ItemsState {
  categories: string[];
  activeCategories: string[];
  search: string;
}


const itemsAdapter = createEntityAdapter<Item>({
  sortComparer: (a, b) => b.price - a.price,
});

const initialState = itemsAdapter.getInitialState<ItemsState>({
  categories: [],
  activeCategories: [],
  search: '',
});

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItems: itemsAdapter.addMany,
    addCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    addActiveCategory: (state, action: PayloadAction<string>) => {
      if (!state.activeCategories.includes(action.payload))
        state.activeCategories.push(action.payload);
    },
    removeActiveCategory: (state, action: PayloadAction<string>) => {
      if (state.activeCategories.includes(action.payload))
        state.activeCategories = state.activeCategories.filter((value) => value !== action.payload);
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    removeSearch: (state) => {
      state.search = '';
    },
  },
});

export const { actions } = itemsSlice;
export const selector = itemsAdapter.getSelectors((state: RootState) => state.items);
export default itemsSlice.reducer;