import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "./UserContext";
import GuildDropdown from "./common/GuildDropdown";
import PlaylistList from "./PlaylistList";

const GuildManager = () => {
    const [userGuilds, setUserGuilds] = useState([]);
    const [selectedGuild, setSelectedGuild] = useState(undefined);
    const user = useUser();

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_API_URL + "/discord/guilds", {
                withCredentials: true,
            })
            .then((result) => {
                setUserGuilds(result.data);
            });
    }, [user]);

    return (
        <div className="guild-manager">
            <GuildDropdown
                guilds={userGuilds}
                selectedGuild={selectedGuild}
                setSelectedGuild={setSelectedGuild}
            />
            <PlaylistList guildId={selectedGuild} />
        </div>
    );
};

export default GuildManager;
