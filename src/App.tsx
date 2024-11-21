import React, { ChangeEvent, FC, FormEvent, useState } from 'react'
import { datatype, datatypeSecond } from './type'
import Todolist from './Component/Todolist'
// import { constants } from "buffer"
// import { ChildProcessWithoutNullStreams } from "child_process";
export default function App () {



  let [uname, setname] = useState<string>('')
  let [uphone, setphone] = useState<Number | String>('')
  let [uemail, setemail] = useState<string>('')
  let [udepartment, setdep] = useState<string>('')
  let [todoList, settodolist] = useState<datatype[]>([])
  let [btnshowhide, setshowhide] = useState<boolean>(true)
  let [validationcheck, setvalid] = useState<datatypeSecond>()
  let [indexUp, setIndex] = useState<Number>()
  let [errorMsg ,seterrormsg] =useState<boolean>()





// input data
  const userDetails = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === 'Urname') {
      setname(event.target.value)
    } else if (event.target.name === 'Uremail') {
      setemail(event.target.value)
    } else if (event.target.name === 'Urphone') {
      let checklength: Number | string = event.target.value

      if (checklength.length <= 10) {
        setphone(event.target.value as string | number)
      }
    } else if (event.target.name === 'Urdepartment') {
      setdep(event.target.value)
    }
  }



// save button
  const savedata = (event: FormEvent<HTMLFormElement>) => {

    event.preventDefault()
    let inputDeatils: datatype = {
      name: uname,
      email: uemail,
      Phone: uphone,
      dep: udepartment
    }
    // update inside save
    if (indexUp == undefined) {
      settodolist([...todoList, inputDeatils])
    } else {
      todoList.splice(Number(indexUp), 1, inputDeatils)
      seterrormsg(false)
      
      
      setIndex(undefined)
    }
    setname('')
    setemail('')
    setdep('')
    setphone('')
    setshowhide(true)
  }
  // validation 

function updateRowChild(data:Number){

   todoList.splice(Number(data), 1)
    settodolist([...todoList])

}
const updatedata=(data:datatype,index:Number)=>{
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
  let statusEmailVal = todoList.some(ob => ob.email == checkEmailVal)
  console.log(statusEmailVal)
  
  if (statusEmailVal  ) {
    if(errorMsg){
      setvalid({ emailval: false })
    }
    else{
    setvalid({ emailval: true })}
  }
}
const checkEmailSecond = () => {
  setvalid({ emailval: false })
}






  return (
    <>
      <center>
        <h1>TodoList</h1>
      </center>
      <center>
        <form className='form-1' onSubmit={savedata}>
          <input
            type='text'
            placeholder='Enter your name '
            name='Urname'
            value={uname}
            onChange={event => userDetails(event)}
            required
          ></input>
          <input
            type='email'
            placeholder='Enter your email id'
            name='Uremail'
            value={uemail}
            onChange={userDetails}
            required
            onBlur={checkEmail}
            onFocus={checkEmailSecond}
          ></input>
          <input
            type='number'
            placeholder='Enter your phone number '
            name='Urphone'
            value={String(uphone)}
            onChange={userDetails}
            required
          ></input>
          <input
            type='text'
            placeholder='Enter your department'
            name='Urdepartment'
            value={udepartment}
            onChange={userDetails}
            required
          ></input>
          <br></br>
          {}
          {btnshowhide ? (
            <button {errorMsg?disabled:""}  >Save</button>
          ) : (
            <button name='upBtn'>Update</button>
          )}
          <p className='hideEdit' style={{ fontStyle: 'italic', color: 'red' }}>
            {validationcheck?.emailval ? 'The Email is aleredy persent !' : ' '}
          </p>
          <p></p>
        </form>
      </center>
      <hr></hr>
      <table border={1} style={{ width: '100%' }}>
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
            <Todolist key={index} data={data} index={index}  todolist={todoList} updateRowChild={updateRowChild}  updatedata={updatedata}></Todolist> 
            )
          })}
        </tbody>
      </table>
    </>
  )
}
