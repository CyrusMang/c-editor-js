import { useMeme, useState, useEffect, useCallback, useRef } from 'react'
import { BasicToolBar } from '../toolbars'
import styles from '../../../styles/editor/ImageBlock.module.css'

const initConfigs = {
  upload: fileToDataurl
}

const FilePreview = ({ file }) => {
  const [preview, setPreview] = useState(null)
  useEffect(() => {
    if (file["type"].includes('image')) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }, [])
  if (!preview) {
    return (<p>{'default'}</p>)
  }
  return (
    <img src={preview}/>
  )
}

const FileUpload = ({ upload, file }) => {
  const [state, setState] = useState({ status: 'pending' })
  useEffect(() => {
    (async () => {
      try {
        const [error, result] = await upload(file)
        if (error) {
          setState({ status: 'error', messages: errors })
          return
        }
        setState({ status: 'completed', result })
      } catch (e) {
        setState({ status: 'error', messages: ['unknow error'] })
      }
    })()
  }, [])
  if (state.status === 'pending') return (<p>{'...'}</p>)
  if (state.status === 'error') return state.messages.map(m => (<p className='error'>{m}</p>))
  return (
    <div>
      
    </div>
  )
}




const useFileHandler = ({ upload }) => {
  const [state, setState] = useState([])
  const addFiles = useCallback(files => {
    setState([
      files.map(file => ({
        id: uuid.v4(),
        status: 'pending',
        file,
      })),
      ...state, 
    ])
  }, [])
  
  useEffect(() => {
    state.forEach(file => {
      (async () => {
        try {
          const id = uuid.v4()
          setState([...state, { id, status: 'pending' }])
          await upload(file)
        } catch (e) {
          
        }
      })()
    })
  }, [state])
  
  const addFiles = useCallback(files => {
    setState(files.map(s => {
      const file = {
        id: uuid.v4(),
        status: 'pending',
      }
      const callback = async () => {
        try {
          const id = uuid.v4()
          setState([...state, { id, status: 'pending' }])
          await upload(file)
        } catch (e) {
          
        }
      }
    }))
    
    
    files.forEach(() => {
      (async () => {
        try {
          const id = uuid.v4()
          setState([...state, { id, status: 'pending' }])
          await upload(file)
        } catch (e) {
        
        }
      })()
    })
    
    
    (async () => {
      try {
        const id = uuid.v4()
        setState([...state, { id, status: 'pending' }])
        await upload(file)
      } catch (e) {
        
      }
    })()
  }, [])
}


const FileBlock = (configs=initConfigs) => {
  return ({controller, i, v}) => {
    const [status, setStatus] = useState('hold')
    const [errors, setErrors] = useState([])
    
    const input = useRef(null)
    
    const pick = useCallback(() => {
      input.current.click()
    }, [])
    
    const upload = useCallback(e => {
      (async () => {
        try {
          if (!e.target.files[0]) return
          setStatus('pending')
          const url = await configs.upload(e.target.files[0])
          controller.change(i, {
            ...v,
            data: { url }
          })
          setStatus('hold')
        } catch (error) {
          setErrors([error.message])
        }
      })()
    }, [v])
    
    const cancel = useCallback(() => {
      controller.change(i, { type: 'img' })
    }, [])
    
    useEffect(() => {
      pick()
    }, [])
    
    return (
      <div>
        {errors.map(e => (<p key={e}>{e}</p>))}
        <input type='file' ref={input} onChange={upload} style={{display: 'none'}}/>
        {status === 'pending' ? (
          <div>
            <p>{'...Uploading...'}</p>
          </div>
        ) : v.data ? (
          <div className={styles.photo}>
            <img src={`${v.data.url}`}/>
            {i === controller.focusing ? (<a href='#' onClick={cancel}>CANCEL</a>) : ''}
          </div>
        ) : (
          <div>
            <p><a href='#' onClick={pick}>SELECT PHOTO</a></p>
          </div>
        )}
        {i === controller.focusing ? (
          <BasicToolBar controller={controller} i={i}/>
        ) : ''}
      </div>
    )
  }
}

export default ImgBlock