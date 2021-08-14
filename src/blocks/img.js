import React from 'react'
import ImgBlockComponent from '../components/ImgBlockComponent'

const ImgBlock = upload => ({
  type: 'img',
  component: ImgBlockComponent(upload),
  exchange: data => ({ type: 'INSERT' }),
  icon: (<span className="icon-camera icon"></span>)
})

export default ImgBlock