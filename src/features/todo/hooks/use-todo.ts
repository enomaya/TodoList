import { useReducer, useCallback } from 'react'
import type { Todo, FilterType } from '../types'

type State = {
  todos: Todo[]
  filter: FilterType
}

type Action =
  | { type: 'ADD'; text: string }
  | { type: 'TOGGLE'; id: string }
  | { type: 'DELETE'; id: string }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'SET_FILTER'; filter: FilterType }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: crypto.randomUUID(), text: action.text, completed: false, createdAt: Date.now() },
        ],
      }
    case 'TOGGLE':
      return {
        ...state,
        todos: state.todos.map(t => t.id === action.id ? { ...t, completed: !t.completed } : t),
      }
    case 'DELETE':
      return { ...state, todos: state.todos.filter(t => t.id !== action.id) }
    case 'CLEAR_COMPLETED':
      return { ...state, todos: state.todos.filter(t => !t.completed) }
    case 'SET_FILTER':
      return { ...state, filter: action.filter }
    default:
      return state
  }
}

export function useTodo() {
  const [state, dispatch] = useReducer(reducer, { todos: [], filter: 'all' })

  const addTodo = useCallback((text: string) => {
    const trimmed = text.trim()
    if (trimmed) dispatch({ type: 'ADD', text: trimmed })
  }, [])

  const toggleTodo = useCallback((id: string) => dispatch({ type: 'TOGGLE', id }), [])
  const deleteTodo = useCallback((id: string) => dispatch({ type: 'DELETE', id }), [])
  const clearCompleted = useCallback(() => dispatch({ type: 'CLEAR_COMPLETED' }), [])
  const setFilter = useCallback((filter: FilterType) => dispatch({ type: 'SET_FILTER', filter }), [])

  const filteredTodos = state.todos.filter(t => {
    if (state.filter === 'active') return !t.completed
    if (state.filter === 'completed') return t.completed
    return true
  })

  const activeCount = state.todos.filter(t => !t.completed).length
  const completedCount = state.todos.filter(t => t.completed).length

  return {
    todos: filteredTodos,
    filter: state.filter,
    activeCount,
    completedCount,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    setFilter,
  }
}
