import { useMeme, useCallback } from 'react'

export const ToolBarContainer = ({ controller, i, children }) => {
  const insert = useCallback(() => controller.insert(i, { type: 'p' }), [])
  const remove = useCallback(() => controller.remove(i), [])
  
  return (
    <div>
      <a href='#' onClick={insert}><span className="icon-plus icon"></span></a>
      {children}
      <a href='#' onClick={remove}><span className="icon-cross icon"></span></a>
    </div>
  )
}

const ToolBar = ({ controller, i, data }) => {
  const currentItem = data[i]
  const exchange = useCallback(e => {
    controller.exchange(i, e.currentTarget.getAttribute('data-tab'), currentItem)
  }, [])
  return (
    <ToolBarContainer controller={controller} i={i}/>
      <div>
        <ul>
          {controller.block.map(b => {
            return (
              <li data-tab={b.type} className={b.type === currentItem.type ? styles.on : ''} onClick={exchange}>
                {b.icon || (<span>{b.type.toUpperCase()}</span>)}
              </li>
            )
          })}
        </ul>
      </div>
    </ToolBarContainer>
  )
}

export default ToolBar