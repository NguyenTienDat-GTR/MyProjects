import { configureStore } from '@reduxjs/toolkit';
import { SongSlice } from './slice/SongSlice';
import { SongsSlice } from './slice/SongsSlice';

const Store = configureStore({
    reducer: {
        songs: SongsSlice.reducer,
        song: SongSlice.reducer,
    }
});

export default Store;