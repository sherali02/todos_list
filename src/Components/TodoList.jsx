import { useEffect, useState } from 'react'
import TODO from '/public/TODO.svg'
const TodoList = () => {

  let inittask;
  if (localStorage.getItem('tasks') === null) {
    inittask = [];
  }
  else {
    inittask = JSON.parse(localStorage.getItem('tasks'));
  }

  const [tasks, settasks] = useState(inittask);
  const [newtask, setnewtask] = useState("");

  const handleInput = (event) => {
    setnewtask(event.target.value);
  }

  const addtask = () => {
    if (newtask.trim() !== "") {
      settasks(t => [...t, [newtask, 0]]);
      setnewtask([""]);
    }
    else {
      alert("Task is Empty!\nEnter a TODO to add.");
    }

  }

  const deletetask = (index) => {
    const updatedTask = tasks.filter((_, i) => i !== index);
    settasks(updatedTask);

  }

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const movetaskup = (index) => {
    if (index > 0) {
      const updatedTask = [...tasks];
      [updatedTask[index], updatedTask[index - 1]] = [updatedTask[index - 1], updatedTask[index]];
      settasks(updatedTask);
    }
  }

  const movetaskdown = (index) => {
    if (index < tasks.length - 1) {
      const updatedTask = [...tasks];
      [updatedTask[index], updatedTask[index + 1]] = [updatedTask[index + 1], updatedTask[index]];
      settasks(updatedTask);
    }
  }

  const markComplete = (index) => {
    if (tasks[index][1] === 0) {
      tasks[index][1] = 1;
    }
    else {
      tasks[index][1] = 0;
    }
    settasks([...tasks]);
  }

  return (
    <div>
      <div className="todo_list">
        
        <h1><img src = "TODO.svg" alt="My Happy SVG" width='100px' height={'100px'} style={{
    margin: "-25px 3px"
}}
/>TODO-List</h1>
        <div>
          <input type="text" placeholder='Enter a task...' value={newtask} onChange={handleInput} />
          <button className="add-button" onClick={addtask}>Add</button>
        </div>
        <ol>
          {
            tasks.map((task, index) =>
              <li key={index} className={task[1] === 1 ? 'completed' : ''}>
                <a onClick={() => markComplete(index)}><svg xmlns="http://www.w3.org/2000/svg" className={task[1] === 1 ? 'symbol2' : 'symbol1'} width="20" height="20" viewBox="0 0 16 16" >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                </svg></a>
                <span className='text'>{task[0]}</span>
                <button className="delete-button" onClick={() => deletetask(index)}>
                  Delete
                </button>
                <button className="move up-button" onClick={() => movetaskup(index)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5" />
                  </svg>
                </button>
                <button className="move down-button" onClick={() => movetaskdown(index)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1" />
                  </svg>
                </button>
              </li>
            )
          }
        </ol>
      </div>
    </div>
  )
}

export default TodoList
