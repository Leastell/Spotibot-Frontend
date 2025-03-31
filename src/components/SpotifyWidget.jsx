import { AiFillSpotify, AiOutlineSpotify } from "react-icons/ai";
import { useUser } from "./UserContext";
import { Button } from "@mantine/core";

function SpotifyWidget() {
    const { user } = useUser();

    const connectSpotify = () => {
        window.location.href =
            import.meta.env.VITE_API_URL + "/api/auth/spotify";
    };

    return (
        <div className="spotify-widget">
            <Button
                onClick={connectSpotify}
                color="#1DB954"
                disabled={user && user.spotify && user.spotify.accessToken}
                size="lg"
            >
                <span className="icon">
                    <AiOutlineSpotify size={26} />
                </span>
                <span>Connect to Spotify</span>
            </Button>
        </div>
    );
}

export default SpotifyWidget;
