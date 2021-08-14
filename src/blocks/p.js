import TextBlockComponent from '../components/TextBlockComponent'

export default {
  type: 'p',
  component: TextBlockComponent,
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