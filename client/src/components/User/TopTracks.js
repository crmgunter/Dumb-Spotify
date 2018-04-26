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

const UserInfo = styled.div`
  margin: 20px;
  max-width: 300px;
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
                        <ArtistContainer className="animated fadeInLeftBig">
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