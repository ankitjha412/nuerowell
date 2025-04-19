import React from 'react';

const YouTubePlayer = ({ title = "We All Have Mental Health" }) => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.textContainer}>
        <h2 style={styles.heading}>Understanding Mental Health</h2>
        <p style={styles.subheading}>
          A short film about mental wellbeing by the Anna Freud National Centre for Children and Families
        </p>
      </div>

      <div style={styles.glassFrame}>
        <iframe
          src="https://www.youtube.com/embed/DxIDKZHW3-E"
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={styles.iframe}
        ></iframe>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '60px 20px',
    background: 'linear-gradient(135deg, #dbeafe, #f0f9ff)',
    fontFamily: 'Poppins, sans-serif',
    textAlign: 'center'
  },
  textContainer: {
    marginBottom: '30px',
    maxWidth: '700px'
  },
  heading: {
    fontSize: '2rem',
    color: '#1e3a8a',
    marginBottom: '10px',
    fontWeight: 700
  },
  subheading: {
    fontSize: '1rem',
    color: '#444',
    fontWeight: 400,
    lineHeight: 1.5
  },
  glassFrame: {
    position: 'relative',
    width: '100%',
    maxWidth: '900px',
    aspectRatio: '16 / 9',
    overflow: 'hidden',
    borderRadius: '20px',
    backdropFilter: 'blur(12px)',
    background: 'rgba(255, 255, 255, 0.15)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  },
  iframe: {
    position: 'absolute',
    top: 0,
    left: 0,
    border: 'none',
    width: '100%',
    height: '100%',
    borderRadius: '20px'
  }
};

export default YouTubePlayer;
