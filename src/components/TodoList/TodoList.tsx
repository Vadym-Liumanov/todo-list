import React, { ChangeEvent, useEffect, useState } from "react"
import { TaskType, TodoListType } from "../../App"

import styles from './TodoList.module.css'
import TaskItem from "../TaskItem/TaskItem"

export type filterParamType = 'all' | 'completed' | 'uncompleted'

type PropsType = {
    todoList: TodoListType
    onInputNewTask: (todoListId: string, taskTitle: string) => void
    onRemoveTask: (todoListId: string, taskId: string) => void
    onTaskStatusChange: (todoListId: string, taskId: string, taskStatus: boolean) => void
}

function TodoList({ todoList, onInputNewTask, onRemoveTask, onTaskStatusChange }: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState<string>("")

    const [listTasks, setListTasks] = useState<TaskType[]>([])

    useEffect(() => {
        setListTasks(todoList.tasks)
    }, [todoList.tasks])

    function filterTodoListTasks(filterParam: filterParamType) {
        switch (filterParam) {
            case "completed": {
                const completedTasks = todoList.tasks.filter(task => task.isDone)
                setListTasks(completedTasks)
                console.log('completed')
                break
            }
            case "uncompleted": {
                const uncompletedTasks = todoList.tasks.filter(task => !task.isDone)
                setListTasks(uncompletedTasks)
                console.log('uncompleted')
                break
            }
            default: {
                setListTasks(todoList.tasks)
                console.log('all')
            }
        }
    }

    function onNewTaskTitleChange(e: ChangeEvent<HTMLInputElement>) {
        setNewTaskTitle(e.target.value)
    }

    function onAddNewTaskClick() {
        if (newTaskTitle.trim() !== "") {
            onInputNewTask(todoList.id, newTaskTitle.trim())
            setNewTaskTitle("")
        }
    }

    return (
        <div className={styles.card}>
            <h3 className={styles.card__title}>{todoList.title}</h3>

            <div className={styles.card__inputTaskBlock}>
                <input
                    type="text"
                    placeholder="input new task"
                    className={styles.card__taskTitleInput}
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
                <button className={styles.card__filterBtn} onClick={() => { filterTodoListTasks("all") }}>All</button>
                <button className={styles.card__filterBtn} onClick={() => { filterTodoListTasks("completed") }}>Completed</button>
                <button className={styles.card__filterBtn} onClick={() => { filterTodoListTasks("uncompleted") }}>Uncompleted</button>
            </div>

        </div>
    )
}

export default TodoList