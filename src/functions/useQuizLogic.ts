'use client';
import { useEffect, useState, useRef } from 'react';

const getOptions = (kanjiList: any[], questionIndex: any) => {
  const wrongAnswers = kanjiList
    .filter((kanji: any) => kanji.kanji != kanjiList[questionIndex].kanji)
    .sort(() => 0.5 - Math.random())
    .slice(-7);
  const options = [...wrongAnswers, kanjiList[questionIndex]].sort(
    () => 0.5 - Math.random(),
  );
  return options;
};

const useQuizLogic = (
  kanjiList: any,
): [any, any[], (selectedOption: any) => void, any, boolean, string] => {
  let score = useRef(0);
  let questionIndex = useRef(0);
  let previousSelection = useRef('');
  const kanjiRef = useRef([]);
  kanjiRef.current = kanjiList;
  const [options, setOptions] = useState(<any[]>[]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setOptions(getOptions(kanjiRef.current, questionIndex.current));
  }, []);

  const checkAnswer = (selectedOption: any): void => {
    previousSelection.current = selectedOption.kanji;
    if (kanjiList[questionIndex.current].kanji == selectedOption.kanji)
      score.current++;
    setIsLoading(true);
    setTimeout(() => {
      questionIndex.current++;
      setOptions(getOptions(kanjiRef.current, questionIndex.current));
      setIsLoading(false);
    }, 1500);
  };

  return [
    kanjiList[questionIndex.current],
    options,
    checkAnswer,
    score,
    isLoading,
    previousSelection.current,
  ];
};

export default useQuizLogic;
