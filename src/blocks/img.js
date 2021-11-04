import React from 'react'
import ImgBlockComponent from '../components/ImgBlockComponent'

export default (upload) => ({
  type: 'img',
  component: ImgBlockComponent(upload),
  exchange: data => ({ type: 'INSERT' }),
  icon: (<span className="icon-camera1 icon"></span>)
})