import React, { useState } from 'react'
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



function App() {
  const initialTodoLists: TodoListType[] = [
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
          isDone: false
        }
      ]
    },
  ]

  const [todoLists, setTodoLists] = useState<TodoListType[]>(initialTodoLists)

  function onInputNewTask(todoListId: number, taskTitle: string) {
    const newTask: TaskType = {
      id: 1,
      taskTitle: 'New task',
      isDone: false
    }
  }

  return (
    <div className={styles.wrapper}>
      {todoLists.map((list) => {
        return (
          <TodoList data={list} key={list.id} />
        )
      })}
    </div>
  )
}

export default App