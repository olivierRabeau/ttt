import React, { useEffect, useState } from 'react'
import styled from "styled-components/macro";
import { keyframes } from 'styled-components';

const Title = () => {
    const [current,setCurrent]=useState({
        start:0
      });
      
  return (
    <StyledDiv start={current.start} end={current.start+10}>
        TIC TAC TOE
    </StyledDiv >
  )
}

export default Title
const blade = keyframes`
 0% { background-position: 0 0; } 
 20% { background-position: 33rem 0; }  
 100% { background-position: 33rem 0; } 
`
const littleblade = keyframes`
 0% { background-position: 0 0; } 
 20% { background-position: 16rem 0; }  
 100% { background-position: 16rem 0; } 
`
const StyledDiv = styled('span')`
font-size:5rem;
width:33rem;
display:flex;
flex-direction:row;
justify-content:center;
background-color: blue;
animation:${blade} 10s linear infinite normal; 
@media screen and (max-width:1220px) {
  font-size:2.5rem;
  width:16rem;
  animation:${littleblade} 10s linear infinite normal; 
}
font-weight:bold;
background: linear-gradient(90deg,blue 0%,white 0%,white 5%,blue 5%); 
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
`
