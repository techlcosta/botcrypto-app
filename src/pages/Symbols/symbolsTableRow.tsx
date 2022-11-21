import { PencilLine } from 'phosphor-react'
import starIcon from '../../assets/star.svg'
import { SymbolsInterface } from './symbols'
import { SymbolsModal } from './symbolsModal'

interface RowProps {
  row: SymbolsInterface
  callback: () => Promise<void>

}

export function SymbolsTableRow ({ row, callback }: RowProps) {
  return (
    <tr className='bg-slate-800 hover:opacity-70'>
      <td className='py-4 px-2 text-center rounded-tl-md rounded-bl-md'>
        <div className='w-full h-full flex justify-center items-center'>{row.symbol}{row.isFavorite && <img className='h-5' src={starIcon}></img>}</div>
      </td>
      <td className='py-4 px-2 text-center'>{row.basePrecision}</td>
      <td className='py-4 px-2 text-center'>{row.quotePrecision}</td>
      <td className='py-4 px-2 text-center'>{row.minNotional}</td>
      <td className='py-4 px-2 text-center'>{row.minLotSize}</td>
      <td className='py-4 px-2 text-center rounded-tr-md rounded-br-md'>
        <SymbolsModal symbol={row} callback={callback}>
          <div id={`edit${row.symbol}`} className='w-full flex justify-center'>
            <i className='px-4 py-2 rounded-md bg-slate-700 transition-all duration-300 motion-safe:hover:scale-110  text-purple-400 cursor-pointer'>
              <PencilLine size={20} weight={'fill'} />
            </i>
          </div>
        </SymbolsModal>
      </td>
    </tr>
  )
}
