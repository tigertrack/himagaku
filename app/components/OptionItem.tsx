const OptionItem = ({isLoading, submitAnswer, option, currentQuestion, previouslySelected}: any) => {
  const selectOption = (selectedOption: any) => (e: any) => {
    if(isLoading) return
    submitAnswer(selectedOption)
  }

  const optionColor = () => {
    if(isLoading && option.kanji == currentQuestion.kanji) return 'bg-teal-600'
    if(isLoading && option.kanji != currentQuestion.kanji && option.kanji == previouslySelected) return 'bg-rose-700'
    return 'bg-zinc-700 '
  }
  return (
    <div onClick={selectOption(option)} 
      className={`text-center p-5 rounded ${optionColor()} hover:bg-zinc-600 hover:cursor-pointer`}>
        {option.kanji}
    </div>
  )
}

export default OptionItem