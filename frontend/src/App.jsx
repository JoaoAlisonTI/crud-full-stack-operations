import React, { useEffect, useState } from "react"
import List from "./components/List"
import axios from "axios"
import { baseURL } from "./utils/constant"
import './App.css'

function App() {
  
  const [input, setInput] = useState("")
  const [tasks, setTasks] = useState([])
  const [updateUi, setUpdateUi] = useState(false)
  const [updateId, setUpdateId] = useState(null)
  
  useEffect(() => {
    axios.get(`${baseURL}/get`).then((res) => {
      console.log(res.data)
      setTasks(res.data)
    })
  }, [updateUi])
  
  const addTask = () => {
    axios.post(`${baseURL}/save`, {task: input}).then((res) => {
      console.log(res.data)
      setInput("")
      setUpdateUi((prevState) => !prevState)
    })
  }
  
  const updateMode = (id, text) => {
    console.log(text)
    setInput(text)
    setUpdateId(id)
  }
  
  const updateTask = () => {
    axios.put(`${baseURL}/update/${updateId}`, {task: input}).then((res) => {
      console.log(res.data)
      setUpdateUi((prevState) => !prevState)
      setUpdateId(null)
      setInput("")
    })
  }
  
  return (
    <>
      <main>
       <h1>Full Stack Crud operations</h1>
       
       <div className="inputContainer">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit" onClick={updateId ? updateTask : addTask}>
          {updateId ? "Update" : "To Add"}
        </button>
       </div>
       
       <ul>
        {tasks.map((task) => (
          <List 
            key={task._id}
            id={task._id}
            task={task.task}
            setUpdateUi={setUpdateUi}
            updateMode={updateMode}
          />
        ))}
       </ul>
      </main>
    </>
  )
}

export default App
