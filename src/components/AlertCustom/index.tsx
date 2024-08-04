import React from 'react'
import './style.scss'

type AlertSchema = {
    message: string;
}

export default function AlertCustom({message}: AlertSchema) {
  return (
    <div className='alert-custom'>{message}</div>
  )
}
