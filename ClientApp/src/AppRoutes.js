import AdminPanel from "./Pages/AdminPanel/AdminPanel";
import Home from "./Pages/Home/Home";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/admin-panel',
        element: <AdminPanel />
    }
];

export default AppRoutes;
