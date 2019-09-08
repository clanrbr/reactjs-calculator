import { checkInputForNumber, doMath, roundUp, compareRecords } from '../utils'

describe('utils tests', () => {
  describe('checkInputForNumber', () => {
    it('it should return true for number', () => {
      expect(checkInputForNumber(1)).to.be.true()
    })

    it('it should return false for non number', () => {
      expect(checkInputForNumber('text')).to.be.false()
    })

    it('it should return false for non number', () => {
      expect(checkInputForNumber(isNaN)).to.be.false()
    })
  })

  describe('roundUp', () => {
    it('it should roundUp', () => {
      expect(roundUp(0.33432)).to.be.equal(0.33)
    })
  })

  describe('doMath', () => {
    context('when the operation is plus', () => {
      it('it should correct result', () => {
        expect(doMath({ inputOne: 4, inputTwo: 3, operation: 'plus' })).to.be.equal(7)
      })
    })

    context('when the operation is minus', () => {
      it('it should correct result', () => {
        expect(doMath({ inputOne: 4, inputTwo: 3, operation: 'minus' })).to.be.equal(1)
      })
    })

    context('when the operation is times', () => {
      it('it should correct result', () => {
        expect(doMath({ inputOne: 4, inputTwo: 3, operation: 'times' })).to.be.equal(12)
      })
    })

    context('when the operation is divide', () => {
      it('it should correct result', () => {
        expect(doMath({ inputOne: 4, inputTwo: 3, operation: 'divide' })).to.be.equal(1.33)
      })
    })
  })

  describe('roundUp', () => {
    context('when the operation is plus', () => {
      it('it should return correct result', () => {
        expect(doMath({ inputOne: 4, inputTwo: 3, operation: 'plus' })).to.be.equal(7)
      })
    })

    context('when the operation is minus', () => {
      it('it should return correct result', () => {
        expect(doMath({ inputOne: 4, inputTwo: 3, operation: 'minus' })).to.be.equal(1)
      })
    })

    context('when the operation is times', () => {
      it('it should return correct result', () => {
        expect(doMath({ inputOne: 4, inputTwo: 3, operation: 'times' })).to.be.equal(12)
      })
    })

    context('when the operation is divide', () => {
      it('it should return correct result', () => {
        expect(doMath({ inputOne: 4, inputTwo: 3, operation: 'divide' })).to.be.equal(1.33)
      })
    })
  })

  describe('compareRecords', () => {
    const props = {
      savedResults: [{
        inputOne: 4,
        inputTwo: 3,
        operation: 'plus',
        result: 7
      }, {
        inputOne: 5,
        inputTwo: 3,
        operation: 'plus',
        result: 8
      }],
      inputOne: 4,
      inputTwo: 3,
      operation: 'plus',
      result: 7

    }

    context('when it false', () => {
      it('it should false for missing inputOne ', () => {
        expect(compareRecords({...props, inputOne: ''})).to.be.false()
      })

      it('it should false for missing inputTwo ', () => {
        expect(compareRecords({...props, inputTwo: ''})).to.be.false()
      })

      it('it should false for missing result ', () => {
        expect(compareRecords({...props, result: ''})).to.be.false()
      })

      it('it should false matching last record', () => {
        expect(compareRecords({...props, savedResults: [props.savedResults[0]]})).to.be.false()
      })
    })

    context('when it true', () => {
      it('it should true foor non matching last record', () => {
        expect(compareRecords({...props, savedResults: [props.savedResults[1]]})).to.be.true()
      })

      it('it should true for missing savedresults ', () => {
        expect(compareRecords({...props, savedResults: []})).to.be.true()
      })
    })
  })
})
