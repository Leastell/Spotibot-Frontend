import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { LuLink, LuPlus } from "react-icons/lu";
import { IoLogoDiscord } from "react-icons/io5";
import axios from "axios";

import LinkPlaylistModal from "./common/LinkPlaylistModal";
import PlaylistItem from "./common/PlaylistItem";

const PlaylistList = ({ guildId }) => {
    const [modalOpened, modalHandlers] = useDisclosure();
    const [guildDataLoading, setGuildDataLoading] = useState(true);
    const [guildPlaylistsLoading, setGuildPlaylistsLoading] = useState(true);
    const [guildData, setGuildData] = useState(null);
    const [userPlaylists, setUserPlaylists] = useState([]);
    const [guildPlaylists, setGuildPlaylists] = useState([]);
    const intervalRef = useRef(null);

    const updateGuildPlaylists = useCallback(() => {
        setGuildPlaylistsLoading(true);
        axios
            .get(`${import.meta.env.VITE_API_URL}/playlists/${guildId}`, {
                withCredentials: true,
            })
            .then((res) => setGuildPlaylists(res.data))
            .catch(console.error)
            .finally(() => setGuildPlaylistsLoading(false));
    }, [guildId]);

    useEffect(() => {
        if (!guildId) return;

        const fetchGuildData = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/discord/guild/${guildId}`,
                    { withCredentials: true }
                );
                setGuildData(res.data);
            } catch (err) {
                console.error("Error fetching guild data:", err);
            } finally {
                setGuildDataLoading(false);
            }
        };

        setGuildDataLoading(true);
        fetchGuildData();

        intervalRef.current = setInterval(fetchGuildData, 5000);
        return () => clearInterval(intervalRef.current);
    }, [guildId]);

    useEffect(() => {
        if (guildData?.botInGuild) {
            clearInterval(intervalRef.current);
            updateGuildPlaylists();
        }
    }, [guildData, updateGuildPlaylists]);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/spotify/playlists`, {
                withCredentials: true,
            })
            .then((res) => {
                const playlists = res.data.items.map((pl) => ({
                    value: pl.id,
                    label: pl.name,
                    images: pl.images || [],
                }));
                setUserPlaylists(playlists);
            });
    }, []);

    if (!guildId) {
        return (
            <div className="suggestion-text">
                <h3>Choose a server to manage playlists</h3>
            </div>
        );
    }

    if (guildDataLoading || !guildData) {
        return (
            <div className="loader-container" style={{ width: "100%" }}>
                <Loader color="#2e2e2e" />
            </div>
        );
    }

    if (!guildData.botInGuild) {
        return (
            <div className="playlist-list">
                <Button
                    className="create-playlist-button"
                    leftSection={
                        <IoLogoDiscord size={24} className="button-icon" />
                    }
                    color="#5865F2"
                    size="xl"
                    onClick={() => {
                        window.open(
                            guildData.inviteUrl,
                            "_blank",
                            "noopener,noreferrer"
                        );
                    }}
                >
                    Invite Bot to Server
                </Button>
            </div>
        );
    }

    return (
        <>
            <LinkPlaylistModal
                modalOpened={modalOpened}
                modalHandlers={modalHandlers}
                guildId={guildData.guildId}
                playlists={userPlaylists}
                channels={guildData.channels}
                createCallback={updateGuildPlaylists}
            />
            {guildPlaylistsLoading ? (
                <div className="loader-container">
                    <Loader color="#2e2e2e" />
                </div>
            ) : (
                <div className="playlist-list">
                    {guildPlaylists.length > 0 ? (
                        guildPlaylists.map((playlist) => (
                            <PlaylistItem
                                key={playlist._id}
                                playlistData={{
                                    ...playlist,
                                    ...playlist.playlistData,
                                }}
                                channelData={guildData.channels.find(
                                    (channel) =>
                                        channel.id == playlist.channelId
                                )}
                                updateGuildPlaylists={updateGuildPlaylists}
                            />
                        ))
                    ) : (
                        <div
                            className="suggestion-text"
                            style={{
                                marginTop: "10px",
                                marginBottom: "20px",
                            }}
                        >
                            <h3>
                                This server has no linked playlists
                                <br />
                                use the button below to create one
                            </h3>
                        </div>
                    )}
                    <Button
                        className="create-playlist-button"
                        leftSection={<LuLink className="button-icon" />}
                        color="#2e2e2e"
                        size="xl"
                        onClick={modalHandlers.open}
                    >
                        Connect a Playlist
                    </Button>
                </div>
            )}
        </>
    );
};

export default PlaylistList;
