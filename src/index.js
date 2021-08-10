import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { h1, h2, p, img, list, table } from './blocks'
import styles from './Editor.module.css'

const initConfigs = {
  blocks: [ h1, h2, p, img, list, table ]
}

const ceditor = (configs=initConfigs) => {
  return ({ value, setValue }) => {
    const [focusing, setFocus] = useState(0)
    
    const select = useCallback(e => {
      setFocus(parseInt(e.target.getAttribute('data-index')))
    }, [])
    
    const exchange = useCallback((index, type) => {
      const data = value.find((v, i) => index === i)
      const action = configs.blocks.find(b => b.type === type).active(data)
      switch (action.type) {
        case 'INSERT': {
          insert(index, { type, data: action.data })
          return
        }
        case 'EDIT': {
          change(index, { type, data: action.data })
          return
        }
      }
    }, [value])
    
    const change = useCallback((index, block) => {
      setValue(value.map((v, i) => index === i ? block : v))
    }, [value])
    
    const insert = useCallback((index, block) => {
      setValue(value.reduce((data, v, i) => {
        data.push(v)
        if (index === i) {
          data.push(block)
          setFocus(i + 1)
        }
        return data
      }, []))
    }, [value])
    
    const remove = useCallback(index => {
      setValue(value.reduce((data, v, i) => {
        if (index === i) {
          setFocus(i - 1)
        } else {
          data.push(v)
        }
        return data
      }, []))
    }, [value])
    
    const controller = {focusing, setFocus, exchange, change, insert, remove}

    return (
      <div className={styles.editor}>
        {value.map((row, i) => {
          const block = configs.blocks.find(b => b.type === type)
          if (focusing === i) {
            const View = block.view 
            return (
              <div onClick={select} data-index={i} key={`block-${i}`}>
                <View i={i} value={value}/>
              </div>
            )
          } else {
            const Edit = block.edit
            const Toolbar = block.toolbar || ToolbarDefault
            return (
              <div key={`block-${i}`}>
                <Edit controller={controller} i={i} value={value}/>
                <Toolbar controller={controller} i={i} value={value}/>
              </div>
            )
          }
        })}
      </div>
    )
  }
}

export default ceditor