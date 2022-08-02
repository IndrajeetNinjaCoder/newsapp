import React, { Component } from 'react'
import loading from '../loading.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img my-4 src={loading} alt="Loading" />
      </div>
    )
  }
}

export default Spinner