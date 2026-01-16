import React, { useEffect, useState } from 'react'

const MiniTodo = () => {
    const [todo, setTodo] = useState(() => {
        const savedTodos = localStorage.getItem("todos")
        return savedTodos ? JSON.parse(savedTodos) : []
    })
    const [inputText, setInputText] = useState("")

    const handleInputChange = (e) => {
        setInputText(e.target.value)
    }

    const addTodo = () => {
        if (inputText.trim() === "") return

        const newTodo = {
            id: Date.now(),
            text: inputText,
            completed: false
        }

        setTodo([...todo, newTodo])
        setInputText("")
    }

    const toggleTodo = (id) => {
        const updatedTodo = todo.map((todo) =>
            todo.id === id
                ? { ...todo, completed: !todo.completed }
                : todo
        );
        setTodo(updatedTodo)
    }

    const deleteTodo = (id) => {
        const filteredTodo = todo.filter((todo) => todo.id !== id);
        setTodo(filteredTodo)
    }

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todo))
    }, [todo])

    return (
        <div className="flex justify-center mt-1">
            <div className="bg-gray-900 text-white w-full max-w-md p-6 rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-6">✨ Todo List</h1>

                {/* Input + Button */}
                <div className="flex gap-2 mb-6">
                    <input
                        type="text"
                        value={inputText}
                        onChange={handleInputChange}
                        placeholder="Add a new task..."
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        onClick={addTodo}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition"
                    >
                        Add
                    </button>
                </div>

                {/* Todo List */}
                <ul className="space-y-4">
                    {todo.map((todo) => (
                        <li
                            key={todo.id}
                            className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => toggleTodo(todo.id)}
                                    className="h-5 w-5 text-indigo-500 rounded focus:ring-indigo-400"
                                />
                                <span
                                    className={`ml-3 text-lg ${todo.completed ? "line-through text-gray-400" : ""
                                        }`}
                                >
                                    {todo.text}
                                </span>
                            </div>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                className="text-red-500 hover:text-red-600 font-medium transition"
                            >
                                ✕
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default MiniTodo
