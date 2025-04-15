import { Routes, Route } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import MainLayout from './components/MainLayout';
import SignUpStudent from './pages/SignUpStudent';
import SignUpTeacher from './pages/SignUpTeacher';
import SignIn from './pages/SignIn';
import ForgotPassword from './pages/ForgotPassword';
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherProfilePublic from './pages/TeacherProfilePublic';
import StudentDashboard from './pages/StudentDashboard';
import StudentProfilePublic from './pages/StudentProfilePublic';
import WebinarsViewAll from './pages/WebinarsViewAll';
import JobsViewAll from './pages/JobsViewAll';
import Homepage from './pages-a/Homepage';
import About from './pages-a/About';
import Contact from './pages-a/Contact';
import FindTutor from './pages-a/FindTutor';
import BecomeTutor from './pages-a/BecomeTutor';
import { useEffect } from 'react';
const App = () => {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/find-tutor" element={<FindTutor />} />
        <Route path="/become-tutor" element={<BecomeTutor/>}/>
        <Route path="/signup-student" element={<SignUpStudent />} />
        <Route path="/signup-teacher" element={<SignUpTeacher />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/dashboard"
          element={
            user ? (
              user.role === 'teacher' ? (
                <TeacherDashboard />
              ) : user.role === 'student' ? (
                <StudentDashboard />
              ) : (
                <div className="text-center mt-10 text-red-600">Access denied. Invalid role.</div>
              )
            ) : (
              <div className="text-center mt-10 text-red-600">Please sign in to view your dashboard.</div>
            )
          }
        />
        <Route path="/teacher/:teacherId" element={<TeacherProfilePublic />} />
        <Route path="/student/:studentId" element={<StudentProfilePublic />} />
        <Route path="/webinars" element={<WebinarsViewAll />} />
        <Route path="/jobs" element={<JobsViewAll />} />
      </Route>
    </Routes>
  );
};

export default App;