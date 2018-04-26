import React, { Component } from 'react';
import styled from 'styled-components'

const FooterStyle = styled.div`
height: 100px;
width: 100vw;
display: flex;
background: #e14658;
color: seashell;
`

const Center = styled.div`
margin: auto;
`

class Footer extends Component {
    render() {
        return (
            <FooterStyle>
                <Center>
                    <div>
                        <a href="https://github.com/crmgunter/final-project-express"><h3>See the code!</h3></a>
                    </div>
                    </Center>
            </FooterStyle>
        );
    }
}

export default Footer;