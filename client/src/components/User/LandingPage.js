import React, { Component } from 'react';

class LandingPage extends Component {
    render() {
        return (
            <div>
                <button
          onClick={() => {
            window.location = window.location.href.includes("localhost")
              ? "http://localhost:8888/login"
              : "https://cg-final-backend.herokuapp.com/login";
          }}
        >
          Login with Spotify
        </button> 
            </div>
        );
    }
}

export default LandingPage;