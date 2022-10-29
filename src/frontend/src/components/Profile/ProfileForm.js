// import classes from './ProfileForm.module.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CONSTANTS from '../../constants';
import { useContext, useState } from 'react';
import AuthContext from '../../contexts/AuthContext';

const domainName = "http://" + CONSTANTS.GATEWAY1 + ":" + CONSTANTS.GATEWAY1_PORT;

const ProfileForm = () => {
  const context = useContext(AuthContext)
  const [name,setName] = useState("")
  fetch(
    domainName+"/profile",{
      headers:
      {
        token : context.token
      }
    }
  ).then(response => {
        if(response.ok){
            response.json().then((data)=>{
                console.log(data)
                setName(data.first_name)
            })
            console.log(context)
            // this.props.navigation.navigate('./', {replace:true})
        }else{
            console.log(response)
        }
    });
  return (
    <Card style={{ width: '94.5rem', padding: "2rem" }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default ProfileForm;
