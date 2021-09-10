import React, { Component, createRef } from 'react';

class AddItemForm extends Component {
  epNameRef = createRef();

  onSubmit = (e) => {
    e.preventDefault();
    const { onAddItem } = this.props;
    const epName = this.epNameRef.current.value;
    onAddItem && onAddItem({ name: epName});
  };

  render() {
    return (
      <form className='form form-group' onSubmit={this.onSubmit}>
        <input type='text' ref={this.epNameRef} />
        <button type='submit'>Submit</button>
      </form>
    )

  }
};

export default AddItemForm;