import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./custom.css";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import Blog from "./Pages/Blog/Blog";
import Feed from "./Pages/Blog/Pages/Feed/Feed";
import AdminPanel from "./Pages/AdminPanel/AdminPanel";

const App = () => {
  return (
    //Main Routes for app /blog /admin-panel
    <Routes>
      <Route path="*" element={<NotFoundPage />} />

      <Route index path="/" element={<Navigate to="/blog" />}></Route>

      <Route path="blog">
        <Route index={true} element={<Blog />} />
        <Route path="feed">
          <Route index={true} element={<Feed />}></Route>
        </Route>
      </Route>

      <Route path="admin-panel">
        <Route index={true} element={<AdminPanel />} />
      </Route>
    </Routes>
  );
};

export default App;