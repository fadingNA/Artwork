import {Card, Form, Button} from "react-bootstrap";
import {useState} from "react";


export default function Login(props){
    const [user,setUser] = useState('');
    const [password,setPassword] = useState('');
    function handleSubmit(e){
        e.preventDefault();
        console.log(e)
    }
    return(<div>
        <Card>
            <Card.Body>
                <h2>
                    Login
                </h2>
                <p>Enter your Identify</p>
            </Card.Body>
        </Card>
        <br/>
        <Form>
            <Form.Group>
                <Form.Label>
                    User:
                </Form.Label>
                <Form.Control type={"text"} id={"userName"} name={"userName"}
                onChange={e => setUser(e.target.value)}></Form.Control>
            </Form.Group>
        </Form>
    </div>)
}