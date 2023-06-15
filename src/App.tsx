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

  function getTodoListIndexById(todoListId: string) {
    let todoListIndex = -1
    todoLists.forEach((list, index) => {
      if (list.id === todoListId) {
        todoListIndex = index
      }
    })
    return todoListIndex
  }

  function onInputNewTask(todoListId: string, taskTitle: string) {
    const updatedTodoListIndex = getTodoListIndexById(todoListId)

    if (updatedTodoListIndex >= 0) {
      const newTask: TaskType = {
        id: v4(),
        taskTitle: taskTitle,
        isDone: false
      }
      const updatedTodoLists: TodoListType[] = [...todoLists]
      updatedTodoLists[updatedTodoListIndex].tasks.push(newTask)
      setTodoLists(updatedTodoLists)
    }
  }

  function onRemoveTask(todoListId: string, taskId: string) {
    const updatedTodoListIndex = getTodoListIndexById(todoListId)

    if (updatedTodoListIndex >= 0) {
      const currentTodoListTasks: TaskType[] = [...todoLists[updatedTodoListIndex].tasks]
      const newTodoListTasks: TaskType[] = currentTodoListTasks.filter((task) => task.id !== taskId)
      const updatedTodoLists = [...todoLists]
      updatedTodoLists[updatedTodoListIndex].tasks = [...newTodoListTasks]
      setTodoLists(updatedTodoLists)
    }
  }

  function onTaskStatusChange(todoListId: string, taskId: string, taskStatus: boolean) {
    const updatedTodoListIndex = getTodoListIndexById(todoListId)

    if (updatedTodoListIndex >= 0) {
      const currentTodoListTasks: TaskType[] = [...todoLists[updatedTodoListIndex].tasks]
      const newTodoListTasks: TaskType[] = currentTodoListTasks.map((task) => {
        if (task.id === taskId) {
          task.isDone = taskStatus
        }
        return task
      })
      const updatedTodoLists = [...todoLists]
      updatedTodoLists[updatedTodoListIndex].tasks = [...newTodoListTasks]
      setTodoLists(updatedTodoLists)
    }
  }

  return (
    <div className={styles.wrapper}>
      {todoLists.map((list) => {
        return (
          <TodoList
            key={list.id}
            todoList={list}
            onInputNewTask={onInputNewTask}
            onRemoveTask={onRemoveTask}
            onTaskStatusChange={onTaskStatusChange}
          />
        )
      })}
    </div>
  )
}

export default App