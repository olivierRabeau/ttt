import React, { useEffect, useState } from 'react'
import styled from "styled-components/macro";

const Title = () => {
    const [current,setCurrent]=useState({
        start:0
      });
      
      useEffect(()=>{       
         if (current.start<100){
            const timer = setTimeout(()=>setCurrent({start:current.start+1}),5);
            return ()=>clearTimeout(timer);
         } 
         const reload = setTimeout(()=>setCurrent({start:0}),10000);
         return ()=>clearTimeout(reload);
      },[current]);


  return (
    <StyledDiv start={current.start} end={current.start+10}>
        TIC TAC TOE
    </StyledDiv >
  )
}

export default Title


const StyledDiv = styled('span')`
font-size:5rem;
margin:2rem;
@media screen and (max-width:1220px) {
  font-size:2.5rem;
}
font-weight:bold;
background: linear-gradient(60deg, blue ${props=>props['start']}%, white ${props=>props['start']}%, white ${props=>props['end']}%, blue ${props=>props['end']}%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
`

