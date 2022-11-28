interface ErrorMessageProps {
  title: string
}
export function ErrorMessage ({ title }: ErrorMessageProps) {
  return (
    <div className='w-full h-full flex items-center '>
      <span className='w-full flex py-2 px-4 bg-red-300 text-red-800 rounded-md'>
        {title}
      </span>
    </div>
  )
}
