import React, { useContext } from "react";
import { Songs } from "../Context";

export default function DetailSong() {
    const { song } = useContext(Songs);

    return (
        <div className="col-span-1 p-3">
            <h2 className="font-bold text-xl text-cyan-400">Now Playing</h2>
            <h2 className="font-medium text-3xl text-gray-500 mt-3 uppercase">
                {song.name}
            </h2>

            <div className="w-[320px] m-auto mt-5">
                <img className="w-full"
                    src={song.links.images[0].url}
                    alt="avatar"
                />
            </div>

            <div className="flex justify-evenly p-5 items-center">
                <img className="w-[80px] rounded-full"
                    src={song.links.images[1].url}
                    alt="avatar"
                />
                <div className="text-xl text-gray-200">{song.author}</div>
            </div>
        </div>
    );
}
