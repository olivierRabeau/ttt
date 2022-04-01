import React from 'react';
import styled from "styled-components/macro";

const Rules = () => {
  return (
    <Content>
        <h1>Règles du jeu</h1>
        <p>Aligner trois de vos marques sur une colonne, une ligne, ou bien une diagonale permet de gagner une partie.
        <br/> 
        <br/> 
        Pour l'emporter il faut être le premier à cumuler cinq victoires.
        </p>
    </Content>
  )
}

export default Rules;

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
