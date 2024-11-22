import React from "react";



interface props{
    name:string
}

export default function Button({name}:props){
    return<>


    <button name={name}>Save</button>
    </>
}