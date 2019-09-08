import React from 'react'
import PropTypes from 'prop-types'

const MemoryResultsContainer = ({ memoryResults, loadCalculation }) => {
  const canShowMemory = memoryResults.length ? true : false
  const operationMapping = {
    plus: '+',
    divide: '/',
    minus: '-',
    times: '*'
  }

  const pritifyCalculation = (record) => {
    return `${record.inputOne} ${operationMapping[record.operation]} ${record.inputTwo} = ${record.result}`
  }

  return (
    <div className='justify-content-md-center row'>
      <div className='text-center mt-4 col-sm-4'>
        <h1>Memory:</h1>
        {canShowMemory && <ul className='list-group list-group-flush'>
            {memoryResults.map(function(record, index) {
              return (
                <li key={index} data-value={index} onClick={loadCalculation} role='tab' tabIndex='-1' className='list-group-item'>{pritifyCalculation(record)}</li>
              )
            })}
          </ul>
        }
      </div>
    </div>
  )
}

const { array, func } = PropTypes

MemoryResultsContainer.propTypes = {
  memoryResults: array.isRequired,
  loadCalculation: func.isRequired
}

export default MemoryResultsContainer
