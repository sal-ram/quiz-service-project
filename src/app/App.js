import StartRoute from '../StartRoute.component';
import AdminHome from '../admin/AdminHome.component';
// import CreateQuiz from '../admin/CreateQuiz.component';
import LoginAdmin from '../admin/LoginAdmin.component';
import './App.css';
import { Routes, Route, Navigate, useFetcher } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/start" element={<StartRoute />} />
        <Route path="/login" element={<LoginAdmin />} />
        <Route path="/admin" element={<AdminHome />} />
        {/* <Route path="/create-quiz" element={<CreateQuiz />} /> */}
        <Route path="*" element={<Navigate to="/start" replace />} />
      </Routes>
    </div>
  );
}

export default App;
