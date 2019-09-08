import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import OperationButtonContainer from './OperationButtonContainer'
import InputContainer from './InputContainer'
import ResultContainer from './ResultContainer'
import EqualButtonContainer from './EqualButtonContainer'
import SaveButtonContainer from './SaveButtonContainer'
import MemoryResultsContainer from './MemoryResultsContainer'

const DEFAULT_NOT_A_NUMBER_ERROR = 'Please enter valid numbers'
const DEFAULT_FORBIDDEN_OPERATION_ERROR = 'Forbidden operation: division by zero'

export class Calculator extends Component {
  constructor (props) {
    super(props)

    this._handleButtonClick = this._handleButtonClick.bind(this)
    this._handleNumberChange = this._handleNumberChange.bind(this)
    this._saveCalculation = this._saveCalculation.bind(this)
    this._loadCalculation = this._loadCalculation.bind(this)

    this.state = {
      operation: 'plus',
      inputOne: '',
      inputTwo: '',
      result: 0,
      savedResults: [],
      enableSaveButton: false
    }
  }

  checkInputForNumber(value) {
    return typeof(value) === 'number' ? true : false
  }

  roundUp(number) {
    return Math.round(number * 100) / 100
  }

  calculateResult () {
    const { inputOne, inputTwo, operation } = this.state

    switch (operation) {
      case 'minus':
        return this.roundUp(parseFloat(inputOne) - parseFloat(inputTwo))
      case 'times':
        return this.roundUp(parseFloat(inputOne) * parseFloat(inputTwo))
      case 'divide':
        return this.roundUp(parseFloat(inputOne) / parseFloat(inputTwo))
      default:
        return this.roundUp(parseFloat(inputOne) + parseFloat(inputTwo))
    }
  } 

  updateResult() {
    const { inputOne, inputTwo, operation } = this.state
    if (!this.checkInputForNumber(inputOne) || !this.checkInputForNumber(inputTwo)) {
      this.setState({ result: DEFAULT_NOT_A_NUMBER_ERROR })
      this.setState({ enableSaveButton: false })
      return 
    }

    if (inputTwo === 0 && operation === 'divide') {
      this.setState({ result: DEFAULT_FORBIDDEN_OPERATION_ERROR })
      this.setState({ enableSaveButton: false })
      return
    }
    this.setState({ result: this.calculateResult() }, function () {
      this.setState({ enableSaveButton: this._shouldEnableSaveButton() })
    })
  }

  _handleNumberChange (event) {
    const changedField = event.currentTarget.name
    const changedValue = event.currentTarget.value
    const convertedValue = (isNaN(Number(changedValue)) || changedValue.length === 0) ? changedValue : Number(changedValue)

    this.setState({ [changedField]: convertedValue }, function () {
      this.updateResult()
    })
  }

  _handleButtonClick (event) {
    const operation = event.currentTarget.getAttribute('data-value')
    if (this.state.operation !== operation) {
      this.setState({ operation}, function () {
        this.updateResult()
      })
    }
  }

  _shouldEnableSaveButton() {
    const { savedResults, inputOne, inputTwo, operation, result } = this.state
    if (inputOne.length === 0 && inputTwo.length === 0 || result.length === 0) return false
    if (savedResults.length === 0) return true

    const latestRecord = savedResults[savedResults.length - 1]
    if (latestRecord.operation === operation &&
      (latestRecord.inputOne === inputOne && latestRecord.inputTwo === inputTwo) ||
      (latestRecord.inputOne === inputTwo && latestRecord.inputTwo === inputOne) ) {
      return false
    }

    return true
  }

  _saveCalculation () {
    const { inputOne, inputTwo, operation, result, } = this.state
    if (!this._shouldEnableSaveButton()) return false
    const savedResults = [...this.state.savedResults, {
      inputOne,
      inputTwo,
      operation,
      result
    }]

    this.setState({ savedResults }, function () {
      this.setState({ enableSaveButton: false })
    })
  }

  _loadCalculation(event) {
    const resultIndex = event.currentTarget.getAttribute('data-value')
    const savedResult = this.state.savedResults[resultIndex] 
    if (!savedResult) return

    this.setState({
      inputOne: savedResult.inputOne,
      inputTwo: savedResult.inputTwo,
      operation: savedResult.operation,
      result: savedResult.result
    }, function () {
      this.setState({ enableSaveButton: false })
    })
  }

  render() {
    return (
      <Container>
        <form>
          <InputContainer defaultValue={this.state.inputOne} handleNumberChange = {this._handleNumberChange} inputPlaceholder = 'input_1' inputName = 'inputOne' />
          <OperationButtonContainer activeButton={this.state.operation} btnHandler = {this._handleButtonClick} />
          <InputContainer defaultValue={this.state.inputTwo} handleNumberChange = {this._handleNumberChange} inputPlaceholder = 'input_2' inputName = 'inputTwo' />
          <EqualButtonContainer />
          <ResultContainer inputValue={this.state.result} />
          <SaveButtonContainer btnHandler={this._saveCalculation} enableButton={this.state.enableSaveButton} />
          <MemoryResultsContainer loadCalculation={this._loadCalculation} memoryResults={this.state.savedResults} />
        </form>
      </Container>
    )
  }
}

export default Calculator
