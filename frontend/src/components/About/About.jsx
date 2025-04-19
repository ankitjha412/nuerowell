import React from 'react';
import Navbar from '../Navbar/Navbar';

const About = () => {
  return (
    <div style={styles.pageWrapper}>
      <Navbar />

      <section id="about" style={styles.container}>
        <h2 style={styles.heading}>About NeuroWell</h2>

        <p style={styles.text}>
          <strong>NeuroWell</strong> is your AI-powered mental wellness platform crafted specifically for students.
          It bridges the gap between emotional needs and mental health resources by blending advanced AI chatbots
          with professional counseling support — making help accessible 24/7.
        </p>

        <div style={styles.boxContainer}>
          <div style={styles.box}>
            <h3 style={styles.subHeading}>🎓 For Students</h3>
            <p style={styles.boxText}>
              • Talk to an AI anytime — judgment-free and always available.<br />
              • Switch to a human counselor with one click.<br />
              • Journaling and mood tracking to monitor emotional patterns.<br />
              • Instant support for stress, anxiety, academic burnout, and more.
            </p>
          </div>

          <div style={styles.box}>
            <h3 style={styles.subHeading}>🧑‍⚕️ For Counselors</h3>
            <p style={styles.boxText}>
              • Real-time dashboard showing active students and chat histories.<br />
              • Ability to intervene in critical situations detected by the AI.<br />
              • PDF summaries for sessions and emotion-based insights.<br />
              • A secure platform that keeps student data confidential and protected.
            </p>
          </div>
        </div>

        <p style={styles.text}>
          NeuroWell is built with compassion, confidentiality, and accessibility at its core. Whether you're a student seeking support or
          a counselor aiming to make a difference — NeuroWell is your partner in emotional wellness.
        </p>
      </section>
    </div>
  );
};

const styles = {
  pageWrapper: {
    background: 'linear-gradient(to bottom, rgb(11, 118, 195), #ffffff)',
    minHeight: '100vh',
  },
  container: {
    padding: '60px 20px',
    textAlign: 'center',
    fontFamily: "'Poppins', sans-serif",
    color: '#333',
  },
  heading: {
    fontSize: '2.8rem',
    color: '#ffffff',
    marginBottom: '30px',
    textShadow: '1px 1px 4px rgba(0,0,0,0.3)'
  },
  text: {
    fontSize: '1.1rem',
    maxWidth: '850px',
    margin: 'auto',
    color: 'purple',
    marginBottom: '30px',
    lineHeight: '1.8'
  },
  boxContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '30px',
    marginBottom: '40px',
  },
  box: {
    background: 'white',
    padding: '30px',
    borderRadius: '12px',
    width: '300px',
    textAlign: 'left',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
  },
  subHeading: {
    fontSize: '1.4rem',
    color: '#0d47a1',
    marginBottom: '10px'
  },
  boxText: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#333'
  }
};

export default About;
