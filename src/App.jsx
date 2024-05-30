import { useState } from "react"
import Gameboard from "./components/Gameboard"
import Player from "./components/Player"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./winning-combinations"
import GameOver from "./components/GameOver"

const board = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
]

function deriveActivePlayer(gameTurns){
  let currentPlayer ='X';
      if(gameTurns.length>0 && gameTurns[0].player==='X')
      {
        currentPlayer='O'
      }
  return currentPlayer;
}

function App() {
  const[gameTurns,setGameTurns]=useState([])
  const currentActivePlayer = deriveActivePlayer(gameTurns)
 
  let gameboard = [...board.map(array=>[...array])]
    for(const turn of gameTurns){
        const{square,player}=turn;
        const{row,col}=square
        gameboard[row][col]=player;
    }
    let winner=null;
    const hasDraw=gameTurns.length===9 && !winner
    for (const combination of WINNING_COMBINATIONS)
    {
      const firstSymbol = gameboard[combination[0].row][combination[0].column];
      const secondSymbol = gameboard[combination[1].row][combination[1].column];
      const thirdSymbol = gameboard[combination[2].row][combination[2].column]

      if(firstSymbol && firstSymbol===secondSymbol && firstSymbol===thirdSymbol)
      {
        winner=firstSymbol
      }
    }
    function onSelectSquare(rowIndex,colIndex){
      setGameTurns((prevTurns)=>{
        const currentPlayer=deriveActivePlayer(prevTurns)
        const updatedTurns =[{square:{row:rowIndex,col:colIndex},player:currentPlayer},
          ...prevTurns,
        ];
        return updatedTurns;
      })
    }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
        <Player name={'Player 1'} symbol={'X'} isActive={currentActivePlayer==='X'}/>
        <Player name={'Player 2'} symbol={'O'} isActive={currentActivePlayer === 'O'}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} setGameTurns={setGameTurns}/>}
        <Gameboard onSelectSquare={onSelectSquare} board={gameboard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
