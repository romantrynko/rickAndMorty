import React, { Component } from 'react';
import TodoCard from '../my-watch-item/MyWatchItem';

class MyWatchList extends Component {
  state = {
    title: '',
    body: '',
    doneStatus: false,
    isEditMode: false
  };

  onBodyChange = (event) => {
    const body = event.target.value
    this.setState({
      body
    })
  };

  onTitleChange = (event) => {
    const title = event.target.value
    this.setState({
      title
    })
  };

  onStatusChange = (event) => {
    this.setState({
      doneStatus: event.target.checked
    })
  };

  onAddTodo = () => {
    const { title, body, doneStatus } = this.state;

    const newTodo = {
      title,
      body,
      doneStatus
    };

    this.setState({ newTodo });

    this.resetForm()
  };

  onRemoveToDo = (todo) => {
    const { removeTodo } = this.props;
    return () => {
      removeTodo && removeTodo(todo)
    }
  };

  onEditTodo = (todo) => {
    return () => {
      this.setState({
        isEditMode: true,
        ...todo
      })
    }
  };

  onUpdateTodo = () => {
    const { updateTodo } = this.props;
    const { title, body, doneStatus, id } = this.state;

    this.setState({
      title,
      body,
      doneStatus,
      id
    });

    this.resetForm()
  };

  // onToggleTodo = (id) => {
  //   const { toggleTodo } = this.props;

  //   return () => {
  //     toggleTodo && toggleTodo(id);
  //   }
  // };

  resetForm = () => {
    this.setState({
      title: '',
      body: '',
      doneStatus: false,
      isEditMode: false,
      id: ''
    });
  };

  render() {
    const { title, body, doneStatus, isEditMode } = this.state;
    const { todos } = this.props;

    return (
      <div >
        <h3 className='card card-header'>
          Add todo form
        </h3>
        <div className='d-flex flex-column card card-body m-2'>
          <input className='m-2' value={title} onChange={this.onTitleChange} placeholder='Todo title' />
          <textarea className='m-2' value={body} onChange={this.onBodyChange} placeholder='Todo body' />

          <div>
            <input className='m-2' type='checkbox' onChange={this.onStatusChange} checked={doneStatus} />
            <span className='m-2'>
              Done
            </span>
          </div>
          <div className='d-flex flex-row w-50'>
            {!isEditMode && <button className='btn btn-info m-2' onClick={this.onAddTodo}>Add todo</button>}
            {isEditMode && <button className='btn btn-success m-2' onClick={this.onUpdateTodo}>Update todo</button>}
          </div>
        </div>

        {
          todos.map(todo => {
            return (
              <TodoCard
                key={todo.id}
                todo={todo}
                onRemoveToDo={this.onRemoveToDo(todo)}
                onEditTodo={this.onEditTodo(todo)}
                toggleTodo={this.onToggleTodo(todo.id)}
              />
            )
          })
        }
      </div>
    );
  };
};

export default MyWatchList;
