import { useState, useCallback } from 'react'

const useUploader = upload => {
  const [state, setState] = useState({ status: 'init' })
  const [preview, setPreview] = useState(null)
  
  const readPreview = useCallback(file => {
    if (file['type'].includes('image')) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }, [])
  
  const change = useCallback(file => {
    (async () => {
      try {
        readPreview(file)
        const [errors, result] = await upload(file)
        if (error) {
          setState(state => ({...state, status: 'error', errors }))
          return
        }
        setState(state => ({...state, status: 'completed', result }))
      } catch (e) {
        console.error(e)
        setState(state => ({...state, status: 'error', ['unknow error, please try again'] }))
      }
    })()
  }, [])
  
  return {...state, preview, change}
}

export default useUploader