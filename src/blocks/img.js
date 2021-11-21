import React from 'react'
import ImgBlockComponent from '../components/ImgBlockComponent'

export default (upload) => ({
  type: 'img',
  component: ImgBlockComponent(upload),
  exchange: data => {
    if (data) {
      return { type: 'INSERT' }
    }
    return { type: 'EDIT', data: null }
  },
  icon: (<span className="icon-camera1 icon"></span>)
})