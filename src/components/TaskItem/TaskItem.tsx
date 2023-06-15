import React from "react"

import styles from './TaskItem.module.css'
import { TaskType } from "../../App"

type PropsType = {
    task: TaskType
    todoListId: string
    onRemoveTask: (todoListId: string, taskId: string) => void
    onTaskStatusChange: (todoListId: string, taskId: string, taskStatus: boolean) => void
}

function TaskItem({ task, todoListId, onRemoveTask, onTaskStatusChange }: PropsType) {
    return (
        <li className={task.isDone ? styles.card__task_completed : styles.card__task}>
            <input
                type="checkbox"
                checked={task.isDone}
                className={styles.task__checkInput}
                onChange={() => {
                    onTaskStatusChange(todoListId, task.id, !task.isDone)
                }}
            />
            <span className={styles.task__name}>{task.taskTitle}</span>
            <button
                className={styles.removeTaskBtn}
                onClick={() => { onRemoveTask(todoListId, task.id) }}
            >
                -
            </button>
        </li>
    )
}

export default TaskItem