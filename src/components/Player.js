import React, { useEffect, useState } from 'react'
import styled from "styled-components/macro"

const Player = ({picturePath,logoPath,winGames,winGame}) => {
const [current,setCurrent] =useState({
  pointsOnFive:0
})

useEffect(()=>{
  setCurrent({pointsOnFive:winGames})
},[winGames]);

  return (
    <Card>
     
        <StyledHeader >
            <WinPoint src={current.pointsOnFive>0?logoPath:null}></WinPoint>
            <WinPoint src={current.pointsOnFive>1?logoPath:null}></WinPoint>
            <WinPoint src={current.pointsOnFive>2?logoPath:null}></WinPoint>
            <WinPoint src={current.pointsOnFive>3?logoPath:null}></WinPoint>
            <WinPoint src={current.pointsOnFive>4?logoPath:null}></WinPoint>
        </StyledHeader>
        <StyledContent>
        <Picture src={picturePath} id ="Tom"></Picture>
        </StyledContent>
        <StyledFooter>
          <h2 style={{visibility:winGame?"visible":"hidden"}}>"Win the game"</h2>
        </StyledFooter>
    </Card>
  )
}

const Card = styled('div')`

border-radius:1rem;
display:flex;
flex-direction:column;
align-items:center;
@media screen and (max-width:1220px) {
  flex-direction:row;
  border-bottom:1px solid grey;
  margin:1rem;
}
`

const StyledHeader=styled('div')`
display:flex;
flex-direction:row;
justify-content:center;
@media screen and (max-width:1220px) {
  order:2;
}
`
const StyledContent = styled('div')`
display:flex;
flex-direction:row;
justify-content:center;
@media screen and (max-width:1220px) {
  order:1;
}
`
const StyledFooter = styled('div')`
display:flex;
flex-direction:row;
justify-content:center;
@media screen and (max-width:1220px) {
  order:2;
}
`

const Picture=styled('img') `
height:20rem;
@media screen and (max-width:1220px) {
  height:5rem;
}
`
const WinPoint=styled('img')`
height:2.5rem;
width:2.5rem;
margin:0.5rem;
border:1px solid white;
border-radius:0.5rem;
@media screen and (max-width:1220px) {
  height:2rem;
  width:2rem;
  margin:0.25rem;
}
`
const StyledButton = styled('button')`
`

export default Player