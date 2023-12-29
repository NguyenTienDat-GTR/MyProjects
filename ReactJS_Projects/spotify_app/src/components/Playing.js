import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { songSelector, getSongById } from "../redux/slice/SongSlice";
import { songsSelector } from "../redux/slice/SongsSlice";


export default function Playing() {
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const dispatch = useDispatch();
    const { song } = useSelector(songSelector);
    const { songs } = useSelector(songsSelector); // get songs from songsSelector

    const handleClickNext = () => {
        dispatch(getSongById(song.id + 1));
    };

    const handleClickPrevious = () => {
        dispatch(getSongById(song.id - 1));
    };

    // Function to auto play the next song
    const autoPlayNextSong = () => {
        setTimeout(() => {
            setCurrentSongIndex((prevIndex) => {
                // If it's the last song, go back to the first one
                if (prevIndex === songs.length - 1) { // use songs.length instead of song.length
                    dispatch(getSongById(songs[0].id)); // play the first song
                    return 0;
                }
                // Otherwise, go to the next song
                dispatch(getSongById(songs[prevIndex + 1].id)); // play the next song
                return prevIndex + 1;
            });
        }, 3000);
    };

    return (
        <AudioPlayer
            className="player-music"
            src={song.url}
            layout="stacked-reverse"
            showSkipControls={true}
            onClickNext={handleClickNext}
            onClickPrevious={handleClickPrevious}
            onEnded={autoPlayNextSong}
        />
    );
}
