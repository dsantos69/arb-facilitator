import { expect } from 'chai';
import { before, describe, it } from 'mocha';
import TranslationFormatter from '../../src/services/translationFormatter';
import Translation from '../../src/models/Translation';

describe('TranslationFormatter Suite Tests', () => {
  let translationFormatter: TranslationFormatter;

  before(() => {
    translationFormatter = new TranslationFormatter();
  });

  it('should format a phrase in a variable', () => {
    const phrase = 'Hello world';
    const result = translationFormatter.convertToVariable(phrase);

    expect(result).equal('helloWorld');
  });

  it('should format a list of phrases', () => {
    const phrases = [
      'The sun is shining brightly.',
      'I love eating ice cream.',
      'The cat is sleeping peacefully.',
    ];

    const result = phrases.map((phrase) =>
      translationFormatter.convertToVariable(phrase),
    );

    const expected = [
      'theSunIsShiningBrightly',
      'iLoveEatingIceCream',
      'theCatIsSleepingPeacefully',
    ];

    expect(result).to.deep.equal(expected);
  });

  it('should generate a list of translations', () => {
    const phrases = [
      'The sun is shining brightly.',
      'I love eating ice cream.',
      'The cat is sleeping peacefully.',
    ];

    const result = translationFormatter.generateTranslation(phrases);

    const expected = [
      new Translation('theSunIsShiningBrightly', phrases[0]),
      new Translation('iLoveEatingIceCream', phrases[1]),
      new Translation('theCatIsSleepingPeacefully', phrases[2]),
    ];

    expect(result).to.deep.equal(expected);
  });

  it('should generate a JSON with list of translations', () => {
    const phrases = [
      'The sun is shining brightly.',
      'I love eating ice cream.',
      'The cat is sleeping peacefully.',
    ];

    const result = translationFormatter.convertToJson(phrases);

    const expected = [
      {
        name: 'theSunIsShiningBrightly',
        value: 'The sun is shining brightly.',
      },
      { name: 'iLoveEatingIceCream', value: 'I love eating ice cream.' },
      {
        name: 'theCatIsSleepingPeacefully',
        value: 'The cat is sleeping peacefully.',
      },
    ];

    expect(result).to.deep.equal(expected);
  });
});
