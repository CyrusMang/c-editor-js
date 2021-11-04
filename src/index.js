import React, { useState, useCallback, useMemo } from 'react'
import { h1, h2, p, img, list, table } from './blocks/index'

import './styles/ceditor.css'

const initConfigs = {
  blocks: [ h1, h2, p, list, table ]
}

const ceditor = (configs=initConfigs) => {
  return ({ data, setData }) => {
    const [focusing, setFocus] = useState(0)
    
    const select = useCallback(e => {
      setFocus(parseInt(e.currentTarget.getAttribute('data-index')))
    }, [])
    
    const exchange = useCallback((data, index, type) => {
      const item = data[index]
      const action = configs.blocks.find(b => b.type === type).exchange(item.data)
      switch (action.type) {
        case 'INSERT': {
          insert(data, index, { type, data: action.data })
          return
        }
        case 'EDIT': {
          change(data, index, { type, data: action.data })
          return
        }
      }
    }, [])
    
    const change = useCallback((data, index, item) => {
      setData(data.map((v, i) => index === i ? item : v))
    }, [])
    
    const insert = useCallback((data, index, item) => {
      setData(data.reduce((n, v, i) => {
        n.push(v)
        if (index === i) {
          n.push(item)
          setFocus(i + 1)
        }
        return n
      }, []))
    }, [])
    
    const remove = useCallback((data, index) => {
      setData(data.reduce((n, v, i) => {
        if (index === i) {
          setFocus(i - 1)
        } else {
          n.push(v)
        }
        return n
      }, []))
    }, [])
    
    const controller = useMemo(() => ({configs, setFocus, exchange, change, insert, remove}), [])
    
    data = data || [{ type: configs.blocks[0].type }]
    return (
      <div className='ceditor'>
        {data.map((item, i) => {
          const block = configs.blocks.find(b => b.type === item.type)
          const Component = block.component
          return (
            <div className={item.type} onClick={focusing === i ? null : select} data-index={i} key={`block-${i}`}>
              <Component controller={controller} focusing={focusing} i={i} data={data}/>
            </div>
          )
        })}
      </div>
    )
  }
}

const main = { h1, h2, p, img, list, ceditor }

export default main