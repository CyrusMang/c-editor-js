import React from 'react'
import TableBlockComponent from '../components/TableBlockComponent'

export default {
  type: 'table',
  component: TableBlockComponent,
  exchange: data => {
    if (data) {
      return { type: 'INSERT' }
    }
    return { type: 'EDIT', data: null }
  },
  icon: (<span className="icon-table icon"></span>)
}