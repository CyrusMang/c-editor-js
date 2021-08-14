import React, { useState, useCallback, useEffect, useRef } from 'react'
import Toolbar from './Toolbar'

const ListBlockComponent = ({ controller, focusing, i, data }) => {
  const onFocus = focusing === i
  
  const textareaRef = useRef(null)
  
  const [pointFocusing, setPointFocus] = useState(0)
  
  const select = useCallback(e => {
    setPointFocus(parseInt(e.currentTarget.getAttribute('data-index')))
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
  
  const keydown = useCallback(e => {
    if (e.key === 'Enter'){
      e.preventDefault()
      controller.change(data, i, {
        type: data[i].type,
        data: (data[i].data || ['']).reduce((n, item, _i) => {
          n.push(item)
          if (_i === pointFocusing) {
            n.push('')
          }
          return n
        }, []),
      })
      setPointFocus(pointFocusing + 1)
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      if (pointFocusing > 0 && !data[i].data[pointFocusing]) {
        e.preventDefault()
        controller.change(data, i, {
          type: data[i].type,
          data: data[i].data.filter((_, _i) => _i !== pointFocusing),
        })
        setPointFocus(pointFocusing - 1)
      }
    }
  }, [data, pointFocusing])
  
  useEffect(() => {
    if (!onFocus || !textareaRef.current) return
    textareaRef.current.style.height = 'inherit'
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    textareaRef.current.focus()
    const len = textareaRef.current.value.length
    textareaRef.current.setSelectionRange(len, len)
  }, [onFocus, pointFocusing, data[i], textareaRef.current])
  
  if (!onFocus) {
    return (
      <ul className='view container'>
        {(data[i].data || []).map((line, _i) => (
          <li key={`list-${i}-${_i}`}><p>{line}</p></li>
        ))}
      </ul>
    )
  }
  return (
    <div>
      <ul className='container'>
        {(data[i].data || ['']).map((line, _i) => (
          <li key={`list-${i}-${_i}`}>
            {pointFocusing === _i ? (
              <textarea ref={textareaRef} autoFocus value={line} onChange={change} onKeyDown={keydown} rows={1}/>
            ) : (
              <p data-index={_i} onClick={select}>{line}</p>
            )}
          </li>
        ))}
      </ul>
      <Toolbar controller={controller} focusing={focusing} i={i} data={data}/>
    </div>
  )
}

export default ListBlockComponent