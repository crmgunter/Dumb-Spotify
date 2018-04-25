import React, { Component } from "react";
import styled from "styled-components";

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
  height: 30vh;
  width: 50vw;
  padding: 20px;
  border-radius: 5px;
`;

const ButtonStyle = styled.button`
  padding: 20px;
  background: none;
  color: seashell;
  font-size: 13px;
  border-radius: 5px;

  :hover {
    background: blue;
  }
`;

const PageContent = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`;

const ContentContainer = styled.div`
display:flex;
flex-wrap: wrap;
`

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
    const animate = document.getElementsByClassName('revealOnScroll');
    console.log(animate)
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
              <button onClick={this.scrollDown}>Down</button>
            </ButtonCenter>
          </LetsSee>
        </LandingImage>
        <PageContent>
          <ContentBlocks
            className="revealOnScroll"
            data-animation="fadeInLeftBig"
          >
            <div>OH hey</div>
          </ContentBlocks>
          <ContentBlocks>
            <div>Hi!</div>
          </ContentBlocks>
        </PageContent>
      </div>
    );
  }
}

export default LandingPage;
