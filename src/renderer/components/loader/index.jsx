import React from 'react'

class Loader extends React.Component {

  render() {
    return (
      <div className='loader'>
        <div className='loader-stripe'></div>
        <div className='loader-stripe'></div>
        <div className='loader-stripe'></div>
        <div className='loader-stripe'></div>
      </div>
    )
  }
}

export default Loader
