import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListSong, songsSelector } from "../redux/slice/SongsSlice";
import { getSongById } from "../redux/slice/SongSlice";

export default function ListSongs() {

    const [idSong, setIdSong] = useState(0);
    const { songs } = useSelector((songsSelector));
    const dispatch = useDispatch();

    const handlePlaySong = (idSong) => {
        setIdSong(idSong);
        dispatch(getSongById(idSong));
    };

    useEffect(() => {
        dispatch(getListSong());
    }, []);

    return (
        <div className="col-span-2 overflow-y-scroll">
            <table className="table-auto w-full relative">
                <thead className="text-white text-xl h-14 sticky top-0 bg-slate-700">
                    <tr>
                        <th className="w-[10%]">#</th>
                        <th className="text-left">Title</th>
                        <th className="w-[10%]">Author</th>
                        <th className="w-[10%]">
                            <i className="fa fa-download" />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {songs.map((song, index) => (
                        <tr
                            key={index}
                            className={`bg-slate-800 h-12 text-xl cursor-pointer text-neutral-500 hover:bg-slate-600 hover:text-slate-100
                            ${idSong === song.id
                                    ? "bg-slate-600 text-teal-300"
                                    : ""
                                }`}
                            onClick={() => handlePlaySong(song.id)}
                        >
                            <td className="text-center">{index + 1}</td>
                            <td>{song.name}</td>
                            <td className="text-center">{song.author}</td>
                            <td className="text-center">
                                <a href={song.url}>
                                    <i className="fa fa-download" />
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
