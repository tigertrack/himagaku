"use client"
import { redirect } from 'next/navigation'
import KanjiDictionary from '@/src/functions/KanjiDictionary'
import KanjiListSelection from '@/src/components/KanjiListSelection'
import levels from '@/src/constants/level'
import { useRouter } from 'next/navigation';

const Page = ({params}: any) => {
  if(!params.level || ["1", "2", "3", "4", "5"].includes(params.level) == false) redirect('/')
  let level = params.level
  let kanjis = KanjiDictionary.getKanjiByLevel(level)
  const router = useRouter()
  const selectedDeck = (id: any) => {
    router.push(`/level/${level}/quiz/${id}`)
  }
  return (
    <div className='px-4 flex flex-col items-center gap-4'>
      <div className="flex justify-between items-center w-full sm:w-5/6 mt-4">
        <p className="text-2xl sm:text-4xl">N{level} - {levels[level]}</p>
        <p className="text-xs text-zinc-300 sm:text-base">{kanjis.length} Kanji in total</p>
      </div>
      <div className="w-full sm:w-5/6">
        <KanjiListSelection kanjis={kanjis} splitCount={20} selectedDeck={selectedDeck} />
      </div>
    </div>
  )
}

export default Page