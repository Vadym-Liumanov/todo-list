import React from "react"
import { TodoListType } from "../../App"

import styles from './TodoList.module.css'

type PropsType = {
    data: TodoListType
}

function TodoList({ data }: PropsType) {
    return (
        <div className={styles.card}>
            <h3 className={styles.card__title}>{data.title}</h3>
            <div className={styles.card__inputTaskBlock}>
                <input
                    type="text"
                    placeholder="input new task"
                    className={styles.card__taskTitleInput}
                />
                <button className={styles.card__addTaskBtn}>+</button>
            </div>
            <ul className={styles.card__tasks}>
                <li className={styles.card__task}>
                    <input
                        type="checkbox"
                        checked={true}
                        className={styles.task__checkInput}
                    />
                    <span className={styles.task__name}>HTML</span>
                    <button className={styles.removeTaskBtn}>-</button>
                </li>
                <li className={styles.card__task}>
                    <input
                        type="checkbox"
                        checked={true}
                        className={styles.task__checkInput}
                    />
                    <span className={styles.task__name}>HTML</span>
                    <button className={styles.removeTaskBtn}>-</button>
                </li>
                <li className={styles.card__task}>
                    <input
                        type="checkbox"
                        checked={false}
                        className={styles.task__checkInput}
                    />
                    <span className={styles.task__name}>HTML</span>
                    <button className={styles.removeTaskBtn}>-</button>
                </li>

            </ul>

        </div>
    )
}

export default TodoList