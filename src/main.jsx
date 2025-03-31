import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./components/UserContext";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "./index.css";
import "./App.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <UserProvider>
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{ colorScheme: "dark" }}
                defaultColorScheme="dark"
            >
                <App />
            </MantineProvider>
        </UserProvider>
    </BrowserRouter>
);
