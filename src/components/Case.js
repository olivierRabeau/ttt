import React, { useEffect, useState } from 'react'
import styled from "styled-components/macro"

//Affichage élémentaire

const Case = ({idVal, availability, imgFile,handleClick}) => { 

const [current, setCurrent] = useState(
  {
    id:null,
    available:true,
    color:'black'
  }
);

useEffect (()=>{
 setCurrent ({    
    id:idVal,
    available:availability,
    image:imgFile
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
export default Case