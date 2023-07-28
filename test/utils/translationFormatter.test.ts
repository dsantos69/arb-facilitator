import { expect } from 'chai';
import { before, describe, it } from 'mocha';
import TranslationFormatter from '../../src/utils/translationFormatter';

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
});
