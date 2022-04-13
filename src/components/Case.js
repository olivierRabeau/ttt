import React, { useEffect, useState } from 'react'
import styled from "styled-components/macro"


//Affichage élémentaire

const Case = ({idVal, availability, imgFile,handleClick,handleMouseEnter,handleMouseLeave,...props}) => { 

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
    image:""
  })
},[idVal,availability,imgFile])

 return (
    <StyledImg 
    id={current.id} 
    style={{backgroundColor:props.bgdC, boxShadow:props.shadow}} 
    onClick={current.available?handleClick:null} 
    src={imgFile}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    >
    </StyledImg>
  )
}

export default Case

//--------------------------------CSS IN JS------------------------------

const StyledImg = styled('img')`

`