import { useContext } from 'react';
import StartRoute from '../StartRoute.component';
import AdminHome from '../admin/AdminHome.component';
import CreateQuiz from '../admin/CreateQuiz.component';
import LoginAdmin from '../admin/LoginAdmin.component';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Context } from '..';
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter } from 'react-router-dom';
import Loader from '../Loader.component';

function App() {

  const { auth } = useContext(Context)
  const [user, loading, error] = useAuthState(auth)

  if (loading) {
    return (
      <Loader />
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/start" element={<StartRoute />} />
        <Route path="/login" element={<LoginAdmin />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="*" element={<Navigate to="/start" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
