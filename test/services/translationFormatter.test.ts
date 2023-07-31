import { expect } from 'chai';
import { before, describe, it } from 'mocha';
import { ResponseOptions } from '../../src/models/ResponseOptions';
import Translation from '../../src/models/Translation';
import TranslationFormatter from '../../src/services/translationFormatter';

describe('TranslationFormatter Suite Tests', () => {
  let translationFormatter: TranslationFormatter;

  before(() => {
    translationFormatter = new TranslationFormatter();
  });

  it('should format words in a unique word', () => {
    const words = ['Hello', 'world'];

    const result = translationFormatter.formatWords(words);

    expect(result).equal('helloWorld');
  });

  it('should format a phrase in a variable', () => {
    const phrase = 'Hello world';
    const result = translationFormatter.convertToVariable(phrase);

    expect(result).equal('helloWorld');
  });

  it('should format a list of phrases', () => {
    const phrases = ['The sun is shining brightly.', 'I love eating ice cream.', 'The cat is sleeping peacefully.'];

    const result = phrases.map((phrase) => translationFormatter.convertToVariable(phrase));

    const expected = ['theSunIsShiningBrightly', 'iLoveEatingIceCream', 'theCatIsSleepingPeacefully'];

    expect(result).to.deep.equal(expected);
  });

  it('should generate a list of translations', () => {
    const phrases = ['The sun is shining brightly.', 'I love eating ice cream.', 'The cat is sleeping peacefully.'];

    const result = translationFormatter.generateTranslation(phrases);

    const expected = [
      new Translation('theSunIsShiningBrightly', phrases[0]),
      new Translation('iLoveEatingIceCream', phrases[1]),
      new Translation('theCatIsSleepingPeacefully', phrases[2])
    ];

    expect(result).to.deep.equal(expected);
  });

  it('should generate a JSON with list of translations', () => {
    const phrases = ['The sun is shining brightly.', 'I love eating ice cream.', 'The cat is sleeping peacefully.'];

    const result = translationFormatter.formatter(ResponseOptions.JSON, phrases);

    const expected = [
      {
        name: 'theSunIsShiningBrightly',
        value: 'The sun is shining brightly.'
      },
      { name: 'iLoveEatingIceCream', value: 'I love eating ice cream.' },
      {
        name: 'theCatIsSleepingPeacefully',
        value: 'The cat is sleeping peacefully.'
      }
    ];

    expect(result).to.deep.equal(expected);
  });

  it('should generate a text with list of translations', () => {
    const phrases = ['The sun is shining brightly.', 'I love eating ice cream.', 'The cat is sleeping peacefully.'];

    const response = translationFormatter.formatter(ResponseOptions.TEXT, phrases);

    const expected = `"theSunIsShiningBrightly": "The sun is shining brightly.",\r\n"iLoveEatingIceCream": "I love eating ice cream.",\r\n"theCatIsSleepingPeacefully": "The cat is sleeping peacefully."`;

    expect(response).equal(expected);
  });
});
