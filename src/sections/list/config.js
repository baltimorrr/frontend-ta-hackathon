export const TABLE_DESKTOP_HEAD = [
  { id: 'title', label: 'Title', align: 'left' },
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'email', label: 'Email', align: 'left' },
  { id: 'phone', label: 'Phone', align: 'left' },
  { id: 'createdAt', label: 'Created At', align: 'left' },
]

export const mockData = [
  ...Array(8)
    .fill({})
    .map((it, idx) => ({
      id: idx,
      name: 'Minh',
      email: 'minhtest@gmail.com',
      address: 'Hanoi',
    })),
]
