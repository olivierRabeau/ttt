import React from 'react';
import styled from "styled-components/macro";

const Rules = () => {
  return (
    <Content>
        <Title>Rules of the game</Title>
        <p>Aligning three of your marks on a column, a row, or a diagonal allows you to be victorious.
        <br/> 
        <br/> 
        To win you have to be the first to accumulate five victories.
        </p>
    </Content>
  )
}

export default Rules;

const Title =styled('h1')`
  color:yellow;
`

const Content = styled('form')`
position:absolute;
top:0;
width:30rem;
height:30rem;
border-radius:1rem;
background:black;
@media screen and (max-width:1220px) {
  width:22.4rem;
  height:22.4rem; 
}
`
