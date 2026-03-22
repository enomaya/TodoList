import styles from './TodoFilter.module.css'
import type { FilterType } from '../types'

type Props = {
  filter: FilterType
  activeCount: number
  completedCount: number
  onFilterChange: (filter: FilterType) => void
  onClearCompleted: () => void
}

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '진행 중' },
  { value: 'completed', label: '완료' },
]

export function TodoFilter({ filter, activeCount, completedCount, onFilterChange, onClearCompleted }: Props) {
  return (
    <div className={styles.footer}>
      <span className={styles.count}>{activeCount}개 남음</span>
      <div className={styles.filters} role="group" aria-label="필터">
        {FILTERS.map(f => (
          <button
            key={f.value}
            className={`${styles.filterButton} ${filter === f.value ? styles.active : ''}`}
            onClick={() => onFilterChange(f.value)}
            aria-pressed={filter === f.value}
          >
            {f.label}
          </button>
        ))}
      </div>
      {completedCount > 0 && (
        <button className={styles.clearButton} onClick={onClearCompleted}>
          완료 항목 삭제
        </button>
      )}
    </div>
  )
}
