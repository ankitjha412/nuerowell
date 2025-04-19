import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./AuthPage.css"
import ParticlesBackground from '../ParticlesBackground';
import ParticlesBackground1 from '../ParticlesBackground1';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rollNo: ''
  });

  // 🧼 Clear sessionStorage on component load to avoid stale roles
  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'counselor') {
      setFormData((prev) => ({ ...prev, rollNo: '' }));
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role
      };

      if (role === 'student') {
        payload.rollNo = formData.rollNo;
      }

      const url = `${import.meta.env.VITE_BACKEND_URL}/api/auth/${isLogin ? 'login' : 'register'}`;
      const res = await axios.post(url, payload);

      if (isLogin) {
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('user', JSON.stringify(res.data.user));

        const path = res.data.user.role === 'student' ? '/student' : '/counselor';

        toast.success('Login successful!', {
          position: 'top-right',
          autoClose: 3000,
          onClose: () => {
            window.location.href = path;
          }
        });
      } else {
        toast.success('Registered successfully. Please login.', {
          position: 'top-right'
        });
        setIsLogin(true);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong!', {
        position: 'top-center'
      });
    }
  };

  return (
    <div style={{
      display: 'flex',
      height: '97.8vh',
      width: '100%',
      fontFamily: 'Arial, sans-serif'
    }}>
      
      {/* LEFT SIDE – Info/Branding Text */}
      <div style={{
  flex: 1,
  background: 'linear-gradient(135deg, #2e3cbf, #3d5afe)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  zIndex: 1000,
}}>

         <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1
  }}>
    <ParticlesBackground1 />
  </div>
        <h1 style={{ fontSize: '5rem', color: 'wheat'  }}>NeuroWell</h1>
        <p style={{ maxWidth: '80%', textAlign: 'center', fontSize: '1.8rem', color: 'wheat' }}>
          Your mental health companion. Talk with our AI or connect to a real counselor.
          We're here to help you feel better, one conversation at a time.
        </p>
      </div>
  
      {/* RIGHT SIDE – Auth Form */}
      <div style={{
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '40px',
  maxHeight: '100vh', // Corrected
  backgroundColor: '#ffffff' ,
  // Optional: soft white background
}}>

        <div className="auth-container" style={{ width: '100%', maxWidth: '400px',zIndex:1000 }}>
          <h2 style={{ textAlign: 'center' }}>{isLogin ? 'Login' : 'Signup'}</h2>
  
          <div className="role-buttons">
          <div style={{ 
  marginBottom: '10px', 
  display: 'flex', 
  justifyContent: 'center', 
  gap: '10px' 
}}>
  <button
    onClick={() => handleRoleChange('student')}
    disabled={role === 'student'}
    style={{
      padding: '10px 18px',
      fontSize: '1rem',
      borderRadius: '8px',
      border: role === 'student' ? '2px solid black' : '2px solid gray',
      fontWeight: '600',
      cursor: role === 'student' ? 'default' : 'pointer',
      backgroundColor: role === 'student' ? 'black' : 'white',
      color: role === 'student' ? 'white' : 'black',
      transform: 'scale(1)',
      transition: 'all 0.25s ease',
      boxShadow: role === 'student' ? '0 0 8px rgba(0,0,0,0.2)' : 'none'
    }}
  >
    Student
  </button>

  <button
    onClick={() => handleRoleChange('counselor')}
    disabled={role === 'counselor'}
    style={{
      padding: '10px 18px',
      fontSize: '1rem',
      borderRadius: '8px',
      border: role === 'counselor' ? '2px solid black' : '2px solid gray',
      fontWeight: '600',
      cursor: role === 'counselor' ? 'default' : 'pointer',
      backgroundColor: role === 'counselor' ? 'black' : 'white',
      color: role === 'counselor' ? 'white' : 'black',
      transform: 'scale(1)',
      transition: 'all 0.25s ease',
      boxShadow: role === 'counselor' ? '0 0 8px rgba(0,0,0,0.2)' : 'none'
    }}
  >
    Counselor
  </button>
</div>

</div>

  
          <form onSubmit={handleAuth}>
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{ display: 'block', width: '378px', marginBottom: '10px' }}
              />
            )}
  
            {!isLogin && role === 'student' && (
              <input
                type="text"
                name="rollNo"
                placeholder="Roll No"
                value={formData.rollNo}
                onChange={handleChange}
                required
                style={{ display: 'block', width: '378px', marginBottom: '10px' }}
              />
            )}
  
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ display: 'block', width: '378px', marginBottom: '10px' }}
            />
  
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ display: 'block', width: '378px', marginBottom: '10px' }}
            />
  
            <button type="submit" style={{ marginTop: '10px', width: '100%' }}>
              {isLogin ? 'Login' : 'Signup'}
            </button>
          </form>
  
          <p style={{ marginTop: '10px', textAlign: 'center' }}>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <span
              onClick={() => setIsLogin(!isLogin)}
              style={{ color: 'blue', cursor: 'pointer' }}
            >
              {isLogin ? 'Signup here' : 'Login here'}
            </span>
          </p>
        </div>
      </div>
  
      <ToastContainer />
    </div>
  );
  
};

export default AuthPage;
