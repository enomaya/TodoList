import styles from './TodoItem.module.css'
import type { Todo } from '../types'

type Props = {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <li className={`${styles.item} ${todo.completed ? styles.completed : ''}`}>
      <button
        className={styles.checkbox}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? '완료 취소' : '완료 처리'}
        aria-pressed={todo.completed}
      >
        {todo.completed && <span className={styles.checkmark}>✓</span>}
      </button>
      <span className={styles.text}>{todo.text}</span>
      <button
        className={styles.deleteButton}
        onClick={() => onDelete(todo.id)}
        aria-label={`"${todo.text}" 삭제`}
      >
        ✕
      </button>
    </li>
  )
}
