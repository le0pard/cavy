import React from 'react'
import {PageHeader} from '../containers/page_header/components'
import {PageFooter} from '../containers/page_footer/components'
import {DbConnectionsList} from '../containers/db_connections/components'

const {PropTypes} = React

class AppLayout extends React.Component {
  static displayName = 'Layout';

  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div className='app-layout'>
        <PageHeader />
        <div className='app-view'>
          <div className='master-view'>
            <DbConnectionsList />
          </div>
          <div className='detailed-view'>
            {this.props.children}
          </div>
        </div>
        <PageFooter />
      </div>
    )
  }
}

export default AppLayout
