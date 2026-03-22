import { useState } from 'react'
import styles from './TodoInput.module.css'

type Props = {
  onAdd: (text: string) => void
}

export function TodoInput({ onAdd }: Props) {
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(value)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="할 일을 입력하세요..."
        className={styles.input}
        aria-label="새 할 일 입력"
      />
      <button type="submit" className={styles.button} disabled={!value.trim()}>
        추가
      </button>
    </form>
  )
}
