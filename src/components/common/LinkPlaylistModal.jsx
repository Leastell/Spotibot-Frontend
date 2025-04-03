import {
    Button,
    Container,
    Modal,
    Select,
    Stack,
    Text,
    Title,
    Group,
    Avatar,
    Checkbox,
    Tooltip,
} from "@mantine/core";
import React, { useState } from "react";
import PlaylistCombobox from "./PlaylistCombobox";
import ChannelCombobox from "./ChannelCombobox";
import axios from "axios";

const LinkPlaylistModal = ({
    modalOpened,
    modalHandlers,
    guildId,
    playlists,
    channels,
    createCallback,
}) => {
    const [selectedPlaylist, setSelectedPlaylist] = useState(undefined);
    const [selectedChannel, setSelectedChannel] = useState(undefined);
    const [isWeekly, setIsWeekly] = useState(false);
    const [allowDuplicates, setAllowDuplicates] = useState(false);
    const [linkPending, setLinkPending] = useState(false);

    const createPlaylist = async () => {
        setLinkPending(true);
        axios
            .post(
                import.meta.env.VITE_API_URL + "/playlists",
                {
                    guildId,
                    channelId: selectedChannel.id,
                    playlistId: selectedPlaylist.value,
                    options: {
                        weekly: isWeekly,
                        duplicates: allowDuplicates,
                    },
                },
                {
                    withCredentials: true, // send cookies/session
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLinkPending(false);
                createCallback();
                modalHandlers.close();
            });
    };

    return (
        <Modal opened={modalOpened} onClose={modalHandlers.close} withinPortal>
            <Stack>
                <Title
                    style={{
                        fontSize: "1.5rem",
                        marginBottom: "-5px",
                    }}
                >
                    Connect a Playlist
                </Title>
                <Text>
                    Spotify track links sent to the chosen channel will be added
                    to the chosen playlist.
                </Text>

                <ChannelCombobox
                    channels={channels}
                    onChange={(channel) => {
                        setSelectedChannel(channel);
                    }}
                />

                <PlaylistCombobox
                    playlists={playlists}
                    onChange={(playlist) => {
                        setSelectedPlaylist(playlist);
                    }}
                />

                <Title
                    style={{
                        fontSize: "1.25rem",
                        marginTop: "1rem",
                    }}
                >
                    Playlist Options
                </Title>

                <Group gap={"30px"}>
                    <Checkbox
                        label="Reset weekly"
                        checked={isWeekly}
                        onChange={(event) => {
                            setIsWeekly(event.currentTarget.checked);
                        }}
                        styles={{
                            label: { marginLeft: "-0.2rem" },
                        }}
                    />
                    <Checkbox
                        label="Duplicates allowed"
                        checked={allowDuplicates}
                        onChange={(event) => {
                            setAllowDuplicates(event.currentTarget.checked);
                        }}
                        styles={{
                            label: { marginLeft: "-0.2rem" },
                        }}
                    />
                </Group>

                <Button
                    onClick={createPlaylist}
                    disabled={
                        !selectedPlaylist || !selectedChannel || linkPending
                    }
                    loading={linkPending}
                >
                    Link
                </Button>
            </Stack>
        </Modal>
    );
};

export default LinkPlaylistModal;
