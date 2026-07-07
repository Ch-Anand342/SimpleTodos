import {Component} from 'react'
import TodoItem from '../TodoItem'
import './index.css'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
  },
  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
  },
  {
    id: 5,
    title: 'Order fruits on Big Basket',
  },
  {
    id: 6,
    title: 'Fix the production issue',
  },
  {
    id: 7,
    title: 'Confirm my slot for Saturday Night',
  },
  {
    id: 8,
    title: 'Get essentials for Sunday car wash',
  },
]

class SimpleTodos extends Component {
  state = {
    todosList: initialTodosList.map(each => ({
      ...each,
      isCompleted: false,
    })),
    inputValue: '',
  }

  deleteTodo = id => {
    const {todosList} = this.state

    const filteredTodos = todosList.filter(eachTodo => eachTodo.id !== id)

    this.setState({
      todosList: filteredTodos,
    })
  }

  onChangeInput = event => {
    this.setState({
      inputValue: event.target.value,
    })
  }

  addTodo = () => {
    const {inputValue, todosList} = this.state

    const value = inputValue.trim()

    if (value === '') {
      return
    }

    const lastSpace = value.lastIndexOf(' ')

    let title = value
    let count = 1

    if (lastSpace !== -1) {
      const possibleNumber = value.slice(lastSpace + 1)

      if (!Number.isNaN(Number(possibleNumber))) {
        count = Number(possibleNumber)
        title = value.slice(0, lastSpace).trim()
      }
    }

    let lastId = todosList.length
      ? Math.max(...todosList.map(each => each.id))
      : 0

    const newTodos = []

    for (let i = 0; i < count; i += 1) {
      lastId += 1

      newTodos.push({
        id: lastId,
        title,
        isCompleted: false,
      })
    }

    this.setState(prevState => ({
      todosList: [...prevState.todosList, ...newTodos],
      inputValue: '',
    }))
  }

  updateTitle = (id, newTitle) => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(each =>
        each.id === id ? {...each, title: newTitle} : each,
      ),
    }))
  }

  toggleComplete = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(each =>
        each.id === id ? {...each, isCompleted: !each.isCompleted} : each,
      ),
    }))
  }

  render() {
    const {todosList, inputValue} = this.state

    return (
      <div className="app-container">
        <div className="todos-container">
          <h1 className="heading">Simple Todos</h1>

          <div className="add-container">
            <input
              type="text"
              className="todo-input"
              value={inputValue}
              onChange={this.onChangeInput}
              placeholder="Enter todo or Todo 5"
            />

            <button type="button" className="add-button" onClick={this.addTodo}>
              Add
            </button>
          </div>

          <ul className="todos-list">
            {todosList.map(eachTodo => (
              <TodoItem
                key={eachTodo.id}
                todoDetails={eachTodo}
                deleteTodo={this.deleteTodo}
                updateTitle={this.updateTitle}
                toggleComplete={this.toggleComplete}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
