import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Stuff from "./pages/Stuff";
import TrashStuff from "./pages/TrashStuff";
import Inbound from "./pages/Inbound";
import InboundStore from "./pages/InboundStore";
import LendingStuff from "./pages/LendingStuff";
import Lending from "./pages/Lending";

export const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/login', element: <Login /> },
    { path: '/profile', element: <Profile /> },
    { path: '/dashboard', element: <Dashboard />},
    { path: '/stuffs', element: <Stuff />},
    { path: '/stuffs/trash', element: <TrashStuff /> },
    { path: '/inbound-stuffs', element: <Inbound /> },
    { path: '/inbound-stuffs/data', element: <InboundStore />},
    { path: 'lending', element: <LendingStuff />},
    { path: 'lendingStuff', element: <Lending />}
])