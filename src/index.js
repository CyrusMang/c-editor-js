import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { h1, h2, p } from './blocks'

import './styles/ceditor.css'

const initConfigs = {
  blocks: [ h1, h2, p ]
}

const ceditor = (configs=initConfigs) => {
  return ({ data, setData }) => {
    const [focusing, setFocus] = useState(0)
    
    const select = useCallback(e => {
      setFocus(parseInt(e.target.getAttribute('data-index')))
    }, [])
    
    const exchange = useCallback((index, type, item) => {
      const action = configs.blocks.find(b => b.type === type).exchange(item.data)
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
    }, [])
    
    const change = useCallback((index, item) => {
      setData(data => data.map((v, i) => index === i ? item : v))
    }, [])
    
    const insert = useCallback((index, item) => {
      setData(data => data.reduce((n, v, i) => {
        n.push(v)
        if (index === i) {
          n.push(item)
          setFocus(i + 1)
        }
        return n
      }, []))
    }, [])
    
    const remove = useCallback((index) => {
      setData(data => data.reduce((n, v, i) => {
        if (index === i) {
          setFocus(i - 1)
        } else {
          n.push(v)
        }
        return n
      }, []))
    }, [])
    
    const controller = useMemo(() => ({configs, focusing, setFocus, exchange, change, insert, remove}), [])

    return (
      <div className='ceditor'>
        {value.map((row, i) => {
          const block = configs.blocks.find(b => b.type === type)
          const Component = block.component
          return (
            <div onClick={focusing === i ? null : select} data-index={i} key={`block-${i}`}>
              <Component controller={controller} i={i} data={data}/>
            </div>
          )
        })}
      </div>
    )
  }
}

export default ceditor