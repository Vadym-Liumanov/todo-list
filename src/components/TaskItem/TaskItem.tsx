import React from "react"

import styles from './TaskItem.module.css'
import { TaskType } from "../../App"

type PropsType = {
    task: TaskType
    todoListId: string
    removeTask: (todoListId: string, taskId: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, taskStatus: boolean) => void
}

function TaskItem({ task, todoListId, removeTask, changeTaskStatus }: PropsType) {
    return (
        <li className={task.isDone ? styles.card__task_completed : styles.card__task}>
            <input
                type="checkbox"
                checked={task.isDone}
                className={styles.task__checkInput}
                onChange={(e) => {
                    changeTaskStatus(todoListId, task.id, e.target.checked)
                }}
            />
            <span className={styles.task__name}>{task.taskTitle}</span>
            <button
                className={styles.removeTaskBtn}
                onClick={() => { removeTask(todoListId, task.id) }}
            >
                x
            </button>
        </li>
    )
}

export default TaskItem