import { useState } from "react"

export default function Player({name,symbol,isActive}){
    const [playerName,setPlayerName]=useState(name)
    const[isEditing,setisEditing]=useState(false)
    let editablePlayerName = <span className="player-name">{playerName}</span>
    if(isEditing){
        editablePlayerName=<input type="text" required value={playerName} onChange={(e)=>{setPlayerName(e.target.value)}}></input>
    }

   
    return(
    
    <li className={isActive?'active':undefined}>
        <span className="player">
          {editablePlayerName }
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={()=>setisEditing(editing=>!editing)}>{isEditing?'Save':'Edit'}</button>
      </li>
      )
}