import React from 'react';
import styled from "styled-components/macro";
import devices from '../styles/mediaQueries';

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

//--------------------------------CSS IN JS------------------------------

const Title =styled('h2')`
  color:yellow;
`
const Content = styled('form')`
position:absolute;
top:0;
width:16.8rem;
height:16.8rem;
border-radius:1rem;
background:black;
${devices.tablet} {
  width:23rem;
  height:23rem;
  background-color:red;
}
${devices.desktop} {
  width:30rem;
  height:30rem;
}
`
