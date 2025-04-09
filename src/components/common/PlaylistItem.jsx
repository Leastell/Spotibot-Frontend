import { useState } from "react";
import { FiHash } from "react-icons/fi";
import { LuLink } from "react-icons/lu";
import { LuUnlink } from "react-icons/lu";
import { useDisclosure } from "@mantine/hooks";
import he from "he";
import UnlinkPlaylistModal from "./UnlinkPlaylistModal";
import PlaylistBadge from "./PlaylistBadge";

const PlaylistItem = ({ playlistData, channelData, updateGuildPlaylists }) => {
    const [linkHovered, setLinkHovered] = useState(false);
    const [modalOpened, modalHandlers] = useDisclosure();

    return (
        <>
            <UnlinkPlaylistModal
                modalOpened={modalOpened}
                modalHandlers={modalHandlers}
                playlistRecordId={playlistData._id}
                playlist={playlistData}
                channel={channelData}
                unlinkCallback={updateGuildPlaylists}
            />
            <div className="playlist-item">
                <div className="playlist-item-inner">
                    <div className="spotify-playlist-info">
                        <div className="icon">
                            <img
                                src={
                                    playlistData?.images?.[0]?.url ||
                                    "/empty_playlist.png"
                                }
                            />
                        </div>
                        <div className="text">
                            <span className="title">{playlistData.name}</span>
                            {playlistData.description ? (
                                <span className="description">
                                    {he.decode(playlistData.description)}
                                </span>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    <div className="channel-info">
                        <div className="channel-icon">
                            <FiHash size={30} style={{ marginLeft: 6 }} />
                            <span className="channel-name">
                                {channelData.name}
                            </span>
                        </div>
                    </div>
                    <div
                        className="link-icon"
                        onMouseEnter={() => {
                            setLinkHovered(true);
                        }}
                        onMouseLeave={() => {
                            setLinkHovered(false);
                        }}
                        onClick={modalHandlers.open}
                    >
                        {!linkHovered ? (
                            <LuLink size={28} />
                        ) : (
                            <LuUnlink size={28} />
                        )}
                    </div>
                </div>
                {Object.entries(playlistData.options)
                    // eslint-disable-next-line no-unused-vars
                    .filter(([_, value]) => value)
                    .map(([option], index) => (
                        <PlaylistBadge
                            key={option}
                            type={option}
                            depth={index}
                        />
                    ))}
            </div>
        </>
    );
};

export default PlaylistItem;
