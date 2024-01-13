import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Posts from "./Posts";
import Create from "./Create";
import Post from "./Post";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Posts} />
        <Route path="posts" Component={Posts} />
        <Route path="posts/:id" Component={Post} />
        <Route path="update/:id" Component={Create} />
        <Route path="create" Component={Create} />
      </Routes>
    </Router>
  );
}

function About() {
  return (
    <div>
      about <Link to={"/"}>Home</Link>
    </div>
  );
}
