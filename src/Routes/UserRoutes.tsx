import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoutes';
import { useUser } from '../Store/AuthUser';
import HomePage from '../Pages/Home/HomePage';
const UserRoutes: React.FC = () => {
  const {user}= useUser()
  console.log(user)
  // const authUser: undefined | Record<string, string> = (() => {
  //   const userData = localStorage.getItem("user");
  //   return userData ? JSON.parse(userData) : undefined;
  // })();
  
  const isUserAuthenticated = user?.role !== undefined && (Number(user?.role) === 0 || Number(user?.role) === 1);
  console.log(isUserAuthenticated , "authenticate")
  return (
    <Routes>
      <Route element={<ProtectedRoute isAuthenticated={isUserAuthenticated} redirectTo="/login" />}>
        <Route path="/home" element={<HomePage/>} />
        <Route path="/dd" element={<h1>user dd</h1>} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
