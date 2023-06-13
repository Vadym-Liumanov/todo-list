import React, { useState } from 'react'
import { v4 } from 'uuid'

import styles from './App.module.css'
import TodoList from './components/TodoList/TodoList'

export type TaskType = {
  id: string
  taskTitle: string
  isDone: boolean
}

export type TodoListType = {
  id: string
  title: string
  tasks: TaskType[]
}

function App() {

  const initialTodoLists: TodoListType[] = [
    {
      id: v4(),
      title: 'What to lean',
      tasks: [
        {
          id: v4(),
          taskTitle: 'HTML',
          isDone: true
        },
        {
          id: v4(),
          taskTitle: 'CSS',
          isDone: true
        },
        {
          id: v4(),
          taskTitle: 'JS',
          isDone: true
        },
        {
          id: v4(),
          taskTitle: 'React',
          isDone: false
        }
      ]
    },
  ]

  const [todoLists, setTodoLists] = useState<TodoListType[]>(initialTodoLists)

  function onInputNewTask(todoListId: string, taskTitle: string) {
    const newTask: TaskType = {
      id: v4(),
      taskTitle: taskTitle,
      isDone: false
    }
    const updatedTodoLists: TodoListType[] = [...todoLists]
    let updatedIndex = -1
    updatedTodoLists.forEach((todoList, index) => {
      if (todoList.id === todoListId) {
        updatedIndex = index
      }
    })

    if (updatedIndex >= 0) {
      updatedTodoLists[updatedIndex].tasks.push(newTask)
      setTodoLists(updatedTodoLists)
    }

  }

  return (
    <div className={styles.wrapper}>
      {todoLists.map((list) => {
        return (
          <TodoList
            key={list.id}
            data={list}
            onInputNewTask={onInputNewTask}
          />
        )
      })}
    </div>
  )
}

export default App