import React, { ChangeEvent, useState } from "react"
import { TodoListType } from "../../App"

import styles from './TodoList.module.css'
import TaskItem from "../TaskItem/TaskItem"

type PropsType = {
    data: TodoListType
    onInputNewTask: (todoListId: string, taskTitle: string) => void
    onRemoveTask: (todoListId: string, taskId: string) => void
}

function TodoList({ data, onInputNewTask, onRemoveTask }: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState<string>("")

    function onNewTaskTitleChange(e: ChangeEvent<HTMLInputElement>) {
        setNewTaskTitle(e.target.value)
    }

    function onAddNewTaskClick() {
        if (newTaskTitle !== "") {
            onInputNewTask(data.id, newTaskTitle)
            setNewTaskTitle("")
        }
    }

    return (
        <div className={styles.card}>
            <h3 className={styles.card__title}>{data.title}</h3>

            <div className={styles.card__inputTaskBlock}>
                <input
                    type="text"
                    placeholder="input new task"
                    className={styles.card__taskTitleInput}
                    value={newTaskTitle}
                    onChange={onNewTaskTitleChange}
                />
                <button
                    className={styles.card__addTaskBtn}
                    onClick={onAddNewTaskClick}
                >+</button>
            </div>

            <ul className={styles.card__tasks}>

                {data.tasks.map((task) => {
                    return (
                        <TaskItem task={task} onRemoveTask={onRemoveTask} todoListId={data.id} key={task.id} />
                    )
                })}

            </ul>

            <div className={styles.card__filterBlock}>
                <button className={styles.card__filterBtn}>All</button>
                <button className={styles.card__filterBtn}>Completed</button>
                <button className={styles.card__filterBtn}>Uncompleted</button>
            </div>

        </div>
    )
}

export default TodoList