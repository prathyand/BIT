// import classes from './ProfileForm.module.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CONSTANTS from '../../constants';
import { useContext, useState, useEffect, useCallback } from 'react';
import AuthContext from '../../contexts/AuthContext';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const domainName = "http://" + CONSTANTS.GATEWAY1 + ":" + CONSTANTS.GATEWAY1_PORT;

const ProfileForm = () => {
  const context = useContext(AuthContext)
  const [fname,setFName] = useState("")
  const [lname,setLName] = useState("")
  const [email,setMail] = useState("")
  const [phoneno,setPhone] = useState("")
  const [edit,setEdit] = useState(false)
  const [changePass,setChangePass] = useState(false)

  const setData = (data) =>{
    setFName(data.first_name)
    setLName(data.last_name)
    setMail(data.user_email)
    setPhone(data.cellphone_no)
  }

  const editForm = (event) => {
    // console.log(event)
    setEdit(event.target.checked)
  }

  const onChangePass = (event) => {
    // console.log(event)
    setChangePass(event.target.checked)
  }

  const sendUpdate = (event) =>{
    event.preventDefault()
    fetch(
      domainName+"/updateprofile",
      {
        method : "POST",
        body : JSON.stringify(
        {
          "first_name": fname,
          "last_name": lname,
          "user_email": email,
          "cellphone_no": phoneno
        }),
        headers:
        {
            "Content-Type" : "application/json",
            token : context.token
        }
      }
    ).then(response => {
      if(response.ok){
        response.json().then((data)=>{
          setData(data)
        });
      }else{
        console.log(response)
      }
    });
  }

  const fetchProfile = useCallback(() => {
    const token = context.token
    fetch(
    domainName+"/profile",{
      headers:
      {
        token : token
      }
    }
  ).then(response => {
        if(response.ok){
            response.json().then((data)=>{
                // console.log(data)
                setData(data)
            })
            // console.log(context)
            // this.props.navigation.navigate('./', {replace:true})
        }else{
            console.log(response)
        }
    });
  },[]);// eslint-disable-line react-hooks/exhaustive-deps
  
  useEffect(()=>{
    fetchProfile()
  },[fetchProfile])

  return (
    <Card style={{ width: '94.5rem', padding: "2rem" }}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        {/* <Card.Title>{fname}</Card.Title> */}
        <Form onSubmit={sendUpdate}>
          {(!changePass || edit) && 
          <>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              First Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="inputtext" placeholder="First Name" value={fname} disabled={!edit} onChange={e => setFName(e.target.value)}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Last Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="inputtext" placeholder="Last Name" value={lname} disabled={!edit} onChange={e => setLName(e.target.value)}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Phone Number
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="inputtext" placeholder="Phone Number" value={phoneno} disabled={!edit} onChange={e => setPhone(e.target.value)}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Email Id
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="email" placeholder="Email" value={email} disabled={!edit} onChange={e => setMail(e.target.value)}/>
            </Col>
          </Form.Group>
          </>
          }
          {changePass && 
            <>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Password
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="password" placeholder="Password" disabled={!changePass}/>
              </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
                Confirm Password
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="password" placeholder="Confirm Password" disabled={!changePass} />
              </Col>
          </Form.Group>
          </>
          }
          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Form.Check label="Edit Profile" value={edit} onChange={editForm}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Form.Check label="Change Password" value={changePass} onChange={onChangePass}/>
            </Col>
          </Form.Group>
          
          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              {(edit && !changePass) && <>
                <Button type="submit" disabled={!edit}>Submit</Button>
                </>
              }
              {(changePass && !edit) && 
                <Button style={{ marginLeft:'5px' }} disabled={!changePass}>Change Password</Button>
              }
              {(edit && changePass) && <>
                <Button type="submit" disabled={!edit}>Submit</Button>
                </>
              }
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ProfileForm;
