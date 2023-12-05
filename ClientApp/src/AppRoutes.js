import AdminPanel from "./Pages/AdminPanel/AdminPanel";
import Home from "./Pages/Home/Home";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";

const AppRoutes = [
    {
        path: "*",
        element: <NotFoundPage/>
    },
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
