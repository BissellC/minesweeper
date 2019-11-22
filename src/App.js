import React, { useState, useEffect } from 'react'
import HelloWorld from './components/HelloWorld'
import axios from 'axios'

const App = () => {
  const [gameID, setGameID] = useState('')
  const [board, setBoard] = useState([])

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
    console.log(resp.data.board)
    setBoard(resp.data.board)
  }

  return (
    <>
      <table border="1" width="400" height="400">
        <tbody>
          {board.map((row, x) => {
            return (
              <tr>
                {row.map((col, y) => {
                  return <td onClick={() => sendCheck(x, y)}>{board[x][y]}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default App
