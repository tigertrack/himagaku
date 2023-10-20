import KanjiList from '../db/kanji-list.json';
const KanjiDictionary = {
  getKanjiByLevel: (level: number): any => {
    return level && level >= 1 && level <= 5
      ? [...KanjiList].filter(kanji => kanji.jlpt_new == level)
      : [];
  },
  getOptions: (correctOption: any): any[] => {
    const filterNItem = (items: any[], n: number, callback: any): any[] => {
      let filteredItems = [];
      let count = 0;
      for (let index = 0; index < items.length; index++) {
        if (count < n && callback(items[index])) {
          filteredItems.push(items[index]);
          count++;
        }
      }
      return filteredItems;
    };

    let kanjiListCopy = [...KanjiList];

    return filterNItem(
      kanjiListCopy,
      7,
      (item: any) => item.kanji != correctOption.kanji,
    );
  },
};

export default KanjiDictionary;
