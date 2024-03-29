import {Card, Form, Button, Alert} from "react-bootstrap";
import {authenticateUser, readToken} from "../../lib/Auth";
import React, {useState} from "react";
import {searchHistoryAtom} from "../../store";
import {favoruitesAtom} from "../../store";
import {useRouter} from "next/router";
import {getFav, getHistory} from "../../lib/userData";
import {useAtom} from "jotai";
import Notify from "@/components/notity/notification";
import {useForm} from "react-hook-form";

export default function Login(props) {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [warning, setWarning] = useState("");
    const router = useRouter();
    const [fav, setFavouritesList] = useAtom(favoruitesAtom);
    const [his, setHistory] = useAtom(searchHistoryAtom);
    const [notify, setNotify] = useState(false);
    const token = readToken();
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            userName: "",
            password: ""
        }
    })

    async function handleSubmits(e) {
        //e.preventDefault()
        try {
            await authenticateUser(user, password);
            console.log(user, password);
            setTimeout(() => {
                setNotify(true);
            }, 10000);
            await router.push('/favourites');
        } catch (err) {
            let message = setWarning(err.message);
        }
    }

    async function updateAtom() {
        setFavouritesList(await getFav());
        setHistory(await getHistory());
    }

    return (
        <React.Fragment>
            <Card bg={"light"}>
                <Card.Body>
                    <h2>
                        Login
                    </h2>
                    Enter your login information below:
                </Card.Body>
            </Card>
            {notify && <Notify message={'Logged IN!'}/>}

            <br/>
            <Form onSubmit={handleSubmit(handleSubmits)}>
                <Form.Group>
                    <Form.Label>
                        User:
                    </Form.Label>
                    <Form.Control
                        type={"text"}
                        placeholder={"Username"}
                        {...register("user", {
                            required: true,
                            minLength: 4
                        })}
                        onChange={e => setUser(e.target.value)}/>

                </Form.Group>
                <br/>
                <Form.Group>
                    <Form.Label>
                        Password:
                    </Form.Label>
                    <Form.Control
                        type={"password"}
                        placeholder={"Password"}
                        {...register("password", {
                            required: true,
                            minLength: 6,
                            // validate: (value) => value === token.password,
                        })}
                        onChange={e => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <br/>
                <Button
                    variant={"primary"}
                    className={"pull-right"}
                    type={"submit"}
                >
                    Login
                </Button>
                <br/>
                {warning && (<><br/><Alert variant="primary" className={"me-auto"}>{warning}</Alert></>)}
            </Form>
        </React.Fragment>)
}