import React, { useCallback, useEffect, useRef } from 'react'
import Toolbar from '../toolbar'

const TextBlock = ({ controller, focusing, i, data }) => {
  const textareaRef = useRef(null)
  
  const change = useCallback(e => {
    controller.change(data, i, {
      type: data[i].type,
      data: e.target.value,
    })
  }, [data])
  
  const keypress = useCallback(e => {
    if (e.key === 'Enter'){
      e.preventDefault()
      if (data[i].data) {
        controller.insert(data, i, { type: 'p' })
      }
    }
  }, [data])
  
  useEffect(() => {
    if (!textareaRef.current) return
    textareaRef.current.style.height = 'inherit'
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
  }, [data[i]])
  
  if (focusing !== i) {
    return (<div className='view'>{data[i].data || '(Empty)'}</div>)
  }
  return (
    <div>
      <textarea ref={textareaRef} autoFocus value={data[i].data || ''} onChange={change} onKeyPress={keypress} rows={1}/>
      <Toolbar controller={controller} focusing={focusing} i={i} data={data}/>
    </div>
  )
}

export default TextBlock