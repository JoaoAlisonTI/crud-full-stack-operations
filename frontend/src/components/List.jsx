import React from "react";
import { BiEditAlt } from "react-icons/bi"
import { BsTrash } from "react-icons/bs"
import axios from "axios"
import { baseURL } from "../utils/constant"

const List = ({ id, task, setUpdateUi, updateMode }) => {
  
  const removeTask = () => {
    axios.delete(`${baseURL}/delete/${id}`).then((res) => {
      console.log(res)
      setUpdateUi((prevState) => !prevState)
    })
  }
  
  return (
      <li className="myTask">
        {task}
        <div className="icon_holder">
          <BiEditAlt className="icon" onClick={() => updateMode(id, task)} />
          <BsTrash className="icon2" onClick={removeTask} />
        </div>
      </li>
    )
}

export default List;