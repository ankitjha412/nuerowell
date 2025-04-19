import React, { useRef, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import emailjs from 'emailjs-com';

const Contact = () => {
  const form = useRef();
  const [sent, setSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'your_service_id',       // ✅ Replace with yours
      'your_template_id',      // ✅ Replace with yours
      form.current,
      'your_user_id'           // ✅ Replace with yours
    ).then(
      (result) => {
        console.log(result.text);
        setSent(true);
        form.current.reset();
      },
      (error) => {
        console.log(error.text);
      }
    );
  };

  return (
    <div style={styles.pageWrapper}>
      <Navbar />
      <section id="contact" style={styles.container}>
        <h2 style={styles.heading}>Contact Us</h2>
        <p style={styles.text}>Fill out the form and we’ll get back to you soon.</p>

        <form ref={form} onSubmit={sendEmail} style={{ maxWidth: '500px', margin: '40px auto 0' }}>
          <input type="text" name="user_name" placeholder="Your Name" required style={inputStyle} />
          <input type="email" name="user_email" placeholder="Your Email" required style={inputStyle} />
          <textarea name="message" placeholder="Your Message" rows="5" required style={inputStyle} />
          <button type="submit" style={buttonStyle}>Send Message</button>
          {sent && <p style={{ color: 'green', marginTop: '10px' }}>✅ Message sent successfully!</p>}
        </form>
      </section>
    </div>
  );
};

const styles = {
  pageWrapper: {
    background: 'linear-gradient(to bottom,rgb(11, 118, 195), #ffffff)',
    Height: '100vh',
  },
  container: {
    padding: '60px 20px',
    textAlign: 'center',
    fontFamily: "'Poppins', sans-serif",
  },
  heading: {
    fontSize: '2.5rem',
    color: '#1565c0',
    marginBottom: '10px'
  },
  text: {
    fontSize: '1.1rem',
    color: '#555',
    marginBottom: '30px'
  }
};

const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    margin: '12px 0',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: '#f9fbfd',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
    transition: 'border 0.3s ease',
    outline: 'none'
  };
  
  const inputFocusStyle = {
    border: '1px solid #1565c0'
  };
  
  const buttonStyle = {
    padding: '14px 24px',
    backgroundColor: '#1565c0',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '16px',
    fontSize: '1rem',
    boxShadow: '0 4px 12px rgba(21, 101, 192, 0.2)',
    transition: 'background 0.3s ease'
  };
  
export default Contact;
