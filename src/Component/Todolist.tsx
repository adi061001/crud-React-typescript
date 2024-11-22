import React, { FC } from "react"
import { datatype } from "../type"

interface props {
  data: datatype
  index: Number
  todolist: datatype[]
  updateRowChild: Function
  updatedata: Function
}

export default function Todolist({
  data,
  index,
  todolist,
  updateRowChild,
  updatedata,
}: props) {
  // delete icon
  const deleterow = (index: Number): void => {
    updateRowChild(index)
  }

  // update row
  const updateRow = (data: datatype, index: Number): void => {
    updatedata(data, index)
  }

  return (
    <>
      <tr style={{ textAlign: "center" }}>
        <td>{data.name}</td>
        <td>{data.email}</td>
        <td>{String(data.Phone)}</td>
        <td>{data.dep}</td>
        <td onClick={() => updateRow(data, index)}>
          <i className="    fa-solid fa-pen-to-square"></i>
        </td>
        <td onClick={() => deleterow(index)}>
          <i className="fa-solid fa-trash"></i>
        </td>
      </tr>
    </>
  )
}
