import React, { ChangeEvent, FormEvent, useState } from "react"
import { datatype ,datatypeSecond } from "./type"
import { constants } from "buffer"
// import { ChildProcessWithoutNullStreams } from "child_process";
export default function App() {
  let [uname, setname] = useState<string>("")
  let [uphone, setphone] = useState<Number | String>("")
  let [uemail, setemail] = useState<string>("")
  let [udepartment, setdep] = useState<string>("")
  let [todoList, settodolist] = useState<datatype[]>([])
  let [btnshowhide, setshowhide] = useState<boolean>(true)
  let [validationcheck,setvalid]=useState<datatypeSecond>()

  let [indexUp, setIndex] = useState<Number>()

  const userDetails = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "Urname") {
      setname(event.target.value)
    } else if (event.target.name === "Uremail") {
      setemail(event.target.value)
    } else if (event.target.name === "Urphone") {
        let checklength:Number|string=event.target.value
        

        
        if(checklength.length<=10 ){
            
            setphone(event.target.value as string | number)
        }
       
    } else if (event.target.name === "Urdepartment") {
      setdep(event.target.value)
    }
  }

  const savedata = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    let inputDeatils: datatype = {
      name: uname,
      email: uemail,
      Phone: uphone,
      dep: udepartment, 
    }

    if (indexUp == undefined) {
      settodolist([...todoList, inputDeatils])
    } else {
      todoList.splice(Number(indexUp), 1, inputDeatils)

      setIndex(undefined)
    }

    setname("")
    setemail("")
    setdep("")
    setphone("")
    setshowhide(true)
  }

const deleterow = (index: Number): void => {
    todoList.splice(Number(index), 1)
    settodolist([...todoList])
  }
  const updaterow = (data: datatype, index: Number): void => {
    console.log(index)

    setname(String(data.name))
    setemail(data.email)
    setdep(data.dep)
    setphone(Number(data.Phone))

    setshowhide(false)
    setIndex(index)
  }
  const checkEmail=(event: ChangeEvent<HTMLInputElement>)=>{
    const checkEmailVal=event.target.value
    let statusEmailVal=todoList.some(ob=>ob.email==checkEmailVal)

    if(statusEmailVal){
        setvalid({emailval:true}) 
    }

   


  }
  const checkEmailSecond=()=>{
    setvalid({emailval:false}) 

  }


  return (
    <>
      <center>
        <h1>TodoList</h1>
      </center>
      <center>
        <form className="form-1" onSubmit={savedata}>
          <input
            type="text"
            placeholder="Enter your name "
            name="Urname"
            value={uname}
            onChange={(event) => userDetails(event)}
            required
          ></input>
          <input
            type="email"
            placeholder="Enter your email id"
            name="Uremail"
            value={uemail}
            onChange={userDetails}
            required
            onBlur={checkEmail} 
            onFocus={checkEmailSecond}
          ></input>
          <input
            type="number"
            placeholder="Enter your phone number "
            name="Urphone"
            value={String(uphone)}
            onChange={userDetails}
            required
          ></input>
          <input
            type="text"
            placeholder="Enter your department"
            name="Urdepartment"
            value={udepartment}
            onChange={userDetails}
            required
          ></input>
          <br></br>
          {btnshowhide ? (
            <button>Save</button>
          ) : (
            <button name="upBtn">Update</button>
          )}
    <p style={{fontStyle:"italic",color:"red"}}>{validationcheck?.emailval?"The Email is aleredy persent !":" "}</p>
    <p></p>
        </form>
      </center>
      <hr></hr>
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
              <tr style={{ textAlign: "center" }} key={index}>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{String(data.Phone)}</td>
                <td>{data.dep}</td>
                <td onClick={() => updaterow(data, index)}>
                  <i className="fa-solid fa-pen-to-square"></i>
                </td>
                <td onClick={() => deleterow(index)}>
                  <i className="fa-solid fa-trash"></i>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
