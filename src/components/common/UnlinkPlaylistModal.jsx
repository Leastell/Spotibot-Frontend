import { Button, Modal, Stack, Text, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import MiniLinkView from "./MiniLinkView";
import axios from "axios";

const UnlinkPlaylistModal = ({
    modalOpened,
    modalHandlers,
    playlistRecordId,
    playlist,
    channel,
    unlinkCallback,
}) => {
    const [countdown, setCountdown] = useState(3);
    const [isEnabled, setIsEnabled] = useState(false);
    const [unlinkPending, setUnlinkPending] = useState(false);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer); // Cleanup timer
        } else {
            setIsEnabled(true); // Enable the button when countdown reaches 0
        }
    }, [countdown]);

    useEffect(() => {
        setCountdown(3);
        setIsEnabled(false);
    }, [modalOpened]);

    const unlinkPlaylist = async () => {
        setUnlinkPending(true);
        axios
            .delete(
                import.meta.env.VITE_API_URL +
                    "/api/playlists/" +
                    playlistRecordId,
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
                setUnlinkPending(false);
                unlinkCallback();
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
                    Unlink a Playlist?
                </Title>
                <Text>
                    Are you sure you want to disconnect this playlist? Tracks
                    will no longer be synced.
                </Text>
                <MiniLinkView playlist={playlist} channel={channel} />
                <Button
                    disabled={!isEnabled || unlinkPending}
                    color="red"
                    onClick={unlinkPlaylist}
                    loading={unlinkPending}
                >
                    {isEnabled ? "Unlink" : `Unlink (${countdown})`}
                </Button>
            </Stack>
        </Modal>
    );
};

export default UnlinkPlaylistModal;
