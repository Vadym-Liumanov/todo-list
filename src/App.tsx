import React, { useState } from 'react'
import { v4 } from 'uuid'

import styles from './App.module.css'
import TodoList, { FilterParamType } from './components/TodoList/TodoList'
import AddItemForm from './components/AddItemForm/AddItemForm'

export type TaskType = {
  id: string
  taskTitle: string
  isDone: boolean
}

export type TodoListType = {
  id: string
  title: string
  filter: FilterParamType
}

export type TasksType = {
  [key: string]: TaskType[]
}

function App() {

  const todoListId_1 = v4()
  const todoListId_2 = v4()

  const initialTodoLists: TodoListType[] = [
    {
      id: todoListId_1,
      title: 'What to lean',
      filter: 'all'
    },
    {
      id: todoListId_2,
      title: 'What to by',
      filter: 'all'
    },
  ]

  const initialAllTasks: TasksType = {
    [todoListId_1]: [
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
    ],
    [todoListId_2]: [
      {
        id: v4(),
        taskTitle: 'milk',
        isDone: true
      },
      {
        id: v4(),
        taskTitle: 'pizza',
        isDone: true
      },
      {
        id: v4(),
        taskTitle: 'car',
        isDone: false
      },
      {
        id: v4(),
        taskTitle: 'flat',
        isDone: false
      }
    ],
  }

  const [todoLists, setTodoLists] = useState<TodoListType[]>(initialTodoLists)
  const [allTasks, setAllTasks] = useState<TasksType>(initialAllTasks)

  function onInputNewTask(todoListId: string, taskTitle: string) {
    const newTask: TaskType = {
      id: v4(),
      taskTitle: taskTitle,
      isDone: false
    }
    allTasks[todoListId] = [...allTasks[todoListId], newTask]
    setAllTasks({ ...allTasks })
  }

  function onRemoveTask(todoListId: string, taskId: string) {
    const newTasks = allTasks[todoListId].filter(task => task.id !== taskId)
    allTasks[todoListId] = [...newTasks]
    setAllTasks({ ...allTasks })
  }

  function onTaskStatusChange(todoListId: string, taskId: string, taskStatus: boolean) {
    const changedTask = allTasks[todoListId].find(task => task.id === taskId)
    if (changedTask) {
      changedTask.isDone = taskStatus
    }
    setAllTasks({ ...allTasks })
  }

  function onTodoListFilterChange(todoListId: string, filterParam: FilterParamType) {
    const changedTodoList = todoLists.find(list => list.id === todoListId)
    if (changedTodoList) {
      changedTodoList.filter = filterParam
    }
    setTodoLists([...todoLists])
  }

  function onRemoveTodoList(todoListId: string) {
    const newTodoLists = todoLists.filter(list => list.id !== todoListId)
    setTodoLists([...newTodoLists])
    delete allTasks[todoListId]
    setAllTasks({ ...allTasks })
  }

  function addTodoList(title: string) {
    const newList: TodoListType = {
      id: v4(),
      title: title,
      filter: 'all'
    }
    setTodoLists([...todoLists, newList])
    allTasks[newList.id] = []
    setAllTasks({ ...allTasks })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.addTodoListblock}>
        <h3 className={styles.addTodoListblock__header}>Add new TodoList</h3>
        <AddItemForm
          addItem={addTodoList}
          placeholder='input list title'
        />
      </div>
      {todoLists.map((list) => {
        return (
          <TodoList
            key={list.id}
            todoList={list}
            todoListTasks={allTasks[list.id]}
            onInputNewTask={onInputNewTask}
            onRemoveTask={onRemoveTask}
            onTaskStatusChange={onTaskStatusChange}
            onTodoListFilterChange={onTodoListFilterChange}
            onRemoveTodoList={onRemoveTodoList}
          />
        )
      })}
    </div>
  )
}

export default App