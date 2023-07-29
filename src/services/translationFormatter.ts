import { WordTokenizer } from 'natural';
import Translation from '../models/Translation';

export default class TranslationFormatter {
  private tokenizer: WordTokenizer;

  constructor() {
    this.tokenizer = new WordTokenizer();
  }

  convertToJson(phrases: string[]): JSON {
    const translations = this.generateTranslation(phrases);
    const objectJson = JSON.stringify(translations);

    return JSON.parse(objectJson);
  }

  public generateTranslation(phrases: string[]): Translation[] {
    let names = phrases.map((phrase) => this.convertToVariable(phrase));
    let translations = [];

    for (let index = 0; index < names.length; index++) {
      translations.push(new Translation(names[index], phrases[index]));
    }

    return translations;
  }

  public convertToVariable(phrase: string): string {
    const words = this.tokenizer.tokenize(phrase) || [];

    return this.formatWords(words);
  }

  private formatWords(words: string[]): string {
    const [firstWord, ...restWords] = words;
    const formattedWords = [
      firstWord.toLowerCase(),
      ...restWords.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
      ),
    ];
    return formattedWords.join('');
  }
}
