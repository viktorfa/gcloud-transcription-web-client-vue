export const annotateWords = words => {
  return words.map(({
    word,
    startTime,
    endTime,
  }, i, array) => {
    const startIndex =
      array.slice(0, i).reduce((acc, {
        word: w
      }) => {
        return acc + w.length;
      }, 0) + i;
    const endIndex = startIndex + word.length;
    return {
      word,
      startTime,
      endTime,
      startIndex,
      endIndex,
      index: i
    };
  });
};
export const findWordByTime = (time, words, delta = 0.2) => {
  return words.find(
    ({
      startTime,
      endTime
    }) =>
    parseFloat(startTime) < time + delta && parseFloat(endTime) > time - delta
  );
};
export const findWordByCursorIndex = (index, words) => {
  return (
    words.find(
      ({
        startIndex,
        endIndex
      }) => startIndex <= index && endIndex >= index
    ) || words[words.length - 1]
  );
};

export const wordIsCurrentTime = (word, time, delta = 0.2) => {
  return (
    parseFloat(word.startTime) < time + delta &&
    parseFloat(word.endTime) > time - delta
  );
}

export const isEditTextEvent = (ops) => ops.length > 1 && ops[0].retain && (ops[1].insert || ops[1].delete)