const toTitleCase = (name) => {
  const words = name.split(' ');
  const formattedWords = [];

  for (var word of words) {
    const newWord = word[0].toUpperCase() + word.slice(1).toLowerCase();
    formattedWords.push(newWord);
  }

  return formattedWords.join(' ');
};

export default toTitleCase;
