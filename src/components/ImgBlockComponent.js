import React, { useCallback, useEffect, useRef } from 'react'
import useUploader from '../hooks/useUploader'
import { ToolBarContainer } from './Toolbar'

const ImgBlockComponent = upload => ({ controller, focusing, i, data }) => {
  const input = useRef(null)
  const uploader = useUploader(upload)
  
  const pick = useCallback(input.current.click, [])
  const changeFile = useCallback(e => uploader.change(e.target.files[0]), [])
  
  useEffect(() => {
    if (uploader.status === 'completed') {
      controller.change(data, i, {
        type: data[i].type,
        data: uploader.result,
      })
    }
  }, [uploader.status])
  
  useEffect(() => {
    if (input.current) {
      pick()
    }
  }, [input.current])
  
  const preview = data[i].data ? data[i].data.url : ''
  if (focusing !== i) {
    return (
      <div>
        <img src={preview}/>
      </div>
    )
  }
  return (
    <div>
      {uploader.errors.map(e => (<p key={e}>{e}</p>))}
      <div>
        {uploader.status === 'pending' ? (<div>{'File uploading ...'}</div>) : ''}
        <img src={uploader.preview || preview}/>
      </div>
      <input type='file' ref={input} onChange={changeFile} style={{display: 'none'}}/>
      <ToolBarContainer controller={controller} i={i} data={data}>
        <ul>
          <li>
            <a href='#' onClick={pick}>{'SELECT IMAGE'}</a>
          </li>
        </ul>
      </ToolBarContainer>
    </div>
  )
}

export default ImgBlockComponent