import { Navigate, Route, Routes } from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import Dashboard from "./AdminPanel/Pages/Dashboard/Dashboard";
import PostsAtBlog from "./Blog/Pages/Posts/Posts";
import PostsAtAdminPanel from "./AdminPanel/Pages/Posts/Posts";
import CreatePost from "./AdminPanel/Pages/CreatePost/CreatePost";
import EditPost from "./AdminPanel/Pages/EditPost/EditPost";
import Post from "./Blog/Pages/Post/Post";
import Home from "./Blog/Pages/Home/Home";

const App = () => {
  return (
    //Main Routes for app /blog /admin-panel
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route index={true} path="/" element={<Navigate to="/blog" />}></Route>

      {/* Routes for blog */}
      <Route path="blog">
        <Route path="*" element={<NotFoundPage homePage="/blog" />} />
        <Route index={true} path="/blog" element={<Navigate to="/blog/home" />}></Route>

        <Route path="home">
          <Route index={true} element={<Home />}></Route>
        </Route>
        <Route path="posts">
          <Route index={true} element={<PostsAtBlog />}></Route>
        </Route>

        <Route path="post">
          <Route index={true} element={<Post />}></Route>
          <Route path=":postId">
            <Route index={true} element={<Post />}></Route>
          </Route>
        </Route>
      </Route>

      {/* Routes for admin panel */}
      <Route path="admin-panel">
        <Route path="*" element={<NotFoundPage homePage="/admin-panel" />} />
        <Route index={true} path="/admin-panel" element={<Navigate to="/admin-panel/dashboard" />}></Route>

        <Route path="dashboard">
          <Route index={true} element={<Dashboard />}></Route>
        </Route>

        <Route path="posts">
          <Route index={true} element={<PostsAtAdminPanel />}></Route>
          <Route path=":postId">
            <Route path="edit">
              <Route index={true} element={<EditPost />}></Route>
            </Route>
          </Route>
        </Route>

        <Route path="create">
          <Route index={true} element={<CreatePost />}></Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
