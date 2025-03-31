/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(false);

    const updateUser = () => {
        setUserLoading(true);

        fetch(import.meta.env.VITE_API_URL + "/api/auth/user", {
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) throw new Error("Not logged in");
                return res.json();
            })
            .then(setUser)
            .catch(() => setUser(null))
            .finally(() => setUserLoading(false));
    };

    useEffect(() => {
        updateUser();
    }, []);

    const login = () => {
        window.location.href =
            import.meta.env.VITE_API_URL + "/api/auth/discord";
    };

    const logout = () => {
        fetch(import.meta.env.VITE_API_URL + "/api/auth/logout", {
            credentials: "include",
        }).then(() => {
            updateUser();
        });
    };

    return (
        <UserContext.Provider value={{ user, login, logout, userLoading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
