import { WordTokenizer } from 'natural';
import Translation from '../models/Translation';
import { ResponseOptions } from '../models/ResponseOptions';

export default class TranslationFormatter {
  private tokenizer: WordTokenizer;

  constructor() {
    this.tokenizer = new WordTokenizer();
  }

  public formatter(format: ResponseOptions, phrases: string[]) {
    switch (format) {
      case ResponseOptions.JSON:
        return this.convertToJson(phrases);
      case ResponseOptions.TEXT:
        return this.convertToText(phrases);
      case ResponseOptions.ARB:
        return;
    }
  }

  convertToText(phrases: string[]): string {
    const translations = this.generateTranslation(phrases);
    const result = this.formatToText(translations);

    return result;
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

  public formatToText(translations: Translation[]): string {
    let stringResult = '';
    for (let index = 0; index < translations.length; index++) {
      stringResult = stringResult + `"${translations[index].name}": "${translations[index].value}"`;
      if (index < translations.length - 1) {
        stringResult = stringResult + ',\r\n';
      }
    }
    return stringResult;
  }

  public formatWords(words: string[]): string {
    const [firstWord, ...restWords] = words;
    const formattedWords = [
      firstWord.toLowerCase(),
      ...restWords.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    ];
    return formattedWords.join('');
  }
}
