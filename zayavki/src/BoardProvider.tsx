import { useEffect, useState, type ReactNode } from 'react'
import { BoardContext } from './board'
import type { NewRequest, Status } from './requests'
import { useRequests } from './useRequests'
import { sendRequest } from './notify'

type BoardProviderProps = {
  children: ReactNode
}

function BoardProvider({ children }: BoardProviderProps) {
  const { requests, loading, error, retry, add, next, remove } = useRequests()
  const [notice, setNotice] = useState('')

  const newCount = requests.filter((r) => r.status === 'Новая').length

  useEffect(() => {
    document.title = `Новых: ${newCount} · Доска заявок`
  }, [newCount])

  useEffect(() => {
    if (notice === '') {
      return
    }
    const timer = setTimeout(() => setNotice(''), 5000)
    return () => clearTimeout(timer)
  }, [notice])

  async function handleNext(id: string, status: Status) {
    try {
      await next(id, status)
    } catch (e) {
      setNotice((e as Error).message)
    }
  }

  async function handleAdd(data: NewRequest) {
    try {
      const created = await add(data)
      setNotice('Заявка добавлена. Отправляем уведомление…')
      const sent = await sendRequest(created)
      if (sent) {
        setNotice('Заявка добавлена, уведомление отправлено.')
      } else {
        setNotice('Заявка добавлена, но уведомление не отправлено: сервер автоматизации недоступен.')
      }
    } catch (e) {
      setNotice((e as Error).message)
    }
  }

  async function handleRemove(id: string) {
    try {
      await remove(id)
    } catch (e) {
      setNotice((e as Error).message)
    }
  }

  const board = { requests, loading, error, newCount, notice, retry, handleAdd, handleNext, handleRemove }

  return <BoardContext value={board}>{children}</BoardContext>
}

export default BoardProvider