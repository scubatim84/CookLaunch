const toTitleCase = (name) => {
  const words = name.split(' ');
  const formattedWords = words.map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase());

  return formattedWords.join(' ');
};

export default toTitleCase;
