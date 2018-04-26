import React, { Component } from 'react';
import styled from 'styled-components'

const ArtistImage = styled.img`
  height: 200px;
  width: 200px;
`;

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 20px;
`;

const TopContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;

  .fadeInDownBig {
    animation-duration: 2s;
  }
`;

const UserInfo = styled.div`
  margin: 20px;
  max-width: 300px;
`;

const ButtonFlex = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonStyle = styled.button`
  min-width: 100px;
  margin: 10px;
  padding: 15px;
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

const ArtistContainer = styled.div`
  border: 1px solid #e14658;
  margin: 10px 5px;
  padding: 20px;
  border-radius: 5px;
  max-width: 220px;
  min-width: 220px;
`;

class TopTracks extends Component {
    state = {
        topTracks: {
            items: [{
                name: ''
            }]
        }
    }
    render() {
        return (
            <div>
                <Flex>
                {this.props.topTracks.items.map((track) => (
                        <ArtistContainer className="fromRight animated fadeInRightBig">
                        <ArtistImage src={track.album.images[0].url} />
                    <div>{track.name}</div>
                    <div>{track.artists[0].name}</div>
                    <div>{track.album.name}</div>
                    </ArtistContainer>
                    
                ))}
                </Flex>
            </div>
        );
    }
}

export default TopTracks;