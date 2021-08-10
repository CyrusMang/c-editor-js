import Toolbar from '../toolbar'

const H1Block = ({ controller, i, data }) => {
  const item = data[i]
  if (controller.focusing !== i) {
    return (<h1>{item.data || '(Empty)'}</h1>)
  }
  return (
    <div>
      <input value={item.data || ''}/>
      <Toolbar controller={controller} i={i} data={data}/>
    </div>
  )
}

export default {
  type: 'h1',
  component: H1Block,
  exchange: data => {
    if (typeof data !== 'string') {
      if (Array.isArray(data)) {
        data = data.join(',')
      } else {
        return { type: 'INSERT' }
      }
    }
    return { type: 'EDIT', data }
  },
}