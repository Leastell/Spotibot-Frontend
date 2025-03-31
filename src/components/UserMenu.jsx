import { Button } from "@mantine/core";
import { useUser } from "./UserContext";

function UserMenu() {
    const { user, login, logout, userLoading } = useUser();

    if (!user && !userLoading) {
        return (
            <Button onClick={login} color="#5865F2" size="l">
                Login with Discord
            </Button>
        );
    } else if (!userLoading)
        return (
            <div
                style={{ display: "flex", alignItems: "center", gap: ".8rem" }}
            >
                <img
                    src={`https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png`}
                    alt="avatar"
                    style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                    }}
                />
                <span
                    style={{
                        fontSize: "1.5rem",
                    }}
                >
                    {user.global_name}
                    {user.discriminator > 0 ? "#" + user.discriminator : <></>}
                </span>
                <Button onClick={logout} color="#2e2e2e">
                    Logout
                </Button>
            </div>
        );
}

export default UserMenu;
