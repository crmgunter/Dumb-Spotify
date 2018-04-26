import React, { Component } from 'react';
import styled from 'styled-components'

const HeaderStyle = styled.div`
height: 100px;
width: 100vw;
display: flex;
margin-bottom: 0;
background: #e14658;
color: seashell;
box-shadow: 0px 10px 10px rgba(0,0,0,0.5);
`

const Center = styled.div`
margin: auto;
`

class Header extends Component {
    render() {
        return (
            <HeaderStyle>
                <Center>
                    <h1>Dumb Spotify</h1>
                    </Center>
                
            </HeaderStyle>
        );
    }
}

export default Header;