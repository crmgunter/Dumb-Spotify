import React, { Component } from 'react';
import styled from 'styled-components'

const HeaderStyle = styled.div`
height: 100px;
width: 100vw;
display: flex;
border-bottom: 1px solid seashell;
margin-bottom: 0;
background: #22252C;
color: seashell;
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