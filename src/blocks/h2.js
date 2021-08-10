import Toolbar from '../toolbar'

const H2Block = ({ controller, i, data }) => {
  const item = data[i]
  if (controller.focusing !== i) {
    return (<h2>{item.data || '(Empty)'}</h2>)
  }
  return (
    <div>
      <input value={item.data || ''}/>
      <Toolbar controller={controller} i={i} data={data}/>
    </div>
  )
}

export default {
  type: 'h2',
  component: H2Block,
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