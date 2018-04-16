import React, { Component } from 'react';
import styled from 'styled-components'

const HeaderStyle = styled.div`
height: 100px;
width: 100vw;
display: flex;
`

const Center = styled.div`
margin: auto;
`

class Header extends Component {
    render() {
        return (
            <HeaderStyle>
                <Center>
                    <h1>header</h1>
                    </Center>
                
            </HeaderStyle>
        );
    }
}

export default Header;