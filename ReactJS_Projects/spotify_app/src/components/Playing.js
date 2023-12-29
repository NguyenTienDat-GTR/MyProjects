import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { songSelector, getSongById } from "../redux/slice/SongSlice";
import { songsSelector, setCurrentSongId } from "../redux/slice/SongsSlice";

export default function Playing() {
    //const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const dispatch = useDispatch();
    const { song } = useSelector(songSelector);
    const { songs, currentSongId } = useSelector(songsSelector); // get songs from songsSelector

    const handleClickNext = () => {
        const nextSongId = song.id + 1;
        dispatch(getSongById(nextSongId));

        // If the current song is the last song, return to the first song
        if (currentSongId === songs.length - 1) {
            dispatch(getSongById(songs[0].id)); // uupdate song to the first song
            dispatch(setCurrentSongId(songs[0].id)); // update currentSongId to the first song
        } else {
            let nextIndex = currentSongId + 1;
            dispatch(setCurrentSongId(nextIndex));// update currentSongId to the next song
        }

    };

    const handleClickPrevious = () => {
        const previousSongId = song.id - 1;
        dispatch(getSongById(previousSongId));

        // If the current song is the first song, return to the last song
        if (currentSongId === 0) {
            dispatch(getSongById(songs.length - 1));// update song to the last song
            dispatch(setCurrentSongId(songs.length - 1));// update currentSongId to the last song
        } else {
            dispatch(setCurrentSongId(song.id - 1));// update currentSongId to the previous song
        }
    };

    // Function to auto play the next song
    const autoPlayNextSong = () => {
        setTimeout(() => {
            let nextIndex = currentSongId + 1;
            if (nextIndex >= songs.length) {
                nextIndex = 0; // return to the first song if the current song is the last song
            }
            dispatch(getSongById(songs[nextIndex].id));// get the next song if the current song is the last song
            dispatch(setCurrentSongId(songs[nextIndex].id));// set the current song to the next song
        }, 3000);
    };
    useEffect(() => {
        dispatch(setCurrentSongId(song.id)); // update currentSongId when the song was changed
    }, [song.id, dispatch]);

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
