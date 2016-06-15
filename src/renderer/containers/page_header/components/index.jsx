import React from 'react'
import {connect} from 'react-redux'

class PageHeaderView extends React.Component {

  render() {
    return (
      <div>
        <p>header</p>
      </div>
    )
  }
}

export const PageHeader = connect()(PageHeaderView)
