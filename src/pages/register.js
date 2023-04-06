import {Card, Form, Button, Alert} from "react-bootstrap";
import {registerUser} from "../../lib/Auth";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";

export default function Register(props) {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [warning, setWarning] = useState("");
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({});

    async function handleSubmits(e) {
        try {
            await registerUser(user, password, password2);
            await router.push("/login");
        } catch (err) {
            setWarning(err.message);
        }
    }
    return (
        <React.Fragment>
            <Card bg={"light"}>
                <Card.Body>
                    <h2>Register for an account</h2>
                    Enter your login information below:
                </Card.Body>
            </Card>
            <br/>
            <Form onSubmit={handleSubmit(handleSubmits)}>
                <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type={"text"}
                        {...register("user", {
                            required: true
                        })}
                        onChange={(e) => setUser(e.target.value)}
                    />
                    {errors.user?.type=== "required" && (
                        <span className="text-danger">Username is required.</span>
                    )}
                </Form.Group>
                <br/>
                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <br/>
                    <Form.Text className={"text-muted"}>Your password should be longer than 8 character</Form.Text>
                    <Form.Control
                        type={"password"}

                        {...register("password", {required: true, minLength: 8})}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password?.type === "required" && (
                        <span className="text-danger">Password is less than 8 character.</span>
                    )}
                </Form.Group>
                <br/>
                <Form.Group>
                    <Form.Label>Re-entry your password: </Form.Label>
                    <Form.Control
                        type={"password"}
                        id={"password2"}
                        name={"password2"}
                        {...register("password2", {
                            required: true,
                            validate: (value) => value === password,
                        })}
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                    {errors.password?.type === "required" &&
                        <span className="text-danger">Password is less than 8 character.</span>
                    }
                </Form.Group>
                <br/>
                <Button
                    variant={"primary"}
                    className={"pull-right"}
                    type={"submit"}
                    disabled={Object.keys(errors).length > 0}
                >
                    Sign in
                </Button>
                {warning && (
                    <>
                        <br/>
                        <Alert variant="danger">{warning}</Alert>
                    </>
                )}
            </Form>
        </React.Fragment>
    );
}
