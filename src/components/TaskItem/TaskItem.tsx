import React from "react"

import styles from './TaskItem.module.css'
import { TaskType } from "../../App"

type PropsType = {
    task: TaskType
    todoListId: string
    onRemoveTask: (todoListId: string, taskId: string) => void
}

function TaskItem({ task, onRemoveTask, todoListId }: PropsType) {
    return (
        <li className={styles.card__task}>
            <input
                type="checkbox"
                checked={task.isDone}
                className={styles.task__checkInput}
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