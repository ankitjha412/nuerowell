import React from 'react'
import "./Top.css"
import ParticlesBackground from '../ParticlesBackground'
import Navbar from '../Navbar/Navbar'
import About from '../About/About'
import Contact from '../Contact/Contact'
const Top = () => {
  return (
    <div className="header-container">
 

  <div className="header">
    <div className="main">
    <div className="nav" style={{width:"100%",position:"relative", bottom:"187px",zIndex:1000}}>
        <Navbar/>
    </div>
 <div className="tag">
 <h1>Welcome to Mental Health AI-Chatbot (Nuerowell)</h1>
 <p>Your AI-powered mental wellness assistant.</p>
 </div>
 
    </div>
    
  
  </div>
  

  {/* <img 
    src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTlzcnpsZ3k1YnE0MHo0aWdqcXN1YXgxbWprdDJuYWQ3aW5ubWJhdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CytKuRG1UCciXh9SDx/giphy.gif" 
    alt="AI Robot" 
    className="ai-robot-right"
  /> */}
</div>
  )
}

export default Top
