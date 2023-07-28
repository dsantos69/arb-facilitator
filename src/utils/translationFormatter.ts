import { WordTokenizer } from 'natural';

export default class TranslationFormatter {
  private tokenizer: WordTokenizer;

  constructor() {
    this.tokenizer = new WordTokenizer();
  }

  convertToVariable(phrase: string) {
    const words = this.tokenizer.tokenize(phrase) || [];

    return this.formatWords(words);
  }

  formatWords(words: Array<string>): string {
    const [firstWord, ...restWords] = words;
    const formattedWords = [
      firstWord.toLowerCase(),
      ...restWords.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ),
    ];
    return formattedWords.join('');
  }
}
