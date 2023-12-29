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
                nextIndex = 0; // Quay lại bài đầu tiên nếu đang phát bài cuối cùng
            }
            dispatch(getSongById(songs[nextIndex].id));
            dispatch(setCurrentSongId(songs[nextIndex].id));
        }, 3000);
    };
    useEffect(() => {
        dispatch(setCurrentSongId(song.id)); // Cập nhật currentSongId khi bài hát thay đổi
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
