# Warning!
The library still under development. 
# Intro
A block-styled editor for reactJs, friendly for mobile.
# Getting started
```
import cEditor, { h1, h2, p, list } from 'c-react-editor'

const Editor = cEditor({
  blocks: [ 
    h1, 
    h2, 
    p, 
    list
  ]
})

const page = () => {
  const [data, setData] = useState()
  
  return (
    <Editor data={data} setData={setData} />
  )
}
```
# Custom block
```
import cEditor, { h1, h2, p, list, ToolBar } from 'c-react-editor'

const h3Component = ({ controller, focusing, i, data }) => {
  const onFocus = focusing === i
  
  const change = e => {
    controller.change(data, i, {
      type: data[i].type,
      data: e.target.value,
    })
  }
  
  if (!onFocus) {
    return (<div className='view'>{data[i].data || '(Empty)'}</div>)
  }
  return (
    <div>
      <textarea autoFocus value={data[i].data || ''} onChange={change} onKeyDown={keydown} />
      <Toolbar controller={controller} focusing={focusing} i={i} data={data} />
    </div>
  )
}

const customBlock = {
  type: 'h3',
  component: h3Component,
  exchange: data => {
    if (data && typeof data !== 'string') {
      if (Array.isArray(data)) {
        data = data.join(',')
      } else {
        return { type: 'INSERT' }
      }
    }
    return { type: 'EDIT', data }
  },
  icon: (<span>Sub title</span>)
}

const Editor = cEditor({
  blocks: [ 
    h1, 
    h2, 
    customBlock,
    p, 
    list
  ]
})

....
```
