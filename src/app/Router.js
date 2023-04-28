import StartRoute from '../components/pages/StartRoute.component';
import AdminHome from '../components/pages/admin/AdminHome.component';
import CreateQuiz from '../components/pages/admin/CreateQuiz.component';
import LoginAdmin from '../components/pages/admin/LoginAdmin.component';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

export default function Router() {

    //TODO: вынести роуты в отдельный компонент и константы

    // if (user) {
    //   return (
    //     <Navigate to='/admin' />
    //   )
    // }

    return (
        <Routes>
            <Route path="/start" element={<StartRoute />} />
            <Route path="/login" element={<LoginAdmin />} />
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/create-quiz" element={<CreateQuiz />} />
            <Route path="*" element={<Navigate to="/start" replace />} />
        </Routes>
    );
}
