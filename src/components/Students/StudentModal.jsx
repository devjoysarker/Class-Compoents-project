import axios from 'axios';
import React, { Component } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';


export class StudentModal extends Component {

    constructor(props) {

        super(props);
        this.state = {
           inputs : {
            name : '',
            call : '',
            photo : ''
          }
        }
    

    }
  render() {
    const { show, handleModashide,type,dataId,students,handleSingalData } = this.props;
    const {name,call,photo} = this.state.inputs;

    const handleFormSubmit = (e) => {
     e.preventDefault();
     axios.post('http://localhost:5050/student',this.state.inputs).then(res => {
      this.setState((prevState) => ({
        ...prevState,
        inputs: {
          name : '',
          call : '',
          photo : ''
        }
      }));
      handleModashide();
     });
    }

    // Handle Delete Data
    const handleDataDelete = (id) => {
      
      try {
        axios.delete(`http://localhost:5050/student/${id}`).then(res => {
          handleModashide();
        })
        
      } catch (error) {
        console.log(error);
      }
    }

    // handle Stuents Data updata
    const handleStudentUpdateData = (e) => {
     e.preventDefault()
     try {
      axios.patch(`http://localhost:5050/student/${students.id}`,students).then(res => {
          handleModashide();
        })
      
     } catch (error) {
      console.log(error);
     }
    }
   


    if (type === 'create') {
      return (
        <Modal show={ show } onHide={ handleModashide } centered >
            <Modal.Body>
               <h3>Add New Stuents</h3>
               <hr />
               <Form onSubmit={ handleFormSubmit }>
                    <Form.Group className='my-2'>
                    <Form.Label>Student Name</Form.Label>
                    <Form.Control type='text' value={ name } onChange={ e => this.setState((preState) => ({ ...preState, inputs : { ...preState.inputs, name: e.target.value } })) } />
                    </Form.Group>
                    <Form.Group className='my-2'>
                    <Form.Label>Call</Form.Label>
                    <Form.Control type='text' value={ call } onChange={ e => this.setState( (preState) => ({
                      ...preState,
                      inputs : {
                        ...preState.inputs,
                        call: e.target.value
                      }
                    }) ) } />
                    </Form.Group>
                    <Form.Group className='my-2'>
                    <Form.Label>Student Photo</Form.Label>
                    <Form.Control type='text' value={ photo } onChange={ e => this.setState((preState) => ({...preState,inputs:{ ...preState.inputs, photo:e.target.value }  })) } />
                    </Form.Group>
                    <Form.Group className='my-2'>
                      <Button type='submit' variant='primary'>Add Now</Button>   
                    </Form.Group>
               </Form>
            </Modal.Body>

        </Modal>
    )
    } else if(type === 'open'){
      return(
        <Modal show={ show } onHide={ handleModashide } centered >
        <Modal.Body>
          <div className="modal-imge">
          <img style={{ width:'100%',height:'100%',objectFit:'cover' }} src= { students.photo } alt="" />
          <h2 style={{ textTransform: 'capitalize' }}>{ students.name }</h2>
          <p style={{ fontWight:'600' }}>{ students.call }</p>
          </div>
        </Modal.Body>
        </Modal>
      )
    } else if( type === 'edit') {
      return(
        <Modal show={ show } onHide={ handleModashide } centered >
        <Modal.Body>
           <h3>Edit Stuents Data</h3>
           <hr />
           <Form onSubmit={ handleStudentUpdateData }>
                <Form.Group className='my-2'>
                <Form.Label>Student Name</Form.Label>
                <Form.Control value={ students.name } type='text' onChange={ e => handleSingalData({
                  ...students,
                  name : e.target.value
                })} />
                </Form.Group>
                <Form.Group className='my-2'>
                <Form.Label>Call</Form.Label>
                <Form.Control value={ students.call } type='text' onChange={ e => handleSingalData({
                  ...students,
                  call : e.target.value
                })} />
                </Form.Group>
                <Form.Group className='my-2'>
                <Form.Label>Student Photo</Form.Label>
                <Form.Control value={ students.photo } type='text' onChange={ e => handleSingalData({
                  ...students,
                  photo : e.target.value
                })} />
                </Form.Group>
                <Form.Group className='my-2'>
                  <Button variant='primary' type='submit'>Add Now</Button>   
                </Form.Group>
           </Form>
        </Modal.Body>
        </Modal>
      )
    } else if ( type ==='alert' ) {
      return(
        <Modal show={ show } onHide={ handleModashide } centered >
        <Modal.Body>
          <h3>Are you Sure ? </h3>
          <hr />
          <p>Delete your Students Data Now</p>
          <div className="alert-btn">
            <Button variant='warning' onClick={ handleModashide } >Cancel</Button>&nbsp;
            <Button variant='danger' onClick={ () => handleDataDelete(dataId) } >Delete</Button>
          </div>
        </Modal.Body>
        </Modal>
      )
    } 
  
  }
}

export default StudentModal;