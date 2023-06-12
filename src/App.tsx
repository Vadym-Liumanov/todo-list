import React from 'react'
import styles from './App.module.css'
import TodoList from './components/TodoList/TodoList'

export type TaskType = {
  id: number
  taskTitle: string
  isDone: boolean
}

export type TodoListType = {
  id: number
  title: string
  tasks: TaskType[]
}

const TodoLists: TodoListType[] = [
  {
    id: 1,
    title: 'What to lean',
    tasks: [
      {
        id: 1,
        taskTitle: 'HTML',
        isDone: true
      },
      {
        id: 2,
        taskTitle: 'CSS',
        isDone: true
      },
      {
        id: 3,
        taskTitle: 'JS',
        isDone: true
      },
      {
        id: 4,
        taskTitle: 'React',
        isDone: true
      }
    ]
  }
]

const data: TodoListType = TodoLists[0]

function App() {
  return (
    <div className={styles.wrapper}>
      <TodoList data={data} />
    </div>
  )
}

export default App
