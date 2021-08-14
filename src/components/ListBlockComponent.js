import React, { useState, useCallback, useEffect } from 'react'
import Toolbar from './Toolbar'

const ListBlockComponent = ({ controller, focusing, i, data }) => {
  const [pointFocusing, setPointFocus] = useState(0)
  
  const select = useCallback(e => {
    setPointFocus(e.currentTarget.getAttribute('data-index'))
  }, [])
  
  const change = useCallback(e => {
    controller.change(data, i, {
      type: data[i].type,
      data: (data[i].data || ['']).map((item, _i) => {
        if (_i === pointFocusing) {
          return e.target.value
        }
        return item
      }),
    })
  }, [data, pointFocusing])
  
  const newline = useCallback(e => {
    controller.change(data, i, {
      type: data[i].type,
      data: (data[i].data || ['']).reduce((n, item, _i) => {
        n.push(item)
        if (_i === pointFocusing) {
          n.push('')
          setPointFocus(_i + 1)
        }
        return n
      }, []),
    })
  }, [data, pointFocusing])
  
  const remove = useCallback(e => {
    const index = parseInt(e.target.parent.getAttribute('data-index'))
    controller.change(i, {
      type: data[i].type,
      data: data[i].data.filter((_, _i) => _i !== index),
    })
    setPointFocus(pointFocusing - 1)
  }, [data, pointFocusing])
  
  const keypress = useCallback(e => {
    if (e.key === 'Enter'){
      e.preventDefault()
      newline()
    }
  }, [newline])
  
  if (focusing !== i) {
    return (
      <ul>
        {(data[i].data || []).map((line, _i) => (
          <li key={`list-${i}-${_i}`}>{line}</li>
        ))}
      </ul>
    )
  }
  return (
    <div>
      <ul>
        {(data[i].data || ['']).map((line, _i) => (
          <li key={`list-${i}-${_i}`} data-index={_i}>
            {focusing === _i ? (
              <input value={line} onChange={change} onKeyPress={keypress}/>
            ) : (
              <p onClick={select}>{line}</p>
            )}
            <a href='#' onClick={remove}><span className="icon-cross icon"></span></a>
          </li>
        ))}
      </ul>
      <Toolbar controller={controller} focusing={focusing} i={i} data={data}/>
    </div>
  )
}

export default ListBlockComponent