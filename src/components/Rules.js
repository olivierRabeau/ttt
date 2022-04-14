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
padding:1rem;

`
