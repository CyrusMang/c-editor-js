import TextBlock from './text'

export default {
  type: 'h1',
  component: TextBlock,
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
}