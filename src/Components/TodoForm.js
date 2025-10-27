import React, { useState } from 'react'

const TodoForm = () => {
    const [task, setTask] = useState('')
    const [tasks, setTasks] = useState([])

    const handleChange = (e) => {
        setTask(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (task.trim() === '') return
        setTasks([...tasks, task])
        setTask('')
    }

    const deleteTodo = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='form'>
                <input className='todo-form' value={task} onChange={handleChange} type="text" placeholder="Add a new todo" />
                <button className='add-btn' type="submit">Add Todo</button>
            </form>

            <div className='todo-container'>
                <ul className='todo-list'>

                    {
                        tasks.map((t, index) => {
                            return <li key={index} className='todo-item'><span>{t}</span> <i className="fa-solid fa-trash" onClick={() => deleteTodo(index)}></i></li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default TodoForm
