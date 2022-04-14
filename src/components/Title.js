import React from 'react'
import styled from "styled-components/macro";
import { keyframes } from 'styled-components';
import devices from "../styles/mediaQueries"

const Title = () => {

      
  return (
    <div>
      
    <StyledDiv>
      
      TIC TAC TOE
  </StyledDiv >
    </div>
      
  )
}

export default Title

//--------------------------------CSS IN JS------------------------------
const Logo = styled('img')`
position:absolute; 
top:0; 
left:0; 
height:40px; 
width:40px; 
margin:0.5rem;
border:1px solid white;
border-radius:0.5rem; 
box-shadow:0 0 10px white;
:hover{
  transform:scale(130%);
}
`
const mobileBlade = keyframes`
 0% { background-position: 0 0; } 
 20% { background-position: 33rem 0; }  
 100% { background-position: 33rem 0; } 
`
const mobileLargeblade = keyframes`
 0% { background-position: 0 0; } 
 20% { background-position: 16rem 0; }  
 100% { background-position: 16rem 0; } 
`
const StyledDiv = styled('span')`
font-size:2.5rem;
width:16rem;
animation:${mobileLargeblade} 10s linear infinite normal; 
display:flex;
flex-direction:row;
justify-content:center;
background-color: blue;
font-weight:bold;
background: linear-gradient(90deg,blue 0%,white 0%,white 5%,blue 5%); 
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
${devices.laptop} {
  font-size:5rem;
  width:33rem;
  animation:${mobileBlade} 10s linear infinite normal; 
}
`
