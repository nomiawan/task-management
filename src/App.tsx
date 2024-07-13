import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./components/dashboard/Home";
import store from "./store/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Projects } from "./components/projects/Projects";
import { Users } from "./components/users/Users";
import { ProjectTasks } from "./components/tasks/ProjectTasks";
import { AssignedProjects } from "./components/tasks/AssignedProjects";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Settings } from "./components/profile/Settings";

function App() {
  let value = localStorage.getItem("userData");
  let userData = value ? JSON.parse(value) : null;
  return (
    <Provider store={store}>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="dashboard" element={<Layout />}>
            <Route index element={<Home />} />
            {userData?.user?.role == 'admin' ? 
            <Route path="projects" element={<Projects />} /> :
            <Route path="projects" element={<AssignedProjects />} /> 
            }
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="projects/tasks/:id" element={<ProjectTasks />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
