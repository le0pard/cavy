import React from 'react'
import {connect} from 'react-redux'

const {PropTypes} = React

class DatabaseSchema extends React.Component {
  static propTypes = {
    schema: PropTypes.shape({
      name: PropTypes.string.isRequired,
      tables: PropTypes.arrayOf(PropTypes.shape({
        tablename: PropTypes.string.isRequired
      }))
    })
  };

  render() {
    const {schema} = this.props
    const {name, tables} = schema
    return (
      <div>
        <div>{name}</div>
        <div>
          <h3>Tables</h3>
          <ul>
            {tables && tables.map((table) => {
              return (
                <li key={table.tablename}>{table.tablename}</li>
              )
            })}
          </ul>
        </div>
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
)(DatabaseSchema)
