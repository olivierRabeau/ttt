import React, { useEffect, useState } from 'react'
import styled from "styled-components/macro"

//Affichage élémentaire

const Case = ({idVal, availability, imgFile,handleClick}) => { 

const [current, setCurrent] = useState(
  {
    id:null,
    available:true,
    image:null
  }
);

useEffect (()=>{
 setCurrent ({    
    id:idVal,
    available:availability,
    image:"./resources/cross.png"
  })
},[idVal,availability,imgFile])

 return (
    <StyledImg 
    id={current.id} 
    style={{backgroundColor:"black", zIndex:"5"}} 
    onClick={current.available?handleClick:null} 
    src={imgFile}>
    </StyledImg>
  )
}

export default Case

//--------------------------------CSS IN JS------------------------------

const StyledImg = styled('img')`
border : 1px solid grey;
border-radius:1rem;


  width:9rem;
  height:9rem;
  margin:0.5rem;

  :hover{
    transform:scale(105%);
    box-shadow:0 0 10px white;    
  }

  @media screen and (max-width:1220px) {
    width:7rem;
    height:7rem;
    margin:0.2rem;
  }
`