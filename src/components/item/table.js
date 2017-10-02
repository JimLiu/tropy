'use strict'

const React = require('react')
const PropTypes = require('prop-types')
const { arrayOf, func, object } = PropTypes
const { ItemIterator } = require('./iterator')
const { ItemTableRow } = require('./table-row')
const { ItemTableHead } = require('./table-head')
const cx = require('classnames')
const { noop } = require('../../common/util')
const { ROW } = require('../../constants/sass')

class ItemTable extends ItemIterator {
  get classes() {
    return {
      'table-body': true,
      'drop-target': !this.props.isDisabled,
      'over': this.props.isOver
    }
  }

  getColumns() {
    return 1
  }

  getRowHeight() {
    return ROW.HEIGHT
  }

  handleEditCancel = (...args) => {
    this.props.onEditCancel(...args)
    this.container.focus()
  }

  renderTableBody() {
    const { columns, data, edit, onMetadataSave } = this.props
    const onEdit = this.props.selection.length === 1 ? this.props.onEdit : noop

    const { height } = this.state
    const offset = this.getOffset(true)
    const transform = `translate3d(0,${offset}px,0)`

    return this.connect(
      <div
        className={cx(this.classes)}
        ref={this.setContainer}
        tabIndex={this.tabIndex}
        onKeyDown={this.handleKeyDown}
        onClick={this.handleClickOutside}>
        <div
          ref={this.setScroller}
          className="scroll-container">
          <div className="runway click-catcher" style={{ height }}>
            <table className="viewport" style={{ transform }}>
              <tbody>
                {this.mapItemRange(({ item, ...props }) =>
                  <ItemTableRow {...props}
                    key={item.id}
                    item={item}
                    data={data[item.id]}
                    columns={columns}
                    edit={edit}
                    onCancel={this.handleEditCancel}
                    onChange={onMetadataSave}
                    onEdit={onEdit}/>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (this.props.isEmpty) ? this.renderNoItems() : (
      <div className="item table">
        <ItemTableHead
          columns={this.props.columns}
          sort={this.props.sort}
          onSort={this.props.onSort}/>

        {this.renderTableBody()}
      </div>
    )
  }

  static propTypes = {
    ...ItemIterator.propTypes,
    columns: arrayOf(object).isRequired,
    edit: object,
    data: object.isRequired,
    onEdit: func.isRequired,
    onEditCancel: func.isRequired,
    onMetadataSave: func.isRequired
  }

  static defaultProps = {
    ...ItemIterator.defaultProps,
    overscan: 2
  }
}


module.exports = {
  ItemTable
}
