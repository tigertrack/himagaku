import React from 'react'

const KanjiListSelection = ({kanjis, splitCount, selectedDeck}: any) => {
  const kanjiSets = (kanjis: any, splitCount: number) => {
      const result: any[] = []
      for (let index = 0; index < kanjis.length; index+=splitCount) {
          result.push(kanjis.slice(index, index + splitCount));
      }
      return result
  }
  return (
    <div className="grid gap-4 " style={{gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))'}}>
        {kanjiSets(kanjis, splitCount).map((set: any, index: number) => (
            <div className="p-4 bg-zinc-700 rounded flex justify-between" key={index}>
                <div className="flex items-center gap-3">
                    <div className="text-4xl" >{set[0].kanji}</div>
                    <div className="flex flex-col gap-0 justify-items-center">
                        <p className="text-base leading-tight">Set {index}</p>
                        <span className="text-xs text-zinc-400 leading-tight">{splitCount} Kanji</span>
                    </div>
                </div>
                <button onClick={() => selectedDeck(index)} className="flex items-center bg-zinc-600 px-3 rounded hover:bg-zinc-500">Begin</button>
            </div>
        ))}
    </div>
  )
}

export default KanjiListSelection