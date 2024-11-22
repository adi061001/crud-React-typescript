import React from 'react'
import { ChangeEvent } from 'react'

interface props {
  name: string
  value: string
  inputValueChild: Function
  placeholder: string

  type: string
}

export default function Input ({
  name,
  value,
  placeholder,
  inputValueChild,
  type
}: props) {
  const userDetails = (event: ChangeEvent<HTMLInputElement>): void => {
    inputValueChild(event.target.value, event.target.name)
    console.log(event.target.value)
  }

  return (
    <>
      <input
      value={value}
        type={type}
        onChange={event => userDetails(event)}
        name={name}
        placeholder={placeholder}
        required
      ></input>
    </>
  )
}
