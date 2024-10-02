import React from "react";
import Carousel from "react-bootstrap/Carousel";
import std1 from "../img/std1.jpg";
import std2 from "../img/std2.jpg";
import std3 from "../img/std3.jpg";
import "../css/Home.css";
function Home() {
  return (
    <div>
      <Carousel fade style={{ height: "100dvh" }}>
        <Carousel.Item style={{height:'90dvh'}}>
          <img className="d-block w-100 " src={std1} alt="First slide" style={{height:'90dvh'}}/>
          <Carousel.Caption style={{backgroundColor:'rgba(240, 240, 240, 0.500)', color:'black', borderRadius:'10px', margin:'20px'}}>
            <h3>Empowering Student Engagement</h3>
            <p>
              Enhance collaboration and communication among students for a
              thriving educational environment.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{height:'90dvh'}}>
          <img className="d-block w-100" src={std2} alt="Second slide" style={{height:'90dvh'}}/>
          <Carousel.Caption style={{backgroundColor:'rgba(240, 240, 240, 0.500)', color:'black', borderRadius:'10px',margin:'20px'}}>
            <h3>Track Student Performance</h3>
            <p>
              Monitor academic progress and provide personalized support to help
              every student succeed.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{height:'90dvh'}}>
          <img className="d-block w-100" src={std3} alt="Third slide" style={{height:'90dvh'}}/>
          <Carousel.Caption style={{backgroundColor:'rgba(240, 240, 240, 0.500)', color:'black', borderRadius:'10px',margin:'20px'}}>
            <h3>Access Essential Resources</h3>
            <p>
              Facilitate access to learning materials and resources to support
              student growth and achievement.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Home;
