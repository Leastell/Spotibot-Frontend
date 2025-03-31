import { Routes, Route } from "react-router-dom";
import UserMenu from "./components/UserMenu";
import Home from "./pages/Home";
import "./App.css";

function App() {
    return (
        <div className="app-container">
            {/* Top bar */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "centert",
                }}
            >
                <div
                    className="logo"
                    style={{
                        margin: "-10px",
                        width: "80px",
                        height: "80px",
                    }}
                >
                    <img
                        src="/spotibot_transparent_center.png"
                        style={{ width: "100%", height: "100%" }}
                    />
                </div>
                <UserMenu />
            </div>

            {/* Main routed content */}
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    marginTop: "15px",
                }}
            >
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                </Routes>
            </div>
        </div>
    );
}

export default App;
