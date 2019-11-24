import React, { useState, useEffect } from 'react'
import HelloWorld from './components/HelloWorld'
import axios from 'axios'
import Square from './components/Square'

const App = () => {
  const [gameID, setGameID] = useState('')
  const [board, setBoard] = useState([])
  const [state, setState] = useState()

  const newGameData = async () => {
    const resp = await axios.post('https://minesweeper-api.herokuapp.com/games')
    console.log(resp.data)
    setBoard(resp.data.board)
    setGameID(resp.data.id)
  }

  useEffect(() => {
    newGameData()
  }, [])

  const sendCheck = async (x, y) => {
    const resp = await axios.post(
      'https://minesweeper-api.herokuapp.com/games/' + gameID + '/check',
      { row: x, col: y }
    )
    console.log(resp.data)
    setBoard(resp.data.board)
    if (resp.data.state === 'won') {
      setState('You Win!')
    } else if (resp.data.state === 'lost') {
      setState('You Lose...')
    }
  }

  const sendFlag = async (x, y) => {
    const resp = await axios.post(
      'https://minesweeper-api.herokuapp.com/games/' + gameID + '/flag',
      { row: x, col: y }
    )
    console.log(resp.data.board)
    setBoard(resp.data.board)
  }

  return (
    <>
      <h1>Minesweeper</h1>
      <table border="1">
        <tbody>
          {board.map((row, x) => {
            return (
              <tr>
                {row.map((col, y) => {
                  return (
                    <Square
                      leftClick={() => sendCheck(x, y)}
                      rightClick={() => sendFlag(x, y)}
                      checked={col}
                      display={
                        col === '@'
                          ? (col = <i class="fas fa-bomb"></i>)
                          : col === 'F'
                          ? (col = <i class="fas fa-flag-checkered"></i>)
                          : col === '_'
                          ? (col = 'X')
                          : col === '*'
                          ? (col = '🤯')
                          : board[x][y]
                      }
                    />
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <section>
        <p className="game-state">{state}</p>
      </section>
    </>
  )
}

export default App
