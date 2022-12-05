import { Link } from 'react-router-dom'
import { useGetQuery } from '../hooks/useGetQuery'

interface PaginationProps {
  pagesQTY: number
}

export function Pagination ({ pagesQTY }: PaginationProps) {
  const query = useGetQuery('page')
  const pages: number[] = []

  for (let i = 1; i <= pagesQTY; i++) {
    pages.push(i)
  }

  return (
    <nav className='mt-8'>
      <ul className='h-12 w-full flex justify-center items-center gap-4'>
        {pages.map(page => (
          <li className='h-full flex justify-center items-center' key={page}>
            <Link className={`h-full flex items-center justify-center  px-4 rounded-md transition-colors duration-300 hover:bg-violet-500 ${query === page ? 'bg-violet-500' : 'bg-slate-800'}`}
              to={`/orders?page=${page}`}
            >
              {page}
            </Link>
          </li>
        )
        )}
      </ul>
    </nav>
  )
}
