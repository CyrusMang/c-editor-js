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
    setBulkSelected(null)
  }
  
  const change = (key, value) => {
    controller.change(data, i, {
      type: data[i].type,
      data: { ...payload, cells: {...payload.cells, [key]: value} },
    })
  }
  
  useEffect(() => {
    if (!tableRef.current) return
    const c = tableRef.current.querySelector(`td:first-child`)
    c.click()
  }, [tableRef.current])
  
  return (
    <div>
      <div className='table-container'>
        {selected ? (
          <div className={bulkSelected === 'R' ? 'row-selector selected' : 'row-selector'} style={{ top: selected.offset.top, height: selected.offset.height }}>
            <a href='#' onClick={() => setBulkSelected('R')}>
              <span className="icon-more-vertical icon"></span>
            </a>
          </div>
        ) : ''}
        <div className='table-body'>
          {selected ? (
            <div className={bulkSelected === 'C' ? 'column-selector selected' : 'column-selector'} style={{ left: selected.offset.left, width: selected.offset.width }}>
              <a href='#' onClick={() => setBulkSelected('C')}>
                <span className="icon-more-horizontal icon"></span>
              </a>
            </div>
          ) : ''}
          <table ref={tableRef}>
            <tbody>
              {[...Array(payload.state.row)].map((_, _i) => {
                const _r = _i + 1
                return (
                  <tr key={`table-${i}-row-${_r}`}>
                    {[...Array(payload.state.column)].map((_, __i) => {
                      const _c = __i + 1
                      let hightlight = false
                      if (selected) {
                        const r = selected.position[0] === _r
                        const c = selected.position[1] === _c
                        if ((r && c) || (bulkSelected === 'R' && r) || (bulkSelected === 'C' && c)) {
                          hightlight = true
                        }
                      }
                      const id = `c-${_r}-${_c}`
                      return (
                        <td onClick={select} data-id={JSON.stringify([_r, _c])} className={hightlight ? 'hightlight' : ''} key={`table-${i}-${id}`}>
                          <textarea value={payload.cells[id] || ''} rows={1} onChange={e => change(id, e.target.value)}/>
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
                  <li><a href='#'>{'ADD ROW'}</a></li>
                  <li><a href='#'>{'DELETE ROW'}</a></li>
                </ul>
              )
            } else if (bulkSelected === 'C') {
              return (
                <ul>
                  <li><a href='#'>{'ADD COLUMN'}</a></li>
                  <li><a href='#'>{'DELETE COLUMN'}</a></li>
                </ul>
              )
            }
          })()}
        </div>
      </ToolBarContainer>
    </div>
  )
}

const TableBlockComponent = ({ controller, focusing, i, data }) => {
  if (focusing !== i) {
    const payload = data[i].data || initData
    return (
      <div className='view'>
        <table>
          <tbody>
            {[...Array(payload.state.row)].map((_, _i) => {
              const _r = _i + 1
              return (
                <tr key={`table-${i}-row-${_r}-view`}>
                  {[...Array(payload.state.column)].map((_, __i) => {
                    const _c = __i + 1
                    const id = `c-${_r}-${_c}`
                    return (
                      <td key={`table-${i}-${id}-view`}>
                        {payload.cells[id] || ''}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
  return (
    <TableEdit controller={controller} i={i} data={data} />
  )
}

export default TableBlockComponent