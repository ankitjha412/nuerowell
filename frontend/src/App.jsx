// // src/App.jsx
// import { Routes, Route, Navigate } from 'react-router-dom';
// import AuthPage from './components/AuthPage/AuthPage';
// import StudentPage from './pages/StudentPage/StudentPage';
// import CounselorPage from './pages/CounselorPage/CounselorPage';

// const App = () => {
//   const token = sessionStorage.getItem('token');
//   const user = JSON.parse(sessionStorage.getItem('user'));

//   return (
//     <Routes>
//       <Route path="/" element={<AuthPage />} />

//       <Route
//         path="/student"
//         element={
//           token && user?.role === 'student' ? (
//             <StudentPage />
//           ) : (
//             <Navigate to="/" />
//           )
//         }
//       />

//       <Route
//         path="/counselor"
//         element={
//           token && user?.role === 'counselor' ? (
//             <CounselorPage />
//           ) : (
//             <Navigate to="/" />
//           )
//         }
//       />

//       <Route path="*" element={<Navigate to="/" />} />
//     </Routes>
//   );
// };

// export default App;


import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './components/AuthPage/AuthPage';
import StudentPage from './pages/StudentPage/StudentPage';
import CounselorPage from './pages/CounselorPage/CounselorPage';
import About from './components/About/About';         // ⬅️ Import About
import Contact from './components/Contact/Contact';     // ⬅️ Import Contact

const App = () => {
  const token = sessionStorage.getItem('token');
  const user = JSON.parse(sessionStorage.getItem('user'));

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />

      {/* Public pages */}
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* Protected routes */}
      <Route
        path="/student"
        element={
          token && user?.role === 'student' ? (
            <StudentPage />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/counselor"
        element={
          token && user?.role === 'counselor' ? (
            <CounselorPage />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
