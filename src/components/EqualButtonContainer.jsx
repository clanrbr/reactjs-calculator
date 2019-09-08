import React from 'react'
import Button from './common/Button'

const EqualButtonContainer = () => {
  const btnProps = {
    btnClass: 'btn-dark btn-circle',
    btnValue: 'equals',
    disabled: true
  }

  return (
    <div className='justify-content-md-center row'>
      <div className='text-center mt-2 col-sm-4'>
        <Button {...btnProps} />
      </div>
    </div>
  )
}

export default EqualButtonContainer
