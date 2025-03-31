import { Loader } from "@mantine/core";
import GuildManager from "../components/GuildManager";
import SpotifyWidget from "../components/SpotifyWidget";
import { useUser } from "../components/UserContext";

export default function Home() {
    const { user, userLoading } = useUser();

    if (userLoading)
        return (
            <div className="loader-container" style={{ width: "100%" }}>
                <Loader color="#2e2e2e" />
            </div>
        );
    else
        return (
            <div className="page">
                {user ? (
                    user.spotify ? (
                        <GuildManager />
                    ) : (
                        <>
                            <div className="suggestion-text">
                                <h3>Connect a Spotify account to continue</h3>
                            </div>
                            <SpotifyWidget />
                        </>
                    )
                ) : (
                    <div className="suggestion-text">
                        <h3>Login to continue</h3>
                    </div>
                )}
            </div>
        );
}
