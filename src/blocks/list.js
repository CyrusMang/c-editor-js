import React from 'react'
import ListBlockComponent from '../components/ListBlockComponent'

export default {
  type: 'p',
  component: ListBlockComponent,
  exchange: data => {
    if (data && !Array.isArray(data)) {
      if (typeof data === 'string') {
        data = data.split(',')
      } else {
        return { type: 'INSERT' }
      }
    }
    return { type: 'EDIT', data }
  },
  icon: (<span className="icon-list2 icon"></span>)
}