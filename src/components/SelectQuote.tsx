interface SelectQuoteProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  defaultQuote: string
}

export function SelectQuote ({ defaultQuote, ...props }: SelectQuoteProps) {
  return (
    <select {...props} name="selectQuote" id="selectQuote" defaultValue={defaultQuote} className='w-52 bg-slate-700 border border-gray-600 text-gray-300 text-center text-sm rounded-md focus:ring-violet-500 focus:border-violet-500 outline-none px-4 py-1'>
      <option value="FAVORITES">Favorites</option>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="BNB">BNB</option>
      <option value="ETH">ETH</option>
      <option value="BTC">BTC</option>
      <option value="USDT">USDT</option>
    </select>
  )
}
