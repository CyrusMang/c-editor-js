import Toolbar from '../toolbar'

const PBlock = ({ controller, i, data }) => {
  const item = data[i]
  if (controller.focusing !== i) {
    return (<p>{item.data || '(Empty)'}</p>)
  }
  return (
    <div>
      <textarea value={item.data || ''}/>
      <Toolbar controller={controller} i={i} data={data}/>
    </div>
  )
}

export default {
  type: 'p',
  component: PBlock,
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