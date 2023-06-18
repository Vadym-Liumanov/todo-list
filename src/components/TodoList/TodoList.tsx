import React from "react"
import { TaskType, TodoListType } from "../../App"

import styles from './TodoList.module.css'
import TaskItem from "../TaskItem/TaskItem"
import AddItemForm from "../AddItemForm/AddItemForm"

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

    let filteredTasks = [...todoListTasks]

    if (todoList.filter === "active") {
        filteredTasks = todoListTasks.filter(task => !task.isDone)
    }

    if (todoList.filter === "completed") {
        filteredTasks = todoListTasks.filter(task => task.isDone)
    }

    function onAddNewTaskClick(title: string) {
        onInputNewTask(todoList.id, title)
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