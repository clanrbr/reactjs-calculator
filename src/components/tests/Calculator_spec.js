import React from 'react'
import { shallow } from 'enzyme'
import Calculator from '../Calculator'
import OperationButtonContainer from '../OperationButtonContainer'
import InputContainer from '../InputContainer'
import ResultContainer from '../ResultContainer'
import EqualButtonContainer from '../EqualButtonContainer'
import SaveButtonContainer from '../SaveButtonContainer'
import MemoryResultsContainer from '../MemoryResultsContainer'

const sandbox = sinon.createSandbox()
describe('Calculator Component', () => {
  let wrapper

  describe('Default behaviour', () => {
    beforeEach(() => {
      wrapper = shallow(<Calculator />)
    })

    it('should render OperationButtonContainer', () => {
      expect(wrapper.find(OperationButtonContainer)).to.have.length(1)
    })

    it('should render InputContainer', () => {
      expect(wrapper.find(InputContainer)).to.have.length(2)
    })

    it('should render ResultContainer', () => {
      expect(wrapper.find(ResultContainer)).to.have.length(1)
    })

    it('should render SaveButtonContainer', () => {
      expect(wrapper.find(SaveButtonContainer)).to.have.length(1)
    })

    it('should render MemoryResultsContainer', () => {
      expect(wrapper.find(MemoryResultsContainer)).to.have.length(1)
    })
  })

  describe('_calculateResult', () => {
    beforeEach(() => {
      wrapper = shallow(<Calculator />)
      wrapper.setState({
        inputOne: 4,
        inputTwo: 3,
        operation: 'minus'
      })
    })

    it('should return correct calculation', () => {
      expect(wrapper.instance()._calculateResult()).to.be.equal(1)
    })
  })

  describe('_updateResult', () => {
    context('when one of the input is not a number',() => {
      beforeEach(() => {
        wrapper = shallow(<Calculator />)
        wrapper.setState({
          inputOne: '',
          inputTwo: 3,
          operation: 'minus'
        })
      })

      it('should return error and disable button', () => {
        wrapper.instance()._updateResult()
        expect(wrapper.state('result')).to.be.equal('Please enter valid numbers')
        expect(wrapper.state('enableSaveButton')).to.be.false()
      })
    })

    context('when division by zero', () => {
      beforeEach(() => {
        wrapper = shallow(<Calculator />)
        wrapper.setState({
          inputOne: 4,
          inputTwo: 0,
          operation: 'divide'
        })
      })
        
      it('should return error and disable button', () => {
        wrapper.instance()._updateResult()
        expect(wrapper.state('result')).to.be.equal('Forbidden operation: division by zero')
        expect(wrapper.state('enableSaveButton')).to.be.false()
      })
    })

    context('when there is result and no results in memory', () => {
      beforeEach(() => {
        wrapper = shallow(<Calculator />)
        wrapper.setState({
          inputOne: 4,
          inputTwo: 3,
          operation: 'minus'
        })
      })
        
      it('should return the result and enable the button as there is no results in memory', () => {
        wrapper.instance()._updateResult()
        expect(wrapper.state('result')).to.be.equal(1)
        expect(wrapper.state('enableSaveButton')).to.be.true()
      })
    })

    context('when there is result same as last result', () => {
      beforeEach(() => {
        wrapper = shallow(<Calculator />)
        wrapper.setState({
          inputOne: 4,
          inputTwo: 3,
          operation: 'minus',
          savedResults:[{
            inputOne: 4,
            inputTwo: 3,
            operation: 'minus',
            result: 1
          }]
        })
      })
        
      it('should return the result and disable the button', () => {
        wrapper.instance()._updateResult()
        expect(wrapper.state('result')).to.be.equal(1)
        expect(wrapper.state('enableSaveButton')).to.be.false()
      })
    })
  })

  describe('_handleButtonClick', () => {
    context('when clicked same operator', () => {
      beforeEach(() => {
        wrapper = shallow(<Calculator />)
        wrapper.setState({
          inputOne: 4,
          inputTwo: 3,
          operation: 'plus'
        })
      })

      it('should return correct calculation', () => {
        let fakeEvent = {
          currentTarget: {
            getAttribute: () => {
              return 'plus'
            }
          }
        }

        wrapper.instance()._handleButtonClick(fakeEvent)
        expect(wrapper.state('operation')).to.be.equal('plus')
      })
    })

    context('when passed wrong operator', () => {
      beforeEach(() => {
        wrapper = shallow(<Calculator />)
        wrapper.setState({
          inputOne: 4,
          inputTwo: 3,
          operation: 'plus'
        })
      })

      it('should return correct calculation', () => {
        let fakeEvent = {
          currentTarget: {
            getAttribute: () => {
              return 'cos'
            }
          }
        }

        wrapper.instance()._handleButtonClick(fakeEvent)
        expect(wrapper.state('operation')).to.be.equal('plus')
      })
    })

    context('when clicked different operator', () => {
      beforeEach(() => {
        wrapper = shallow(<Calculator />)
        wrapper.setState({
          inputOne: 4,
          inputTwo: 3,
          operation: 'plus'
        })
      })

      it('should return correct calculation', () => {
        let fakeEvent = {
          currentTarget: {
            getAttribute: () => {
              return 'minus'
            }
          }
        }

        wrapper.instance()._handleButtonClick(fakeEvent)
        expect(wrapper.state('operation')).to.be.equal('minus')
      })
    })
  })

  describe('_handleNumberChange', () => {
    context('when number is changed but passed wrong name', () => {
      beforeEach(() => {
        wrapper = shallow(<Calculator />)
        wrapper.setState({
          inputOne: 4,
          inputTwo: 3,
          operation: 'plus'
        })
      })

      it('should state', () => {
        let fakeEvent = {
          currentTarget: {
            name: 'inputThree',
            value: 3
          }
        }

        expect(wrapper.instance()._handleNumberChange(fakeEvent)).to.be.null()
        expect(wrapper.state('inputOne')).to.be.equal(4)
        expect(wrapper.state('inputTwo')).to.be.equal(3)
      })
    })
  })

  describe('_handleNumberChange', () => {
    context('when number is changed but passed wrong name', () => {
      beforeEach(() => {
        wrapper = shallow(<Calculator />)
        wrapper.setState({
          inputOne: 4,
          inputTwo: 3,
          operation: 'plus'
        })
      })

      it('should not change inputs', () => {
        let fakeEvent = {
          currentTarget: {
            name: 'inputThree',
            value: 3
          }
        }

        expect(wrapper.instance()._handleNumberChange(fakeEvent)).to.be.null()
        expect(wrapper.state('inputOne')).to.be.equal(4)
        expect(wrapper.state('inputTwo')).to.be.equal(3)
      })
    })

    context('when number is changed but empty text', () => {
      let fakeEvent
      beforeEach(() => {
        fakeEvent = {
          currentTarget: {
            name: 'inputOne',
            value: ''
          }
        }

        wrapper = shallow(<Calculator />)
        wrapper.setState({
          inputOne: 4,
          inputTwo: 3,
          operation: 'plus'
        })
      })

      it('should change inputOne with empty string', () => {
        wrapper.instance()._handleNumberChange(fakeEvent)
        expect(wrapper.state('inputOne')).to.be.equal('')
      })

      it('should change result with error string', () => {
        wrapper.instance()._handleNumberChange(fakeEvent)
        expect(wrapper.state('result')).to.be.equal('Please enter valid numbers')
      })
    })

    context('when number is changed but text', () => {
      let fakeEvent
      beforeEach(() => {
        fakeEvent = {
          currentTarget: {
            name: 'inputOne',
            value: 'text'
          }
        }

        wrapper = shallow(<Calculator />)
        wrapper.setState({
          inputOne: 4,
          inputTwo: 3,
          operation: 'plus'
        })
      })

      it('should change inputOne with empty string', () => {
        wrapper.instance()._handleNumberChange(fakeEvent)
        expect(wrapper.state('inputOne')).to.be.equal('text')
      })

      it('should change result with error string', () => {
        wrapper.instance()._handleNumberChange(fakeEvent)
        expect(wrapper.state('result')).to.be.equal('Please enter valid numbers')
      })
    })

    context('when number is changed with new number', () => {
      let fakeEvent
      beforeEach(() => {
        fakeEvent = {
          currentTarget: {
            name: 'inputTwo',
            value: 9
          }
        }

        wrapper = shallow(<Calculator />)
        wrapper.setState({
          inputOne: 4,
          inputTwo: 3,
          operation: 'plus'
        })
      })

      it('should change inputTwo with the new number', () => {
        wrapper.instance()._handleNumberChange(fakeEvent)
        expect(wrapper.state('inputTwo')).to.be.equal(9)
      })

      it('should change the new result', () => {
        wrapper.instance()._handleNumberChange(fakeEvent)
        expect(wrapper.state('result')).to.be.equal(13)
      })
    })
  })

  describe('_shouldEnableSaveButton', () => {
    context('enables button', () => {
      beforeEach(() => {
        wrapper = shallow(<Calculator />)
        wrapper.setState({
          inputOne: 4,
          inputTwo: 3,
          operation: 'plus',
          result: 7
        })
      })

      it('should return correct calculation', () => {
        expect(wrapper.instance()._shouldEnableSaveButton()).to.be.true()
      })
    })
  })

  describe('_saveCalculation', () => {
    context('when it does not meet the criteria', () => {
      beforeEach(() => {
        wrapper = shallow(<Calculator />)
        wrapper.setState({
          inputOne: 4,
          inputTwo: 3,
          operation: 'plus',
          result: 7
        })

        sandbox.stub(wrapper.instance(), '_shouldEnableSaveButton').returns(false)
      })

      afterEach(() => {
        sandbox.restore()
      })

      it('should not save in memory', () => {
        expect(wrapper.instance()._saveCalculation()).to.be.null()
      })
    })

    context('should save in memory', () => {
      beforeEach(() => {
        wrapper = shallow(<Calculator />)
        wrapper.setState({
          inputOne: 4,
          inputTwo: 3,
          operation: 'plus',
          result: 7
        })

        sandbox.stub(wrapper.instance(), '_shouldEnableSaveButton').returns(true)
      })

      afterEach(() => {
        sandbox.restore()
      })

      it('should save in memory', () => {
        wrapper.instance()._saveCalculation()
        expect(wrapper.state('savedResults')).to.be.deep.equal([{
          inputOne: 4,
          inputTwo: 3,
          operation: 'plus',
          result: 7
        }])
      })

      it('should disable button', () => {
        wrapper.instance()._saveCalculation()
        expect(wrapper.state('enableSaveButton')).to.be.false()
      })
    })
  })

  describe('_loadCalculation', () => {
    context('when there is no savedResult', () => {
      beforeEach(() => {
        wrapper = shallow(<Calculator />)
        wrapper.setState({
          inputOne: 4,
          inputTwo: 3,
          operation: 'plus',
          savedResults: []
        })
      })

      it('should return correct calculation', () => {
        let fakeEvent = {
          currentTarget: {
            getAttribute: () => {
              return 2
            }
          }
        }

        expect(wrapper.instance()._loadCalculation(fakeEvent)).to.be.null()
        expect(wrapper.state('operation')).to.be.equal('plus')
      })
    })

    context('when there is savedResult', () => {
      let fakeEvent
      beforeEach(() => {
        fakeEvent = {
          currentTarget: {
            getAttribute: () => {
              return 0
            }
          }
        }

        wrapper = shallow(<Calculator />)
        wrapper.setState({
          inputOne: 4,
          inputTwo: 3,
          operation: 'plus',
          savedResults: [{
            inputOne: 6,
            inputTwo: 2,
            operation: 'times',
            result: 12
          }]
        })
      })

      it('should return correct calculation', () => {
        wrapper.instance()._loadCalculation(fakeEvent)
        expect(wrapper.state('operation')).to.be.equal('times')
      })

      it('should return correct inputOne', () => {
        wrapper.instance()._loadCalculation(fakeEvent)
        expect(wrapper.state('inputOne')).to.be.equal(6)
      })

      it('should return correct inputTwo', () => {
        wrapper.instance()._loadCalculation(fakeEvent)
        expect(wrapper.state('inputTwo')).to.be.equal(2)
      })

      it('should return correct result', () => {
        wrapper.instance()._loadCalculation(fakeEvent)
        expect(wrapper.state('result')).to.be.equal(12)
      })
    })
  })
})
