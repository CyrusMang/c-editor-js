import React, { useState, useCallback, useEffect, useRef } from 'react'
import Toolbar from './Toolbar'

const Cell = ({ x, y, selected, setSelected, highlighted, change, data }) => {
  if (state.selected) {
    const _x = selected.x === 'all' || x === selected.x
    const _y = selected.y === 'all' || y === selected.y
    
    if (_x && _y) {
      return (
        <div><input value={data}></div>
      )
    }
  }
  return (
    <div>{data}</div>
  )
}

const TableEdit = ({ controller, i, data }) => {
  const [selectedCell, setSelectedCell] = useState(null)
  const [selectedBulk, setSelectedBulk] = useState(null)
  
  const change = (x, y, c) => {
    controller.change(data, i, {
      type: data[i].type,
      data: [],
    })
  }
  
  return (
    <div>
      {data[i].map((row, x) => {
        return row.map(cell, y) => {
          return (
            <Call x={x} y={y} selected={setSelected} change={}>
          )
        }
      })}
    </div>
  )
}

const TableBlockComponent = ({ controller, focusing, i, data }) => {
  if (focusing !== i) {
    return (
      <table>
        <>
      </table>
    )
  }
  return (
    <TableEdit ...{controller, i, data} />
  )
}

export default TableBlockComponent