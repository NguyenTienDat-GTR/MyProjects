import React, { useContext, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Songs } from "../Context";

export default function Playing() {
    const { song, handleSetSong } = useContext(Songs);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);

    const handleClickNext = () => {
        handleSetSong(song.id + 1);
    };

    const handleClickPrevious = () => {
        handleSetSong(song.id - 1);
    };

    // Function to  auto play the next song
    const auToPlayNextSong = () => {
        setTimeout(() => {
            setCurrentSongIndex((prevIndex) => {
                // If it's the last song, go back to the first one
                if (prevIndex === song.length - 1) {
                    handleSetSong(song.id);
                    return 0;
                }
                // Otherwise, go to the next song
                handleSetSong(song.id + 1);
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
            onEnded={auToPlayNextSong}
        />
    );
}
