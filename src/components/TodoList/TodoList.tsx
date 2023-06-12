import React, { ChangeEvent, useState } from "react"
import { TodoListType } from "../../App"

import styles from './TodoList.module.css'

type PropsType = {
    data: TodoListType
}

function TodoList({ data }: PropsType) {
    const [taskTitle, setTaskTitle] = useState<string>("")
    function onNewTaskTitleChange(e: ChangeEvent<HTMLInputElement>) {
        setTaskTitle(e.target.value)
    }

    return (
        <div className={styles.card}>
            <h3 className={styles.card__title}>{data.title}</h3>

            <div className={styles.card__inputTaskBlock}>
                <input
                    type="text"
                    placeholder="input new task"
                    className={styles.card__taskTitleInput}
                    value={taskTitle}
                    onChange={onNewTaskTitleChange}
                />
                <button
                    className={styles.card__addTaskBtn}
                    onClick={() => { alert('Clicked!') }}
                >+</button>
            </div>

            <ul className={styles.card__tasks}>

                {data.tasks.map((it) => {
                    return (
                        <li className={styles.card__task} key={it.id}>
                            <input
                                type="checkbox"
                                checked={it.isDone}
                                className={styles.task__checkInput}
                            />
                            <span className={styles.task__name}>{it.taskTitle}</span>
                            <button className={styles.removeTaskBtn}>-</button>
                        </li>
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