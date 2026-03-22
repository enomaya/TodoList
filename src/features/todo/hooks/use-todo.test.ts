import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useTodo } from './use-todo'

describe('useTodo', () => {
  it('초기 상태는 빈 목록이다', () => {
    const { result } = renderHook(() => useTodo())
    expect(result.current.todos).toHaveLength(0)
    expect(result.current.activeCount).toBe(0)
  })

  it('할 일을 추가하면 목록에 나타난다', () => {
    const { result } = renderHook(() => useTodo())
    act(() => result.current.addTodo('운동하기'))
    expect(result.current.todos).toHaveLength(1)
    expect(result.current.todos[0].text).toBe('운동하기')
    expect(result.current.activeCount).toBe(1)
  })

  it('빈 문자열은 추가되지 않는다', () => {
    const { result } = renderHook(() => useTodo())
    act(() => result.current.addTodo('   '))
    expect(result.current.todos).toHaveLength(0)
  })

  it('할 일을 완료 처리할 수 있다', () => {
    const { result } = renderHook(() => useTodo())
    act(() => result.current.addTodo('독서'))
    act(() => result.current.toggleTodo(result.current.todos[0].id))
    expect(result.current.todos[0].completed).toBe(true)
    expect(result.current.activeCount).toBe(0)
    expect(result.current.completedCount).toBe(1)
  })

  it('할 일을 삭제할 수 있다', () => {
    const { result } = renderHook(() => useTodo())
    act(() => result.current.addTodo('청소'))
    act(() => result.current.deleteTodo(result.current.todos[0].id))
    expect(result.current.todos).toHaveLength(0)
  })

  it('완료 항목만 일괄 삭제할 수 있다', () => {
    const { result } = renderHook(() => useTodo())
    act(() => { result.current.addTodo('A'); result.current.addTodo('B') })
    act(() => result.current.toggleTodo(result.current.todos[0].id))
    act(() => result.current.clearCompleted())
    expect(result.current.todos).toHaveLength(1)
    expect(result.current.todos[0].text).toBe('B')
  })

  it('필터를 변경하면 해당 항목만 표시된다', () => {
    const { result } = renderHook(() => useTodo())
    act(() => { result.current.addTodo('A'); result.current.addTodo('B') })
    act(() => result.current.toggleTodo(result.current.todos[0].id))
    act(() => result.current.setFilter('completed'))
    expect(result.current.todos).toHaveLength(1)
    act(() => result.current.setFilter('active'))
    expect(result.current.todos).toHaveLength(1)
  })
})
