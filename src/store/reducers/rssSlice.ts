import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RssState {
  urls: string[],
}

const initialState: RssState = {
  urls: [],
};

const rssSlice = createSlice({
  name: 'rss',
  initialState,
  reducers: {
    addUrl(state, action: PayloadAction<string>) {
      state.urls = [...state.urls, action.payload];
    }
  },
});

export default rssSlice;
