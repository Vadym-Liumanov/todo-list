import React, { ChangeEvent } from "react"

import styles from './TaskItem.module.css'
import { TaskType } from "../../App"
import EditableSpan from "../EditableSpan/EditableSpan"

type PropsType = {
    task: TaskType
    todoListId: string
    removeTask: (todoListId: string, taskId: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, taskStatus: boolean) => void
    updateTaskTitle: (title: string, todoListId: string, taskId: string) => void
}

function TaskItem({ task, todoListId, removeTask, changeTaskStatus, updateTaskTitle }: PropsType) {
    function updateTitle(title: string) {
        updateTaskTitle(title, todoListId, task.id)
    }
    function onTaskStatusChange(e: ChangeEvent<HTMLInputElement>) {
        changeTaskStatus(todoListId, task.id, e.target.checked)
    }

    return (
        <li className={task.isDone ? styles.card__task_completed : styles.card__task}>
            <input
                type="checkbox"
                checked={task.isDone}
                className={styles.task__checkInput}
                onChange={onTaskStatusChange}
            />
            {/* <span className={styles.task__name}>{task.taskTitle}</span> */}
            <EditableSpan title={task.taskTitle} updateSpan={updateTitle} />
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