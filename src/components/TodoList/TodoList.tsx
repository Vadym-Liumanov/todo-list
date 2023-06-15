import React, { ChangeEvent, useEffect, useState } from "react"
import { TaskType, TodoListType } from "../../App"

import styles from './TodoList.module.css'
import TaskItem from "../TaskItem/TaskItem"

export type filterParamType = 'all' | 'completed' | 'active'

type PropsType = {
    todoList: TodoListType
    onInputNewTask: (todoListId: string, taskTitle: string) => void
    onRemoveTask: (todoListId: string, taskId: string) => void
    onTaskStatusChange: (todoListId: string, taskId: string, taskStatus: boolean) => void
}

function TodoList({ todoList, onInputNewTask, onRemoveTask, onTaskStatusChange }: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState<string>("")
    const [listTasks, setListTasks] = useState<TaskType[]>([])
    const [newTaskError, setNewTaskError] = useState<string | null>(null)
    const [filterStatus, setFilterStatus] = useState<filterParamType>('all')

    useEffect(() => {
        setListTasks(todoList.tasks)
        filterTodoListTasks(filterStatus)
    }, [todoList.tasks])

    function filterTodoListTasks(filterParam: filterParamType) {
        switch (filterParam) {
            case "completed": {
                const completedTasks = todoList.tasks.filter(task => task.isDone)
                setListTasks(completedTasks)
                setFilterStatus('completed')
                break
            }
            case "active": {
                const activeTasks = todoList.tasks.filter(task => !task.isDone)
                setListTasks(activeTasks)
                setFilterStatus('active')
                break
            }
            default: {
                setListTasks(todoList.tasks)
                setFilterStatus('all')
            }
        }
    }

    function onNewTaskTitleChange(e: ChangeEvent<HTMLInputElement>) {
        setNewTaskTitle(e.target.value)
        setNewTaskError(null)
    }

    function onAddNewTaskClick() {
        if (newTaskTitle.trim() !== "") {
            onInputNewTask(todoList.id, newTaskTitle.trim())
            setNewTaskTitle("")
            setNewTaskError(null)
        }
        else {
            setNewTaskError('Task title is required')
        }
    }

    return (
        <div className={styles.card}>
            <h3 className={styles.card__title}>
                {todoList.title}
            </h3>

            <div className={styles.card__inputTaskBlock}>
                <input
                    type="text"
                    placeholder="input new task"
                    className={newTaskError ? styles.card__taskTitleInput_error : styles.card__taskTitleInput}
                    value={newTaskTitle}
                    onChange={onNewTaskTitleChange}
                    onKeyUp={(e) => {
                        if (e.ctrlKey && e.code === 'Enter') {
                            onAddNewTaskClick()
                        }
                    }}
                />
                <button
                    className={styles.card__addTaskBtn}
                    onClick={onAddNewTaskClick}
                >+</button>

                {newTaskError &&
                    <div className={styles.card__taskTitleError}>{newTaskError}</div>
                }

            </div>

            <ul className={styles.card__tasks}>

                {listTasks.map((task) => {
                    return (
                        <TaskItem
                            key={task.id}
                            task={task}
                            todoListId={todoList.id}
                            onRemoveTask={onRemoveTask}
                            onTaskStatusChange={onTaskStatusChange}
                        />
                    )
                })}

            </ul>

            <div className={styles.card__filterBlock}>
                <button
                    className={(filterStatus === 'all') ? styles.card__filterBtn_active : styles.card__filterBtn}
                    onClick={() => { filterTodoListTasks("all") }}
                >
                    All
                </button>
                <button
                    className={(filterStatus === 'completed') ? styles.card__filterBtn_active : styles.card__filterBtn}
                    onClick={() => { filterTodoListTasks("completed") }}
                >
                    Completed
                </button>
                <button
                    className={(filterStatus === 'active') ? styles.card__filterBtn_active : styles.card__filterBtn}
                    onClick={() => { filterTodoListTasks("active") }}
                >
                    Active
                </button>
            </div>

        </div>
    )
}

export default TodoList