import React from 'react'
import { create, updatecheck ,getTodo, todoDelete} from './backend';
import { useState, useEffect } from 'react'

export default function Main() {

    const [name, setName] = useState('')
    const [task, setTask] = useState('')
    const [todos, setTodos] = useState(getTodo())

    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedTodo = create(name, task)
        setTodos(updatedTodo)

        setName('')
        setTask('')
    }

    const handleCheck = (id, completed) => {
        const Updatechecked = updatecheck(id, !completed)
        console.log("hogye")
        setTodos(Updatechecked)
    }

    const handleDelete = (id) => {
        const deleteID = todoDelete(id)
        console.log(id)
        setTodos(deleteID)
    }

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(76,29,149,0.25),_transparent_25%),linear-gradient(135deg,_#f5f3ff_0%,_#eef2ff_45%,_#f8fafc_100%)] px-4 py-8 text-slate-800 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-[36px] border border-violet-200/70 bg-white/85 p-6 shadow-[0_25px_80px_-20px_rgba(76,29,149,0.35)] backdrop-blur-xl sm:p-8 lg:p-10">
                <div className="flex flex-col gap-4 rounded-[28px] border border-violet-100 bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-500 p-6 text-white shadow-lg shadow-violet-500/20 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-violet-100">Productivity</p>
                        <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">TO DO LIST</h1>
                    </div>
                    <div className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
                        Stay focused. Finish smart.
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
                    <div className="rounded-[28px] border border-slate-200 bg-slate-50/90 p-5 shadow-inner sm:p-6">
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold text-slate-900">Add New Task</h2>
                            <p className="mt-1 text-sm text-slate-500">Capture your next important task in seconds.</p>
                        </div>
                        <form onSubmit={handleSubmit} method="post" className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">Task Title</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your task heading"
                                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">Description</label>
                                <textarea
                                    type="text"
                                    name="task"
                                    value={task}
                                    onChange={(e) => setTask(e.target.value)}
                                    rows="4"
                                    placeholder="Enter your today task"
                                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                                />
                            </div>
                            <button
                                type="submit"
                                className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                            >
                                Add Task
                            </button>
                        </form>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between rounded-[24px] border border-slate-200 bg-slate-50/80 px-4 py-3 shadow-sm">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-800">Today&apos;s Tasks</h2>
                                <p className="text-sm text-slate-500">Your active list stays organized here.</p>
                            </div>
                            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                                {todos.length}
                            </span>
                        </div>

                        <div
                            className="max-h-[430px] space-y-4 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-slate-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-violet-400/80 hover:[&::-webkit-scrollbar-thumb]:bg-violet-500"
                            style={{ scrollbarWidth: 'thin', scrollbarColor: '#a78bfa #f1f5f9' }}
                        >
                            {todos.map((todo) => (
                                <div
                                    key={todo.id}
                                    className={`rounded-[24px] border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${todo.completed ? 'border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100/90' : 'border-slate-200 bg-white'}`}
                                >
                                    <div className="flex items-end relative justify-between gap-4">
                                        <div className="min-w-0">
                                            <h3 className="text-xl font-semibold text-slate-900">{todo.name}</h3>
                                            <p className="mt-2 text-sm leading-6 text-slate-600">{todo.task}</p>
                                        </div>
                                        <label className="flex absolute top-0 right-0 h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-slate-50 shadow-sm transition hover:bg-slate-100">
                                            <input
                                                type="checkbox"
                                                name="task2"
                                                checked={todo.completed}
                                                onChange={() => handleCheck(todo.id, todo.completed)}
                                                className="sr-only"
                                            />
                                            <span className={`h-2.5 w-2.5 rounded-full ${todo.completed ? 'bg-white' : 'bg-transparent'}`}></span>
                                        </label>
                                        <div>
                                            <button onClick={() => handleDelete(todo.id)} className="cursor-pointer rounded-full bg-rose-100 px-9 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-200">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}