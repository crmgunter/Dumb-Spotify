import React, { Component } from "react";
import styled from "styled-components";
import ScrollAnimation from "react-animate-on-scroll";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faCoffee from "@fortawesome/fontawesome-free-solid/faCoffee";
import faArrowCircleDown from "@fortawesome/fontawesome-free-solid/faArrowCircleDown";
const LandingImage = styled.div`
  background-image: url("https://images.unsplash.com/photo-1522791194246-7129e9750305?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=55c772c62c24b498d3a2202f9b06435c&auto=format&fit=crop&w=800&q=60");
  height: 100vh;
  width: 100vw;
  background-size: cover;
`;

const LetsSee = styled.div`
  background: rgba(0, 0, 0, 0.6);
  height: 100vh;
  width: 100vw;
  display: flex;

  .upFade {
    animation-duration: 2s;
  }
`;

const ButtonCenter = styled.div`
  margin: auto;
  text-align: center;
  background: rgba(34, 37, 44, 0.5);
  min-height: 30vh;
  width: 50vw;
  padding: 20px;
  border-radius: 5px;

  .iconStyle {
    height: 50px;
    width: 50px;
    margin: 10px;
    cursor: pointer;
  }
`;

const ButtonStyle = styled.button`
  padding: 20px;
  background: none;
  color: #e14658;
  font-size: 13px;
  border-radius: 5px;
  border: #e14658 solid 1px;

  :hover {
    background: #e14658;
    color: seashell;
    border: 1px solid seashell;
    cursor: pointer;
  }
`;

const PageContent = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ImageLeft = styled.div`
  background-image: url("https://images.unsplash.com/photo-1514471157964-06459a4b9241?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e049b4af8dbdf11a11434502f84dbbc2&auto=format&fit=crop&w=800&q=60");
  height: 100vh;
  width: 50vw;
  background-position: center;
  background-size: cover;
`;

const ContentBlocks = styled.div`
  height: 75vh;
  width: 40vw;
  background: #e14658;
  margin: auto;
`;

class LandingPage extends Component {
  scrollDown = () => {
    window.scroll({
      top: 1000,
      behavior: "smooth"
    });
    const animate = document.getElementsByClassName("revealOnScroll");
    console.log(animate);
  };

  render() {
    return (
      <div className="animated fadeInLeftBig">
        <LandingImage>
          <LetsSee>
            <ButtonCenter className="upFade animated fadeInUpBig">
              <div>
                <h1>Welcome to Dumb Spotify</h1>
                <p>
                  Dumb Spotify helps you track your favorite artists and when
                  they're coming to town.
                </p>
              </div>
              <ButtonStyle
                onClick={() => {
                  window.location = window.location.href.includes("localhost")
                    ? "http://localhost:8888/login"
                    : "https://cg-final-backend.herokuapp.com/login";
                }}
              >
                Login with Spotify
              </ButtonStyle>
              <div>
                <FontAwesomeIcon
                  icon={faArrowCircleDown}
                  class="iconStyle"
                  onClick={this.scrollDown}
                />
              </div>
            </ButtonCenter>
          </LetsSee>
        </LandingImage>
        <ScrollAnimation animateIn="fadeInLeftBig">
          <PageContent>
            <ImageLeft />
            <ContentBlocks className="animated fadeInUpBig">
              <div>Hi!</div>
            </ContentBlocks>
          </PageContent>
        </ScrollAnimation>
      </div>
    );
  }
}

export default LandingPage;
