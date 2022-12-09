import { Link } from 'react-router-dom'

interface PaginationProps {
  pagesQTY: number
  path: string
  query: number
}

export function Pagination ({ pagesQTY, path, query }: PaginationProps) {
  const pages: number[] = []

  for (let i = 1; i <= pagesQTY; i++) {
    pages.push(i)
  }

  return (
    <nav className='mt-4'>
      <ul className='h-12 w-full flex justify-center items-center gap-2'>
        {pages.map(page => (
          <li className='h-full flex justify-center items-center' key={page}>
            <Link className={`h-full flex items-center justify-center px-4 rounded-md transition-colors duration-300 hover:bg-violet-600 ${query === page ? 'bg-violet-700' : 'bg-slate-800'}`}
              to={`/${path}?page=${page}`}
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
