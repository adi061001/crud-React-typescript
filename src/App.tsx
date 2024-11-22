import React, { ChangeEvent, FC, FormEvent, useState } from "react"
import { datatype, datatypeSecond } from "./type"
import Todolist from "./Component/Todolist"
import Input from "./Component/Input"
import Button from "./Component/button"
// import { constants } from "buffer"
// import { ChildProcessWithoutNullStreams } from "child_process";
export default function App() {
  let [uname, setname] = useState<string>("")
  let [uphone, setphone] = useState<Number | String>("")
  let [uemail, setemail] = useState<string>("")
  let [udepartment, setdep] = useState<string>("")
  let [todoList, settodolist] = useState<datatype[]>([])
  let [btnshowhide, setshowhide] = useState<boolean>(true)
  let [validationcheck, setvalid] = useState<datatypeSecond>()
  let [indexUp, setIndex] = useState<Number>()
  let [errorMsg, seterrormsg] = useState<boolean>()

  
  // save button
  const savedata = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    let inputDeatils: datatype = {
      name: uname,
      email: uemail,
      Phone: uphone,
      dep: udepartment,
    }




    // update inside save
    if (indexUp == undefined) {
      settodolist([...todoList, inputDeatils])
    } else {
      todoList.splice(Number(indexUp), 1, inputDeatils)
      seterrormsg(false)

      setIndex(undefined)
    }
    setname("")
    setemail("")
    setdep("")
    setphone("")
    setshowhide(true)
  }
  // validation

  function updateRowChild(data: Number) {
    todoList.splice(Number(data), 1)
    settodolist([...todoList])
  }
  const updatedata = (data: datatype, index: Number) => {
    setname(String(data.name))
    setemail(data.email)
    setdep(data.dep)
    setphone(Number(data.Phone))
    setshowhide(false)
    setIndex(index)
    seterrormsg(true)
  }

  const checkEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const checkEmailVal = event.target.value
    console.log(checkEmailVal)
    let statusEmailVal = todoList.some((ob) => ob.email == checkEmailVal)
    console.log(statusEmailVal)

    if (statusEmailVal) {
      if (errorMsg) {
        setvalid({ emailval: false })
      } else {
        setvalid({ emailval: true })
      }
    }
  }
  const checkEmailSecond = () => {
    setvalid({ emailval: false })
  }

  let inputValueChild = (data: string, name: String) => {
    if (name === "Urname") {
      setname(data)
    } else if (name === "Uremail") {
      setemail(data)
    } else if (name === "Urphone") {
      if (data.length <= 10) {
        setphone(data as string | number)
      }
    } else if (name === "Urdepartment") {
      setdep(data)
    }
  }

  return (
    <>
      <center>
        <h1>TodoList</h1>
      </center>
      <center>
        <form className="form-1" onSubmit={savedata}>
          <Input
            name="Urname"
            value={uname}
            inputValueChild={inputValueChild}
            placeholder="enter your name"
            type="text"
          />
          <Input
            name="Uremail"
            value={uemail}
            inputValueChild={inputValueChild}
            placeholder="enter your email"
            type="text"
          />

          <Input
            placeholder="Enter your phone number "
            name="Urphone"
            value={String(uphone)}
            inputValueChild={inputValueChild}
            type="number"
          />

          <Input
            placeholder="Enter your phone number "
            name="Urdepartment"
            value={udepartment}
            inputValueChild={inputValueChild}
            type="text"
          />
          <br></br>
          


          {btnshowhide ? (
            <Button name=""></Button>
          ) : (
            <Button name="upBtn"></Button>
          )}
          <p className="hideEdit" style={{ fontStyle: "italic", color: "red" }}>
            {/* The Email is aleredy persent ! */}
          </p>
          <p></p>
        </form>
      </center>
      <hr></hr>





      {/* table ToDo list */}
      <table border={1} style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department </th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todoList.map((data: datatype, index: number) => {
            return (
              <Todolist
                key={index}
                data={data}
                index={index}
                todolist={todoList}
                updateRowChild={updateRowChild}
                updatedata={updatedata}
              ></Todolist>
            )
          })}





        </tbody>
      </table>
    </>
  )
}
