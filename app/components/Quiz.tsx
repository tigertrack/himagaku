"use client"
import KanjiDictionary from "../functions/KanjiDictionary"
import useQuizLogic from "../functions/useQuizLogic"
import OptionItem from "./OptionItem"
const Quiz = ({level, deckid}: any) => {
  let kanjis = KanjiDictionary.getKanjiByLevel(level).slice(deckid*20, (deckid*20)+20)
  const [currentQuestion, options, checkAnswer, score, isLoading, previouslySelected] = useQuizLogic(kanjis)
  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col gap-3 mt-32">
        <div className="flex gap-3 justify-center flex-wrap">
          {currentQuestion.readings_on.map((reading: any, index: number) => 
            <span key={index} className="bg-sky-800 py-1 px-3 rounded">{reading}</span>
          )}
          {currentQuestion.readings_kun.map((reading: any, index: number) => 
            <span key={index} className="bg-sky-600 py-1 px-3 rounded">{reading}</span>
          )}
        </div>
        <div className="flex gap-3 justify-center flex-wrap">
          <span>{currentQuestion.meanings.join(', ')}</span>
          {/* {currentQuestion.meanings.map((meaning: string, index: number) => 
            <span key={index}>{meaning}</span>
          )} */}
        </div>
      </div>
      <div className="grid grid-cols-4 grid-rows-2 gap-3 my-5 absolute inset-x-4 bottom-0 -z-10">
        {options.map((option: any, index: number) => 
        <OptionItem key={index} isLoading={isLoading} previouslySelected={previouslySelected}
          option={option} currentQuestion={currentQuestion} submitAnswer={checkAnswer} />
        )}
      </div>
    </div>
  )
}

export default Quiz