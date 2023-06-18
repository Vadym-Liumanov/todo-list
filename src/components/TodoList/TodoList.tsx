import React from "react"
import { TaskType, TodoListType } from "../../App"

import styles from './TodoList.module.css'
import TaskItem from "../TaskItem/TaskItem"
import AddItemForm from "../AddItemForm/AddItemForm"

export type FilterParamType = 'all' | 'completed' | 'active'

type PropsType = {
    todoList: TodoListType
    todoListTasks: TaskType[]
    addNewTask: (todoListId: string, taskTitle: string) => void
    removeTask: (todoListId: string, taskId: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, taskStatus: boolean) => void
    changeTodoListFilter: (todoListId: string, filterParam: FilterParamType) => void
    removeTodoList: (todoListId: string) => void
}

function TodoList({ todoList, todoListTasks, addNewTask, removeTask, changeTaskStatus, changeTodoListFilter, removeTodoList }: PropsType) {

    let filteredTasks = [...todoListTasks]

    if (todoList.filter === "active") {
        filteredTasks = todoListTasks.filter(task => !task.isDone)
    }

    if (todoList.filter === "completed") {
        filteredTasks = todoListTasks.filter(task => task.isDone)
    }

    function onAddNewTaskClick(title: string) {
        addNewTask(todoList.id, title)
    }

    return (
        <div className={styles.card}>
            <h3 className={styles.card__title}>
                {todoList.title}
            </h3>
            <button
                className={styles.card__removeListBtn}
                onClick={() => { removeTodoList(todoList.id) }}
            >x</button>

            <div className={styles.card__inputTaskBlock}>

                <AddItemForm
                    addItem={onAddNewTaskClick}
                    placeholder="input task name"
                />

            </div>

            <ul className={styles.card__tasks}>

                {filteredTasks.map((task) => {
                    return (
                        <TaskItem
                            key={task.id}
                            task={task}
                            todoListId={todoList.id}
                            removeTask={removeTask}
                            changeTaskStatus={changeTaskStatus}
                        />
                    )
                })}

            </ul>

            <div className={styles.card__filterBlock}>
                <button
                    className={(todoList.filter === 'all') ? styles.card__filterBtn_active : styles.card__filterBtn}
                    onClick={() => { changeTodoListFilter(todoList.id, 'all') }}
                >
                    All
                </button>
                <button
                    className={(todoList.filter === 'completed') ? styles.card__filterBtn_active : styles.card__filterBtn}
                    onClick={() => { changeTodoListFilter(todoList.id, 'completed') }}
                >
                    Completed
                </button>
                <button
                    className={(todoList.filter === 'active') ? styles.card__filterBtn_active : styles.card__filterBtn}
                    onClick={() => { changeTodoListFilter(todoList.id, 'active') }}
                >
                    Active
                </button>
            </div>

        </div>
    )
}

export default TodoList