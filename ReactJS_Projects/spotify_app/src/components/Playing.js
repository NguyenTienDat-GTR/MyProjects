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
        dispatch(getSongById(song.id + 1));
        dispatch(setCurrentSongId(song.id + 1));
    };

    const handleClickPrevious = () => {
        dispatch(getSongById(song.id - 1));
        dispatch(setCurrentSongId(song.id - 1));
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
    }, [song.id, dispatch, setCurrentSongId]);

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
