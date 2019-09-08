import React, { Component } from 'react'
import OperationButtonContainer from './OperationButtonContainer'
import InputContainer from './InputContainer'
import ResultContainer from './ResultContainer'
import EqualButtonContainer from './EqualButtonContainer'
import SaveButtonContainer from './SaveButtonContainer'
import MemoryResultsContainer from './MemoryResultsContainer'
import { checkInputForNumber, doMath, compareRecords } from './utils'

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

  _calculateResult () {
    const { inputOne, inputTwo, operation } = this.state
    return doMath({ inputOne, inputTwo, operation })
  }

  _updateResult() {
    const { inputOne, inputTwo, operation } = this.state
    if (!checkInputForNumber(inputOne) || !checkInputForNumber(inputTwo)) {
      this.setState({ result: DEFAULT_NOT_A_NUMBER_ERROR })
      this.setState({ enableSaveButton: false })
      return null
    }

    if (inputTwo === 0 && operation === 'divide') {
      this.setState({ result: DEFAULT_FORBIDDEN_OPERATION_ERROR })
      this.setState({ enableSaveButton: false })
      return null
    }
    this.setState({ result: this._calculateResult() }, function () {
      this.setState({ enableSaveButton: this._shouldEnableSaveButton() })
    })
  }

  _handleNumberChange (event) {
    const changedField = event.currentTarget.name
    const changedValue = event.currentTarget.value
    if (!['inputOne', 'inputTwo'].includes(changedField)) return null

    const convertedValue = (isNaN(Number(changedValue)) || changedValue.length === 0) ? changedValue : Number(changedValue)
    this.setState({ [changedField]: convertedValue }, function () {
      this._updateResult()
    })
  }

  _handleButtonClick (event) {
    const operation = event.currentTarget.getAttribute('data-value')
    if (this.state.operation !== operation && ['plus', 'minus', 'times', 'divide'].includes(operation)) {
      this.setState({ operation}, function () {
        this._updateResult()
      })
    }
  }

  _shouldEnableSaveButton() {
    const { savedResults, inputOne, inputTwo, operation, result } = this.state
    return compareRecords({ savedResults, inputOne, inputTwo, operation, result })
  }

  _saveCalculation () {
    const { inputOne, inputTwo, operation, result } = this.state
    if (!this._shouldEnableSaveButton()) return null
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
    if (this.state.savedResults.length - 1 < resultIndex) return null

    const { inputOne, inputTwo, operation, result } = this.state.savedResults[resultIndex]
    this.setState({ inputOne, inputTwo, operation, result }, function () {
      this.setState({ enableSaveButton: false })
    })
  }

  render() {
    return (
      <div className='container'>
        <form>
          <InputContainer defaultValue={this.state.inputOne} handleNumberChange = {this._handleNumberChange} inputPlaceholder = 'input_1' inputName = 'inputOne' />
          <OperationButtonContainer activeButton={this.state.operation} btnHandler = {this._handleButtonClick} />
          <InputContainer defaultValue={this.state.inputTwo} handleNumberChange = {this._handleNumberChange} inputPlaceholder = 'input_2' inputName = 'inputTwo' />
          <EqualButtonContainer />
          <ResultContainer inputValue={this.state.result} />
          <SaveButtonContainer btnHandler={this._saveCalculation} enableButton={this.state.enableSaveButton} />
          <MemoryResultsContainer loadCalculation={this._loadCalculation} memoryResults={this.state.savedResults} />
        </form>
      </div>
    )
  }
}

export default Calculator
