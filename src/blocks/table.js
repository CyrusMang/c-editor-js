import React from 'react'
import TableBlockComponent from '../components/TableBlockComponent'

export default {
  type: 'table',
  component: TableBlockComponent,
  exchange: data => ({ type: 'INSERT' }),
  icon: (<span className="icon-table icon"></span>)
}