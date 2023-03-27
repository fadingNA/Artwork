import { Card, Form, Button} from "react-bootstrap";
import React, {useState} from "react";
export default function Login(props){
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e){
        e.preventDefault();
        console.log('Todo: Submit Form')

    }
    return (<React.Fragment>
        <Card bg={"light"}>
            <Card.Body>
                <h2>
                    Login
                </h2>
                Enter your login information below:
            </Card.Body>
        </Card>
        <br/>
        <Form>
            <Form.Group>
                <Form.Label>
                    User:
                </Form.Label>
                <Form.Control
                type={"text"}
                id={"userName"}
                name={"userName"}>
                </Form.Control>
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Label>
                    Password:
                </Form.Label>
                <Form.Control
                type={"password"}
                id={"password"}
                name={"password"}>
                </Form.Control>
            </Form.Group>
            <br/>
            <Button
            variant={"primary"}
            className={"pull-right"}
            type={"submit"}>
                Login
            </Button>
        </Form>
    </React.Fragment>)
}