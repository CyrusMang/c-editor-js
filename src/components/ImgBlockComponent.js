import React, { useCallback, useEffect, useRef } from 'react'
import useUploader from '../hooks/useUploader'
import { ToolBarContainer } from './Toolbar'

const ImgBlockComponent = upload => ({ controller, focusing, i, data }) => {
  const input = useRef(null)
  const uploader = useUploader(upload)
  const changeFile = e => uploader.change(e.target.files[0])
  
  useEffect(() => {
    if (uploader.status === 'completed') {
      controller.change(data, i, {
        type: data[i].type,
        data: { src: uploader.result },
      })
    }
  }, [uploader.status])
  
  let preview = data[i].data ? data[i].data.src : null
  if (focusing !== i) {
    return (
      <div className='container'>
        {preview ? (
          <img src={preview}/>
        ) : (
          <div className='empty-image'><small>{'No Image'}</small></div>
        )}
      </div>
    )
  }
  if (!preview) {
    preview = uploader.preview
  }
  return (
    <div>
      {uploader.errors ? uploader.errors.map(e => (<p key={e}>{e}</p>)) : ''}
      <div className='container'>
        <a href='#' onClick={() => input.current.click()}>
          {uploader.status === 'pending' ? (<div>{'File uploading ...'}</div>) : ''}
          {preview ? (
            <img src={preview}/>
          ) : (
            <div className='empty-image'><small>{'Upload Image'}</small></div>
          )}
        </a>
      </div>
      <input type='file' ref={input} onChange={changeFile} style={{display: 'none'}}/>
      <ToolBarContainer controller={controller} i={i} data={data}>
        <div>
          <ul>
            <li>
              <a href='#' onClick={() => input.current.click()}>{'SELECT IMAGE'}</a>
            </li>
          </ul>
        </div>
      </ToolBarContainer>
    </div>
  )
}

export default ImgBlockComponent