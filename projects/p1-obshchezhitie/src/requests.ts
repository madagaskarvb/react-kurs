export type Status = 'Новая' | 'В работе' | 'Готово'

export type Category = 'Электрика' | 'Мебель' | 'Сантехника' | 'Интернет'

export type RequestItem = {
  id: number
  title: string
  room: string
  category: Category
  details: string
  status: Status
}

export type NewRequest = {
  title: string
  room: string
  category: Category
  details: string
}

export const initialRequests: RequestItem[] = [
  {
    id: 1,
    title: 'Не работает интернет',
    room: '214',
    category: 'Интернет',
    details: 'Нету подключения к интернету, сигнал просто отсутствует.',
    status: 'Новая',
  },
  {
    id: 2,
    title: 'Грязная вода в душе',
    room: '305',
    category: 'Сантехника',
    details: 'Из душа льется коричневая вода, страшно под ней мытся.',
    status: 'В работе',
  },
  {
    id: 3,
    title: 'Туалет забился',
    room: '112',
    category: 'Сантехника',
    details: 'Туалет забит, нажатие на слив не помогает, пришлите кого-то СРОЧНО!',
    status: 'Готово',
  },
  {
    id: 4,
    title: 'Стул сломался',
    room: '214',
    category: 'Мебель',
    details: 'Ножка у стула сломалась, нужно обратно приклеить ножку или заменить стул',
    status: 'Новая',
  },
  {
    id: 5,
    title: 'Розетка убивает устройства',
    room: '118',
    category: 'Электрика',
    details: 'Поставил я свой телефон на зарядку, а он начал дыметь',
    status: 'Новая',
  },
]

export function nextStatus(status: Status): Status {
  if (status === 'Новая') {
    return 'В работе'
  }
  return 'Готово'
}