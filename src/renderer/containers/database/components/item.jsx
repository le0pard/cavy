import React from 'react'
import {connect} from 'react-redux'
import DatabaseSchema from './schema'

const {PropTypes} = React

class DatabaseItem extends React.Component {
  static propTypes = {
    db: PropTypes.shape({
      name: PropTypes.string.isRequired,
      schemas: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired
      }))
    })
  };

  render() {
    const {db} = this.props
    const {name, schemas} = db

    return (
      <div>
        <div>{name}</div>
        {schemas && schemas.map((schema) => <DatabaseSchema key={schema.name} schema={schema} />)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatabaseItem)
