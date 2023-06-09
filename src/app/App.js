import { useContext } from 'react';
import StartRoute from '../components/pages/StartRoute.component';
import AdminHome from '../components/pages/admin/AdminHome.component';
import CreateQuiz from '../components/pages/admin/CreateQuiz.component';
import LoginAdmin from '../components/pages/admin/LoginAdmin.component';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Context } from '..';
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter } from 'react-router-dom';
import Loader from '../components/common/Loader.component';
import TeamLogin from "../components/pages/team/TeamLogin";
import TeamMainPage from "../components/pages/team/TeamMainPage";
import TeamContest from "../components/pages/team/TeamContest";
import TeamResults from "../components/pages/team/TeamResults";
import Header from '../components/common/Header.component';
import { Box } from '@mui/system';
import FinalQuizCreation from '../components/pages/admin/FinalQuizCreation/FinalQuizCreation.component';
import TeamWaitingPage from '../components/pages/team/TeamWaitingPage';
import ActiveSession from '../components/pages/admin/ActiveSession.component';
import TextQuestionCheck from '../components/pages/admin/TextQuestionCheck.component';
import TeamsResults from '../components/pages/admin/TeamsResults';

function App() {

  const { auth } = useContext(Context)
  const [user, loading, error] = useAuthState(auth)

  if (loading) {
    return (
      <Loader />
    )
  }

  return (
    <>
      <Box>
        <Header />
      </Box>
      <BrowserRouter>
        <Routes>
          <Route path="/start" element={<StartRoute />} />
          <Route path="/admin/login" element={user ? <Navigate to="/admin/home" /> : <LoginAdmin />} />
          <Route path="/admin/home" element={user ? <AdminHome /> : <Navigate to="/start" />} />
          <Route path="/admin/create-quiz" element={user ? <CreateQuiz /> : <Navigate to="/start" />} />
          <Route path="/admin/create-quiz-final/:quizId" element={user ? <FinalQuizCreation /> : <Navigate to="/start" />} />
          <Route path="/admin/active-session/:quizId" element={user ? <ActiveSession /> : <Navigate to="/start" />} />
          <Route path="/admin/check-answers/:quizId" element={user ? <TextQuestionCheck /> : <Navigate to="/start" />} />
          <Route path="/admin/results/:quizId" element={user ? <TeamsResults /> : <Navigate to="/start" />} />
          <Route path="/team/login" element={<TeamLogin />} />
          <Route path="/team/mainPage/:quizCode/:teamId" element={<TeamMainPage />} />
          <Route path="/team/contest/:quizCode/:teamId" element={<TeamContest />} />
          <Route path="/team/results/:quizCode/:teamId" element={<TeamResults />} />
          <Route path="*" element={<Navigate to="/start" replace />} />
          <Route path="/team/waiting/:quizCode/:teamId" element={<TeamWaitingPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
