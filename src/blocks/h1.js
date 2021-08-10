
const H1Block = ({ controller, i, value }) => {
  const data = value[i]
  if (controller.focusing === i) {
    return (<p>{data}</p>)
  }
  return (
    <div>
      <input value={data}/>
    </div>
  )
}

export default {
  type: 'h1',
  component: H1Block,
  active: data => {
    if (typeof data !== 'string') {
      if (Array.isArray(data)) {
        data = data.join(',')
      } else {
        return { type: 'INSERT', data: '' }
      }
    }
    return { type: 'EDIT', data }
  },
}