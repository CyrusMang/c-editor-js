import React, { useState, useCallback, useEffect, useRef } from 'react'
import { ToolBarContainer } from './Toolbar'

const initData = {
  state: {
    row: 3,
    column: 2,
  },
  cells: {},
}

const TableEdit = ({ controller, i, data }) => {
  const [selected, setSelected] = useState(null)
  const [bulkSelected, setBulkSelected] = useState(null)
  const tableRef = useRef(null)
  const payload = data[i].data || initData
  
  const select = e => {
    const c = e.currentTarget
    const offset = {top: c.offsetTop, left: c.offsetLeft, height: c.offsetHeight, width: c.offsetWidth}
    const position = JSON.parse(c.getAttribute('data-id'))
    setSelected({offset, position})
  }
  
  useEffect(() => {
    if (!tableRef.current) return
    const c = tableRef.current.querySelector(`td:first-child`)
    c.click()
  }, [tableRef.current])
  
  return (
    <div>
      <div>
        {selected ? (
          <div className={bulkSelected === 'R' ? 'row-selector selected' : 'row-selector'} style={{ top: selected.offset.top, height: selected.offset.height }}>
            <a href='#' onClick={() => setBulkSelected('R')}>
              {'R'}
            </a>
          </div>
        ) : ''}
        <div className='table-body'>
          {selected ? (
            <div className={bulkSelected === 'C' ? 'column-selector selected' : 'column-selector'} style={{ left: selected.offset.left, width: selected.offset.width }}>
              <a href='#' onClick={() => setBulkSelected('C')}>
                {'C'}
              </a>
            </div>
          ) : ''}
          <table ref={tableRef}>
            <tbody>
              {[...Array(payload.state.row)].map((_, _i) => {
                const _r = _i + 1
                return (
                  <tr>
                    {[...Array(payload.state.column)].map((_, __i) => {
                      const _c = __i + 1
                      let hightlight = false
                      if (selected) {
                        console.log('selected', selected)
                        console.log(_r)
                        console.log(_c)
                        const r = selected.position[0] === _r
                        const c = selected.position[1] === _c
                        console.log(r)
                        console.log(c)
                        if ((r && c) || (bulkSelected === 'R' && r) || (bulkSelected === 'C' && c)) {
                          hightlight = true
                        }
                      }
                      const id = `c-${_r}-${_c}`
                      return (
                        <td onClick={select} data-id={JSON.stringify([_r, _c])} className={hightlight ? 'hightlight' : ''} key={`table-${i}-${id}`}>
                          <textarea value={payload.cells[id] || ''}/>
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <ToolBarContainer controller={controller} i={i} data={data}>
        <div>
          {(() => {
            if (!bulkSelected) {
              return ''
            }
            if (bulkSelected === 'R') {
              return (
                <ul>
                  <li><a href='#'>{'Add row'}</a></li>
                  <li><a href='#'>{'Delete row'}</a></li>
                </ul>
              )
            } else if (bulkSelected === 'C') {
              return (
                <ul>
                  <li><a href='#'>{'Add column'}</a></li>
                  <li><a href='#'>{'Delete column'}</a></li>
                </ul>
              )
            }
          })()}
        </div>
      </ToolBarContainer>
    </div>
  )
}



// const initData = [['', '', ''], ['', '', '']]
// 
// const Cell = ({ x, y, selected, hightlight, change, data }) => {
//   return (
//     <div>
//       {selected ? (<textarea value={data} onChange={e => change(x, y, e.target.value)}/>) : data}
//     </div>
//   )
// }

// const TableEdit = ({ controller, i, data }) => {
//   const [selectedCell, setSelectedCell] = useState({})
//   const [selectedBulk, setSelectedBulk] = useState({})
//   const [state, setState] = useState({})
//   const textareaRef = useRef(null)
//   
//   const change = (x, y, c) => {
//     controller.change(data, i, {
//       type: data[i].type,
//       data: data[i].data.map((row, _x) => {
//         return row.map((cell, _y) => {
//           if (x === _x && y === _y) {
//             return c
//           }
//           return cell
//         })
//       })
//     })
//   }
//   
//   useEffect(() => {
//     if (!textareaRef.current) return
//     textareaRef.current.style.height = 'inherit'
//     textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
//     textareaRef.current.focus()
//     const len = textareaRef.current.value.length
//     textareaRef.current.setSelectionRange(len, len)
//   }, [data[i], textareaRef.current])
// 
//   const tabledata = data[i].data || initData
//   const rows = tabledata.length, columns = tabledata[0].length
//   return (
//     <div>
//       <div className='row-selector'>
//         {new Array(rows).fill(0).map((r, x) => (
//           <div key={`table-${i}-handle-x-${x}`}>
//             {selectedCell.x === x ? (
//               <a href='#' onClick={() => setSelectedBulk({x})}>
//                 <span className="icon-more-vertical icon"></span>
//               </a>
//             ) : ''}
//           </div>
//         ))}
//       </div>
//       <div>
//         <div className='columns-selector'>
//           {new Array(columns).fill(0).map((c, y) => (
//             <div key={`table-${i}-handle-y-${y}`}>
//               {selectedCell.y === y ? (
//                 <a href='#' onClick={() => setSelectedBulk({y})}>
//                   <span className="icon-more-horizontal icon"></span>
//                 </a>
//               ) : ''}
//             </div>
//           ))}
//         </div>
//         <div className='body'>
//           {tabledata.map((row, x) => {
//             return (
//               <div key={`table-${i}-row-${x}`}>
//                 {row.map((cell, y) => {
//                   const selected = x === selectedCell.x && y === selectedCell.y
//                   const properties = {
//                     x, y, selected, change, 
//                     hightlight: x === selectedBulk.x || y === selectedBulk.y, 
//                     data: cell,
//                   }
//                   return (
//                     <div key={`table-${i}-cell-${x}-${y}`} onClick={() => setSelectedCell({x, y})}>
//                       <Cell {...properties} />
//                     </div>
//                   )
//                 })}
//               </div>
//             )
//           })}
//         </div>
//       </div>
//       <ToolBarContainer controller={controller} i={i} data={data}>
//         <div>
//           <ul>
//             <li>
//               <a href='#'>{'Add row'}</a>
//             </li>
//           </ul>
//         </div>
//       </ToolBarContainer>
//     </div>
//   )
// }

const TableBlockComponent = ({ controller, focusing, i, data }) => {
  if (focusing !== i) {
    const tabledata = data[i].data || initData
    return (
      <table>
        {tabledata.map((row, x) => (
          <tr key={`table-view-${i}-row-${x}`}>
            {row.map((cell, y) => (
              <td key={`table-view-${i}-cell-${x}-${y}`}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </table>
    )
  }
  return (
    <TableEdit controller={controller} i={i} data={data} />
  )
}

export default TableBlockComponent