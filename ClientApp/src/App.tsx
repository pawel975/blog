import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./custom.css";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import Feed from "./Blog/Pages/Feed/Feed";
import Dashboard from "./AdminPanel/Pages/Dashboard/Dashboard";
import Posts from "./AdminPanel/Pages/Posts/Posts";
import CreatePost from "./AdminPanel/Pages/CreatePost/CreatePost";

const App = () => {
  return (
    //Main Routes for app /blog /admin-panel
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route index={true} path="/" element={<Navigate to="/blog" />}></Route>

      {/* Routes for blog */}
      <Route path="blog">
        <Route path="*" element={<NotFoundPage homePage="/blog" />} />
        <Route
          index={true}
          path="/blog"
          element={<Navigate to="/blog/feed" />}
        ></Route>

        <Route path="feed">
          <Route index={true} element={<Feed />}></Route>
        </Route>
      </Route>

      {/* Routes for admin panel */}
      <Route path="admin-panel">
        <Route path="*" element={<NotFoundPage homePage="/admin-panel" />} />
        <Route
          index={true}
          path="/admin-panel"
          element={<Navigate to="/admin-panel/dashboard" />}
        ></Route>

        <Route path="dashboard">
          <Route index={true} element={<Dashboard />}></Route>
        </Route>

        <Route path="posts">
          <Route index={true} element={<Posts />}></Route>
        </Route>

        <Route path="create">
          <Route index={true} element={<CreatePost />}></Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
