import { useMeme, useCallback } from 'react'
import styles from '../../styles/editor/ToolBar.module.css'

export const BasicToolBar = ({controller, i}) => {
  const insert = useCallback(() => controller.insert(i, { type: 'p' }), [])
  const remove = useCallback(() => controller.remove(i), [])
  
  return (
    <div className={styles.main}>
      <ul>
        <li><a href='#' onClick={insert}><span className="icon-plus icon"></span></a></li>
      </ul>
      {controller.value.length <= 1 ? '' : (
        <a href='#' onClick={remove} className={styles.remove}><span className="icon-cross icon"></span></a>
      )}
    </div>
  )
}

export const TextToolBar = ({controller, i, v}) => {
  const insert = useCallback(() => controller.insert(i, { type: 'p' }), [])
  
  const insertFile = useCallback(e => {
    (v.data ? controller.insert : controller.change)(i, {
      type: e.target.getAttribute('data-tab'),
    })
  }, [v])
  
  const change = useCallback(e => {
    controller.change(i, {
      ...v,
      type: e.target.getAttribute('data-tab'),
    })
  }, [v])
  
  const remove = useCallback(() => controller.remove(i), [])
  
  return (
    <div className={styles.main}>
      <ul>
        <li><a href='#' onClick={insert}><span className="icon-plus icon"></span></a></li>
        <li className={v.type === 'h1' ? styles.on : ''}><a href='#' onClick={change} data-tab='h1'>H1</a></li>
        <li className={v.type === 'h2' ? styles.on : ''}><a href='#' onClick={change} data-tab='h2'>H2</a></li>
        <li className={v.type === 'p' ? styles.on : ''}><a href='#' onClick={change} data-tab='p'>P</a></li>
        <li><a href='#' onClick={change} data-tab='list'><span className="icon-list2 icon"></span></a></li>
        <li><a href='#' onClick={change} data-tab='table'><span className="icon-table2 icon"></span></a></li>
        <li><a href='#' onClick={insertFile} data-tab='img'><span className="icon-camera icon"></span></a></li>
      </ul>
      {controller.value.length <= 1 ? '' : (
        <a href='#' onClick={remove} className={styles.remove}><span className="icon-cross icon"></span></a>
      )}
    </div>
  )
}