import React, { ChangeEvent, useState } from "react"
import { TaskType, TodoListType } from "../../App"

import styles from './TodoList.module.css'
import TaskItem from "../TaskItem/TaskItem"

export type FilterParamType = 'all' | 'completed' | 'active'

type PropsType = {
    todoList: TodoListType
    todoListTasks: TaskType[]
    onInputNewTask: (todoListId: string, taskTitle: string) => void
    onRemoveTask: (todoListId: string, taskId: string) => void
    onTaskStatusChange: (todoListId: string, taskId: string, taskStatus: boolean) => void
    onTodoListFilterChange: (todoListId: string, filterParam: FilterParamType) => void
    onRemoveTodoList: (todoListId: string) => void
}

function TodoList({ todoList, todoListTasks, onInputNewTask, onRemoveTask, onTaskStatusChange, onTodoListFilterChange, onRemoveTodoList }: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState<string>("")
    const [newTaskError, setNewTaskError] = useState<string | null>(null)

    let filteredTasks = [...todoListTasks]

    if (todoList.filter === "active") {
        filteredTasks = todoListTasks.filter(task => !task.isDone)
    }

    if (todoList.filter === "completed") {
        filteredTasks = todoListTasks.filter(task => task.isDone)
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
            <button
                className={styles.card__removeListBtn}
                onClick={() => { onRemoveTodoList(todoList.id) }}
            >x</button>

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

                {filteredTasks.map((task) => {
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
                    className={(todoList.filter === 'all') ? styles.card__filterBtn_active : styles.card__filterBtn}
                    onClick={() => { onTodoListFilterChange(todoList.id, 'all') }}
                >
                    All
                </button>
                <button
                    className={(todoList.filter === 'completed') ? styles.card__filterBtn_active : styles.card__filterBtn}
                    onClick={() => { onTodoListFilterChange(todoList.id, 'completed') }}
                >
                    Completed
                </button>
                <button
                    className={(todoList.filter === 'active') ? styles.card__filterBtn_active : styles.card__filterBtn}
                    onClick={() => { onTodoListFilterChange(todoList.id, 'active') }}
                >
                    Active
                </button>
            </div>

        </div>
    )
}

export default TodoList