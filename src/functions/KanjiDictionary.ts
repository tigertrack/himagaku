import KanjiList from '../db/kanji-list.json'
const KanjiDictionary = {
  getKanjiByLevel: (level: number): any => {
    return (level && level >= 1 && level <= 5) ? 
      [...KanjiList].filter(kanji => kanji.jlpt_new == level) : []
  }
}

export default KanjiDictionary