import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import UserRoutes from "./Routes/UserRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import RegisterUser from "./Pages/SignupSignin/RegisterUser";
import LoginUser from "./Pages/SignupSignin/LoginUser";
import Layout from "./Components/Layout";
import { UserProvider } from "./Store/AuthUser";
import { Link } from "react-router-dom";

const App: React.FC = () => {
  return (
    <UserProvider>
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginUser/>} />
        <Route path="/register" element={<RegisterUser/>} />
        <Route path="/*" element={<div>This is not a valid route
         <div> <Link to="/user/home">Go Home</Link></div>
        </div>} />
        {/* User and Shared Routes */}
        <Route element={<Layout/>}>
        <Route path="/user/*" element={<UserRoutes />} />
        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />
        </Route>
      </Routes>
    </Router>
    </UserProvider>
  );
};

export default App;
