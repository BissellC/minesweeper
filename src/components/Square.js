import React, { Component } from 'react'

const Square = props => {
  return (
    <td
      onClick={props.leftClick}
      onContextMenu={event => {
        event.preventDefault()
        props.rightClick()
      }}
    >
      {props.display}
    </td>
  )
}

export default Square
