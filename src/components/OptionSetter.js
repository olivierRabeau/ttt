import React from 'react'

const OptionSetter = () => {
  return (
    <div>
      <form>
        <h2>qui débute la partie ?</h2>
          <input type="radio" name="firstToPlay" id="computer" value="computer"/> 
          <label for="computer">Ordinateur</label>
          <br/>
          <input type="radio" name="firstToPlay" id="player" value="player" checked/>
          <label for="player">Joueur</label>
      </form>
        
        
    </div>
  )
}

export default OptionSetter