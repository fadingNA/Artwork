import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from "next/link";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";


export default function MainNav() {
    const router = useRouter();
    const {register, handleSubmit} = useForm();

    function submitForm(data) {
        router.push(`/artwork?title=true&q=${data.search}`);
    }

    return (
        <Navbar bg="dark" expand="lg" className="fixed-top">
            <Container fluid>
                <Navbar.Brand style={{color: "whitesmoke"}}>Nonthachai Plodthong</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                        <Link href="/" legacyBehavior passHref>
                            <Nav.Link style={{color: "whitesmoke"}}>Home</Nav.Link>
                        </Link>
                        <Link href="/search" legacyBehavior passHref>
                            <Nav.Link style={{color: "whitesmoke"}}>Advanced Search</Nav.Link>
                        </Link>
                    </Nav>
                    <Form className="d-flex" onSubmit={handleSubmit(submitForm)}>
                        <Form.Control
                            {...register("search")}
                            type="search"
                            placeholder="Search your Artwork"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success" type="submit">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
            <br/>
            <br/>
        </Navbar>
    );
}

