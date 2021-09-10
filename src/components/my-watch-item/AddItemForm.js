import React, { Component, createRef } from 'react';

class AddItemForm extends Component {
  epIdRef = createRef();
  epNameRef = createRef();
  epStatusRef = createRef();

  onSubmit = (e) => {
    e.preventDefault();
    const { onAddItem } = this.props;
    const epId = this.epIdRef.current.value;
    const epName = this.epNameRef.current.value;
    onAddItem && onAddItem({ name: epName, id: epId });
  };

  render() {
    return (
      <form className='form-group m-2' onSubmit={this.onSubmit}>
        <input className='form-control m-2' type='number' ref={this.epIdRef} placeholder='Id'/>
        <input className='form-control m-2' type='text' ref={this.epNameRef} placeholder='Name'/>
        <input className='form-control m-2' type='radio' ref={this.epStatusRef} />
        <button type='submit' className='btn btn-primary m-2'>Submit</button>
      </form>
    )

  }
};

export default AddItemForm;