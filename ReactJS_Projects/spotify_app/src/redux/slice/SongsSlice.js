import { createSlice } from "@reduxjs/toolkit";
import DataSongs from "../../data/songs.json";

export const SongsSlice = createSlice({
    name: "songs",
    initialState: {
        songs: [],
        currentSongId: null
    },
    reducers: {
        getListSong: (state) => {
            state.songs = DataSongs
        },
        setCurrentSongId: (state, action) => {
            state.currentSongId = action.payload;
        },
    },
});

export const { getListSong, setCurrentSongId } = SongsSlice.actions;
export const songsSelector = (state) => state.songs;
