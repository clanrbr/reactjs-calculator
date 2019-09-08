const checkInputForNumber = (value) => {
  return typeof(value) === 'number' ? true : false
}

const roundUp = (number) => {
  return Math.round(number * 100) / 100
}

const doMath = (props) => {
  const { inputOne, inputTwo, operation } = props

  switch (operation) {
    case 'minus':
      return roundUp(parseFloat(inputOne) - parseFloat(inputTwo))
    case 'times':
      return roundUp(parseFloat(inputOne) * parseFloat(inputTwo))
    case 'divide':
      return roundUp(parseFloat(inputOne) / parseFloat(inputTwo))
    default:
      return roundUp(parseFloat(inputOne) + parseFloat(inputTwo))
  }
}

const compareRecords = (props) => {
  const { savedResults, inputOne, inputTwo, operation, result } = props
  if (inputOne.length === 0 || inputTwo.length === 0 || result.length === 0) return false
  if (savedResults.length === 0) return true

  const latestRecord = savedResults[savedResults.length - 1]

  if (latestRecord.operation === operation && 
    ((latestRecord.inputOne === inputOne && latestRecord.inputTwo === inputTwo) ||
    (latestRecord.inputOne === inputTwo && latestRecord.inputTwo === inputOne)) ) {
    return false
  }

  return true
}

module.exports = {
  roundUp,
  checkInputForNumber,
  doMath,
  compareRecords
}