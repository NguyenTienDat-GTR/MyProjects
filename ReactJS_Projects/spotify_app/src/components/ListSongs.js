import React, { useContext, useEffect, useState, useRef } from "react";
import { Songs } from "../Context";

export default function ListSongs() {
    const { DataSongs, handleSetSong, song } = useContext(Songs);
    const [idSong, setIdSong] = useState(0);
    const songRef = useRef(null);
    const handlePlaySong = (idSong) => {
        setIdSong(idSong);
        handleSetSong(idSong);
    };

    useEffect(() => {
        setIdSong(song.id);
        if (songRef.current) {
            songRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [song]);

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
                    {DataSongs.map((song, index) => (
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
