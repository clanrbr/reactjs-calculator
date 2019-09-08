import React from 'react'
import Button from './common/Button'
import PropTypes from 'prop-types'

const SaveButtonContainer = ({ btnHandler, enableButton }) => {
  const btnProps = {
    btnClass: 'btn-success btn-block',
    btnValue: 'save',
    btnText: 'Save',
    disabled: !enableButton,
    btnHandler: btnHandler
  }

  return (
    <div className='justify-content-md-center row'>
      <div className='text-center mt-2 col-sm-4'>
          <Button {...btnProps} />
      </div>
    </div>
  )
}

const { func, bool } = PropTypes

SaveButtonContainer.propTypes = {
  btnHandler: func.isRequired,
  enableButton: bool.isRequired
}

export default SaveButtonContainer
