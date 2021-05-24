import React from 'react';
import styled from 'styled-components';
function Header() {
    return (
        <CustomHeader>
            <CustomLogo src="/images/logo.png"/>
            <h4>Covid-19 Tracker App By M.Awais</h4>
        </CustomHeader>
    )
}

const CustomLogo = styled.img`
    height:90px;

`


const CustomHeader = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    h4{
        font-weight:100;
        font-size:25px;
        font-family:'Verdana'
    }
    padding-bottom:30px;

`

export default Header;
