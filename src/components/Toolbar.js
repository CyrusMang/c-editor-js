import React, { useCallback } from 'react'

export const ToolBarContainer = ({ controller, i, data, children }) => {
  const insert = useCallback(() => controller.insert(data, i, { type: 'p' }), [data])
  const remove = useCallback(() => controller.remove(data, i), [data])
  
  return (
    <div className='toolbar'>
      <a href='#' onClick={insert}><span className="icon-plus1 icon"></span></a>
      {children}
      <a href='#' className='remove' onClick={remove}><span className="icon-x icon"></span></a>
    </div>
  )
}

const ToolBar = ({ controller, i, data }) => {
  const exchange = useCallback(e => {
    controller.exchange(data, i, e.currentTarget.getAttribute('data-tab'))
  }, [data])
  return (
    <ToolBarContainer controller={controller} i={i} data={data}>
      <div>
        <ul>
          {controller.configs.blocks.map((b, _i) => {
            return (
              <li className={b.type === data[i].type ? 'on' : ''} key={`toolbar-${i}-${_i}`}>
                <a href='#' data-tab={b.type} onClick={exchange}>
                  {b.icon || (<span>{b.type.toUpperCase()}</span>)}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </ToolBarContainer>
  )
}

export default ToolBar