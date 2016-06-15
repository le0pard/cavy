import React from 'react'
import {connect} from 'react-redux'

class PageFooterView extends React.Component {

  render() {
    return (
      <div>
        <p>footer</p>
      </div>
    )
  }
}

export const PageFooter = connect()(PageFooterView)
