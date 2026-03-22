import { useTodo, TodoInput, TodoList, TodoFilter } from './features/todo'
import styles from './App.module.css'

function App() {
  const { todos, filter, activeCount, completedCount, addTodo, toggleTodo, deleteTodo, clearCompleted, setFilter } = useTodo()

  return (
    <div className={styles.page}>
      <main className={styles.card}>
        <h1 className={styles.title}>투두리스트</h1>
        <TodoInput onAdd={addTodo} />
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
        <TodoFilter
          filter={filter}
          activeCount={activeCount}
          completedCount={completedCount}
          onFilterChange={setFilter}
          onClearCompleted={clearCompleted}
        />
      </main>
    </div>
  )
}

export default App
