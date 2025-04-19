import Carousel1 from "../../components/Carousel/Carousel1";
import Carousel from "../../components/Carousel/Carousel1";
import Carousel2 from "../../components/Carousel/Carousel2";
import Carousel3 from "../../components/Carousel/Carousel3";
import Footer from "../../components/Footer/Footer";
import Journal from "../../components/Journal/Journal";
import MindfulGames from "../../components/MindfulGames/MindfulGames";
import Navbar from "../../components/Navbar/Navbar";
import ParticlesBackground from "../../components/ParticlesBackground";
import ParticlesBackground1 from "../../components/ParticlesBackground1";
import StudentChatbot from "../../components/StudentChatbot/StudentChatbot";
import Top from "../../components/top/Top";
import YouTubePlayer from "../../components/YouTubePlayer/YouTubePlayer";
import "./StudentPage.css"
// src/pages/StudentPage.jsx
const StudentPage = () => {
  return (
    <div>
      <Top/>
      <div className="youtube">
        {/* <ParticlesBackground1/> */}
      <YouTubePlayer/>
      </div>
      
      <h1 style={{ textAlign: "center" ,backgroundColor:"#f3e5f5",margin:0 ,padding:5}}>Together for Mental Wellness</h1>
      <div className="carousel" style={{display:"flex",backgroundColor:"#f3e5f5"}}>
        <Carousel1/>
        <Carousel2/>
        <Carousel3/>
      </div>
      <div
  className="mindful"
  style={{
    background: "linear-gradient(to bottom, #f0f4ff, #e3f2fd)",
    margin: 0,
    padding: "40px 20px", // optional for spacing
      // optional full height
  }}
>
      <MindfulGames/>
      </div>

      <div
  className="journal"
  style={{
    background: "linear-gradient(to bottom, #f0f4ff, #e3f2fd)",
    padding: "20px",
    zIndex:1000
  }}
>
  <Journal />
</div>

<div className="footer" style={{margin:0}}>
<Footer/>
</div>
      
      <StudentChatbot />
    </div>
  );
};

export default StudentPage;
