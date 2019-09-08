import React from 'react'
import Button from './common/Button'
import PropTypes from 'prop-types'

const OperationButtonContainer = ({ btnHandler, activeButton }) => {
  const getButtonStyle = (button, btnColor) => {
    let btnStyle = `btn-${btnColor} mr-2`
    return (button !== activeButton) ? btnStyle + ' btn-circle' : btnStyle
  }

  const buttonProps = [{
      btnClass: getButtonStyle('plus', 'primary'),
      btnValue: 'plus',
      btnHandler: btnHandler
    },{
      btnClass: getButtonStyle('minus', 'info'),
      btnValue: 'minus',
      btnHandler: btnHandler
    },{
      btnClass: getButtonStyle('times', 'danger'),
      btnValue: 'times',
      btnHandler: btnHandler
    },{
      btnClass: getButtonStyle('divide', 'warning'),
      btnValue: 'divide',
      btnHandler: btnHandler
    }
  ]

  return (
    <div className='justify-content-md-center row'>
      <div className='text-center mt-2 col-sm-4'>
        {buttonProps.map((btnProps, index) => (
          <Button key={index} {...btnProps} />
        ))}
      </div>
    </div>
  )
}

const { func, string } = PropTypes

OperationButtonContainer.propTypes = {
  btnHandler: func.isRequired,
  activeButton: string.isRequired
}

export default OperationButtonContainer
