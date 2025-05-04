import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoutes';
import Posts from '../Pages/Posts/posts';
import { useUser } from '../Store/AuthUser';
import Categories from '../Pages/Categories/Categories';

const AdminRoutes: React.FC = () => {
  const {user} = useUser()
  // const [isLoading, setIsLoading] = React.useState(true);

  // React.useEffect(() => {
  //   if (user !== null) setIsLoading(false);
  // }, [user]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  
  const isAdminAuthenticated = user !== null && (Number(user?.role) === 1); // Replace with actual authentication logic
console.log(isAdminAuthenticated)
console.log(user , "userr")
  return (
    <Routes>
      <Route element={<ProtectedRoute isAuthenticated={isAdminAuthenticated} redirectTo="/login" />}>
        <Route path="/posts" element={<Posts/>} />
        <Route path="/categories" element={<Categories/>} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
