import { LuUnlink } from "react-icons/lu";

const MiniLinkView = ({ playlist, channel }) => {
    return (
        <div className="mini-link-view">
            <div className="playlist-mini">
                <img
                    src={playlist.images[0].url}
                    alt=""
                    className="playlist-icon"
                />
                <span className="playlist-name">{playlist.name}</span>
            </div>
            <LuUnlink size={30} />
            <div className="mini-channel">#{channel.name}</div>
        </div>
    );
};

export default MiniLinkView;
