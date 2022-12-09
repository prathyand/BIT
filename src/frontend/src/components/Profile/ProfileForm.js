import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import constants from '../../constants';
import { useContext, useState, useEffect, useCallback, useRef } from 'react';
import Request from '../../contexts/Request';
import AuthContext from '../../contexts/AuthContext';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Navigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';

const ProfileForm = () => {
  const [fname,setFName] = useState("")
  const [lname,setLName] = useState("")
  const [email,setMail] = useState("")
  const [phoneno,setPhone] = useState("")
  const [edit,setEdit] = useState(false)
  const [changePass,setChangePass] = useState(false)
  const request = useContext(Request)
  const authContext = useContext(AuthContext)
  const isLoggedIn = authContext.isLoggedIn
  const password = useRef()
  const confPassword = useRef()
  const [passwordError,setPassError] = useState(false)
  const [passErrorMessage,setErrMesg] = useState("")
  const [show, setShow] = useState(false);

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

  const changePassword = (event) => {
    console.log(event)
    let passVal = password.current.value
    let confPassVal = confPassword.current.value
    if(passVal === confPassVal){
      setPassError(false)
      let body = JSON.stringify({
        password: passVal
      });
      let changePassReq = request.postRequest(constants.REQUEST.CHANGE_PASSWORD,body);
      changePassReq.then(response => {
          if(response.ok){
              response.json().then((data)=>{
                  console.log(data)
                  setChangePass(event.target.checked)
                  if(document.getElementById("passCheck")){
                    document.getElementById("passCheck").checked = false
                  }
                  setShow(true)
                  // setData(data)
              })
          }else{
              console.log(response)
          }
      });
    }else{
      // setPassError("Passwords do not match")
      setPassError(true)
      setErrMesg("Passwords do not match")
    }
  }

  const sendUpdate = (event) =>{
    event.preventDefault()
    let body = JSON.stringify(
      {
        "first_name": fname,
        "last_name": lname,
        "user_email": email,
        "cellphone_no": phoneno
      })
    let updateProfile = request.postRequest(constants.REQUEST.UPDATE_PROFILE_EP,body);
    updateProfile.then(response => {
      if(response.ok){
        response.json().then((data)=>{
          setData(data.message)
          setEdit(false)
          if(document.getElementById("profileEdit")){
            document.getElementById("profileEdit").checked = false
          }
          setShow(true)
        });
      }else{
        console.log(response)
      }
    });
  }

  const fetchProfile = useCallback(() => {
    if(isLoggedIn){
      let getProfile = request.getRequest(constants.REQUEST.PROFILE_EP);
      getProfile.then(response => {
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
    }
  },[]);// eslint-disable-line react-hooks/exhaustive-deps
  
  useEffect(()=>{
    fetchProfile()
  },[fetchProfile])

  return (
    <>
    {!isLoggedIn && <Navigate to="/"/>}
    {isLoggedIn && (
    <Card style={{ width: '94.5rem', padding: "2rem" }}>
      {show && 
      <Alert variant="success" onClose={() => setShow(false)} dismissible >
          Successfully updated the details
      </Alert>
      }
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
                <Form.Control type="password" placeholder="Password" disabled={!changePass} ref={password} isInvalid={passwordError}/>
                <Form.Control.Feedback type="invalid">
                  {passErrorMessage}
              </Form.Control.Feedback>
              <Form.Control.Feedback type="valid">
                  Passwords Match
                </Form.Control.Feedback>
              </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
                Confirm Password
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="password" placeholder="Confirm Password" disabled={!changePass} ref={confPassword} isInvalid={passwordError}/>
                <Form.Control.Feedback type="invalid">
                  {passErrorMessage}
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid">
                  Passwords Match
                </Form.Control.Feedback>
              </Col>
          </Form.Group>
          </>
          }
          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Form.Check label="Edit Profile" id="profileEdit" value={edit} onChange={editForm}/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Form.Check label="Change Password" id="passCheck" value={changePass} onChange={onChangePass}/>
            </Col>
          </Form.Group>
          
          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              {(edit && !changePass) && <>
                <Button type="submit" disabled={!edit}>Submit</Button>
                </>
              }
              {(changePass && !edit) && 
                <Button style={{ marginLeft:'5px' }} disabled={!changePass} onClick={changePassword}>Change Password</Button>
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
    )
    }
    </>
  );
}

export default ProfileForm;
