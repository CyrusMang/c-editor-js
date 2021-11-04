import React, { useState, useCallback, useEffect, useRef } from 'react'
import Toolbar from './Toolbar'

const Cell = ({ x, y, selected, hightlight, change, data }) => {
  return (
    <div>{selected ? (<input value={data}>) : data}</div>
  )
}

const TableEdit = ({ controller, i, data }) => {
  const [selectedCell, setSelectedCell] = useState({})
  const [selectedBulk, setSelectedBulk] = useState({})
  
  const change = (x, y, c) => {
    controller.change(data, i, {
      type: data[i].type,
      data: [],
    })
  }
  
  const rows = data.length, columns = data[0].length
  return (
    <div>
      <div className='row-selector'>
        {new Array(rows).fill(0).map((r, x) => (
          <div key={`table-${i}-handle-x-${x}`}>
            <a href='#'>{'h'}</a>
          </div>
        ))}
      <div>
      <div>
        <div className='columns-selector'>
          {new Array(columns).fill(0).map((c, y) => (
            <div key={`table-${i}-handle-y-${y}`>
              <a href='#'>{'...'}</a>
            </div>
          ))}
        <div>
        <div className='body'>
          {data[i].map((row, x) => {
            return (
              <div key={`table-${i}-row-${x}`}>
                {row.map((cell, y) => {
                  const selected = x === selectedCell.x && y === selectedCell.y
                  const properties = {
                    x, y, selected, 
                    hightlight: x === selectedBulk.x || y === selectedBulk.y, 
                  }
                  return (
                    <div key={`table-${i}-cell-${x}-${y}`} onClick={() => setSelectedCell({x, y})}>
                      <Call ...properties />
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
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