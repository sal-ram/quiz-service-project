import StartRoute from '../StartRoute.component';
import AdminHome from '../admin/AdminHome.component';
import CreateQuiz from '../admin/CreateQuiz.component';
import LoginAdmin from '../admin/LoginAdmin.component';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

export default function Router() {

   //TODO: вынести роуты в отдельный компонент

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
