import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import SignUpStudent from './pages/SignUpStudent';
import SignUpTeacher from './pages/SignUpTeacher';
import SignIn from './pages/SignIn';
import ForgotPassword from './pages/ForgotPassword';
import ProfileSettings from './pages/ProfileSettings';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/signup/student" element={<SignUpStudent />} />
        <Route path="/signup/teacher" element={<SignUpTeacher />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
      </Route>
    </Routes>
  );
};

export default App;