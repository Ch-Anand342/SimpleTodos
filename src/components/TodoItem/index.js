// Write your code here
import {Component} from 'react'
import './index.css'

class TodoItem extends Component {
  state = {
    isEditing: false,
    editText: '',
  }

  onClickEdit = () => {
    const {todoDetails} = this.props

    this.setState({
      isEditing: true,
      editText: todoDetails.title,
    })
  }

  onChangeInput = event => {
    this.setState({
      editText: event.target.value,
    })
  }

  onSave = () => {
    const {todoDetails, updateTitle} = this.props
    const {editText} = this.state

    updateTitle(todoDetails.id, editText)

    this.setState({
      isEditing: false,
    })
  }

  render() {
    const {todoDetails, deleteTodo, toggleComplete} = this.props

    const {id, title, isCompleted} = todoDetails

    const {isEditing, editText} = this.state

    return (
      <li className="todo-item">
        <div className="left-container">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => toggleComplete(id)}
          />

          {isEditing ? (
            <input
              value={editText}
              onChange={this.onChangeInput}
              className="edit-input"
            />
          ) : (
            <p className={isCompleted ? 'completed title' : 'title'}>{title}</p>
          )}
        </div>

        <div className="buttons-container">
          {isEditing ? (
            <button type="button" className="edit-button" onClick={this.onSave}>
              Save
            </button>
          ) : (
            <button
              type="button"
              className="edit-button"
              onClick={this.onClickEdit}
            >
              Edit
            </button>
          )}

          <button
            className="delete-button"
            type="button"
            onClick={() => deleteTodo(id)}
          >
            Delete
          </button>
        </div>
      </li>
    )
  }
}

export default TodoItem
