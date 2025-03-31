import React from "react";
import weeklyBadge from "/src/assets/weekly_badge.svg";
import duplicatesBadge from "/src/assets/duplicates_badge.svg";

const type_to_icon_map = {
    weekly: {
        src: weeklyBadge,
        text: "Weekly Playlist",
    },
    duplicates: {
        src: duplicatesBadge,
        text: "Duplicates Allowed",
    },
};

const PlaylistBadge = ({ type, depth }) => {
    return (
        <div
            className="playlist-badge"
            style={{
                marginRight: `${depth * 60}px`,
                zIndex: 100 - depth,
            }}
        >
            <img src={type_to_icon_map[type].src} className="badge-icon" />
            <div className="helper-text">{type_to_icon_map[type].text}</div>
        </div>
    );
};

export default PlaylistBadge;
