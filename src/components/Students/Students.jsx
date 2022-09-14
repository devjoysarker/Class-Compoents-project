
import axios from 'axios';
import React, { Component } from 'react';
import { Button, Card, Col, Container, Row, Table,Alert,CloseButton } from 'react-bootstrap';
import StudentModal from './StudentModal';

export class Students extends Component {

    constructor(props){
      super(props);

      this.state = {
        modal :{
            status : false,
            type  : ''
        },
        alert : {
            status : false,
            msg  : '',
            type : ''

        },
        student : [],
        dataId  : null,
        students : {
            name: '',
            call : '',
            photo : ''
        }
      }
    }
  render() { 

    const { modal,student,dataId,students } = this.state;
    const { type,msg,status } = this.state.alert;

    // Students show from api
    const getAllStuentsData = () => {
        try {
            axios.get('http://localhost:5050/student').then(res => {
                this.setState((preState) => ({
                    ...preState,
                    student : res.data
                }))
            }) 
        } catch (error) {
            console.log(error);
        }

    }
    
    getAllStuentsData();

    const handleModashow = () => {
        this.setState({
            ...this.state,
            modal:{
                status : true,
                type : 'create',
            }
        })
    }
    const handleModashide = () => {
        this.setState({
            ...this.state,
            modal:{
                status : false,
                type : ''
            }
        })
    }

    const handeButtonhie  = () => {
        this.setState({
            ...this.state,
            alert  : {
                status : false,
                msg  : '',
                type : ''
            }
        })
    }
    const handleShowAlert = () => {
        this.setState({
            ...this.state,
            alert  : {
                status : true,
                msg  : 'We Are MERN Developer',
                type : 'success'
            }
        })
    }


    // Modal Students Show

    const handleSingleModal = (id) => {
     
        let singel = student.find((data) => data.id === id)

        this.setState((preState) => ({
            ...preState,
            modal : {
                status: true,
                type : 'open'
            },
            students : singel
        }))
    }

  
    // handle Student single Delete Data

    const handleDeleteStudent = (id) => {

        this.setState((preState) => ({
            ...preState,
            modal : {
                status : 'true',
                type : 'alert'
            },
            dataId : id
        }))

    }
      // Modal Singal Studnent Edit Data

      const handleSinglaStudentEdit = (id) =>{

        let editid = student.find(data => data.id === id)

        this.setState((preState) => ({
            ...preState,
            modal:{
                status: true,
                type: 'edit'
            },
            students : editid
        }))
    }

    // Stuents single Data handler
    const handleSingalData = (obj) => {
        this.setState((preState) => ({
            ...preState,
            students : obj
        }));
     
    }



    return (
      <Container className='my-5'>
        <Row className='justify-content-center'>
            <Col md={6}>
                <Card>

                    <Card.Body>
                        <Button onClick={ handleModashow } variant='success'>Add New Student</Button>
                        <StudentModal dataId={ dataId } handleSingalData= {handleSingalData} students={ students } show={ modal.status } handleModashide = {  handleModashide } type={ modal.type } />
                        <br />
                        <br />
                        {
                          status &&  <Alert className='d-flex justify-content-between' variant={ type } > { msg } <CloseButton onClick={ handeButtonhie } ></CloseButton> </Alert>
                        }
                       <Table striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Call</th>
                                <th>Photo</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                              student.map((data,index) => 
                              <tr>
                              <td>{ index + 1 }</td>
                              <td>{ data.name }</td>
                              <td>{ data.call }</td>
                              <td><img style={{ height:'50px',width:'50px',objectFit:'cover' }} src={ data.photo } alt="" /></td>
                              <td>
                                  <Button onClick={ () => handleSingleModal(data.id) } variant='primary'>View</Button>&nbsp;
                                  <Button onClick={ () => handleSinglaStudentEdit(data.id) }  variant='info'>Edit</Button>&nbsp;
                                  <Button onClick={ () => handleDeleteStudent(data.id) } variant='danger'>Delete</Button>
                              </td>
                          </tr>
                              )
                            }
                         
                        </tbody>
                       </Table>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
      </Container>
    )
  }
}

export default Students;
