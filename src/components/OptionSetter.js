import React,{useState,useContext, useEffect} from 'react';
import players,{theme} from "../styles/themes";
import styled from "styled-components/macro";
import devices from '../styles/mediaQueries';
import { userPreferences } from '../App';


const OptionSetter = () => {
  const {userSettings,setUserSettings} = useContext(userPreferences);

  const themes=[];
  for (let th in theme){
    themes.push(th);
  }
  const computerSkills = ["expert","intermediate","beginner"];
  const firstPlayer=["player","computer","random"];
  const [current, setCurrent] = useState({
    start:0,
    cptrSkills:2,
    theming:'avengers',
    avatar:0,
    computer:1
  })

const handleAvatar =(evt)=>setUserSettings({...userSettings,avatar:parseInt(evt.target.id), computer:parseInt(evt.target.id)===0?1:0});
const handleThm =(evt)=>setUserSettings({...userSettings,theming:evt.target.value});
const handleCptrSkills =(evt)=>setUserSettings({...userSettings,cptrSkills:parseInt(evt.target.value)});
const handleFirst =(evt)=>setUserSettings({...userSettings,start:parseInt(evt.target.value)});

useEffect(()=>{
  setCurrent({...userSettings});
},[]);

  return (
    <div>
      <Parameters>
      
      <WhoPlayFirst>
        <h3>First</h3>
        <select name="first" onChange={handleFirst}>
        {firstPlayer.map((value,idx)=><option value={idx} key={idx} id={idx} selected={idx===userSettings.start?true:false}>{value}</option>)} 
        </select>
      </WhoPlayFirst>
      
      <ComputerBehaviour>
      <h3>Computer </h3>
        <select name="cptrSkills" defaultvalue={1} onChange={handleCptrSkills}>
          {computerSkills.map((value,idx)=><option value={idx} key={idx} id={idx} selected={idx===userSettings.cptrSkills?true:false}>{value}</option>)}     
        </select>   
      </ComputerBehaviour>
      
      <Theme>    
        <h3>Theme</h3>
        <select name="thm" onChange={handleThm}>
          {themes.map((value,idx)=><option value={value} key={idx} id={idx} selected={value===userSettings.theming?true:false}>{value}</option>)}        
        </select> 
      </Theme>

      <Avatars>
       
          <button type="button"  id={0} onClick={handleAvatar}>
              <Picture src={players(userSettings.theming)[0].picture??null} id ={0}/>
              <div style={{visibility : userSettings.avatar===0?"visible":"hidden"}} ></div>
          </button>
      
       
        <button type="button" id={1} onClick={handleAvatar}>
            <Picture src={players(userSettings.theming)[1].picture??null} id ={1}/>
            <div style={{visibility : userSettings.avatar===1?"visible":"hidden"}} ></div>
        </button>
   
      </Avatars>
      
      </Parameters>
        
        
    </div>
  )
}

export default OptionSetter

//--------------------------------CSS IN JS------------------------------

const Picture=styled('img') `
  border:none;
  margin:0;
  width:7rem;
  border-radius:10rem;
  :hover{
    box-shadow:0 0 10px grey;
  }
  ${devices.tablet} {
    width:8rem;
  }
`

const Parameters=styled('div')`

display:grid;
grid-template-rows:repeat(3,1fr) auto;
justify-items:center;
justify-content:center;
align-items:center;
grid-auto-flow:column;
margin:auto;
display:block;
width:16.8rem;
padding:1rem;
${devices.tablet} {
  width:22rem;
}
${devices.desktop} {  
  width:30rem;
}
`

const Row=styled('div')`
display:flex;
flex-direction:row;
justify-content:space-between;
align-items:center;
height:4rem;
gap:1rem;

font-size:1.2rem;
select{
  font-size:1.2rem;
  border-radius:0.5rem;
  width:50%;

}
h3{
color:yellow;
}
`
const Theme =styled(Row)``
const ComputerBehaviour =styled(Row)``
const WhoPlayFirst =styled(Row)``
const Avatars=styled(Row)`
margin-top:1rem;
button{

  padding:0;
  background-color:black;
  border:none;
  height:auto;
  width:auto;
  margin-top:2rem;
}
div{
width:4rem;
border-bottom:3px solid yellow;
margin:auto;
margin-top:0.5rem;
}
`