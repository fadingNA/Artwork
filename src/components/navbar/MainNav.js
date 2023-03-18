import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from "next/link";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {searchHistoryAtom} from "../../../store";
import {NavDropdown} from "react-bootstrap";
import styles from '@/styles/History.module.css'


export default function MainNav() {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
    const router = useRouter();
    const {register, handleSubmit} = useForm();

    function submitForm(data) {
        const searchValue = data.search;
        const queryString = `title=true&q=${searchValue}`
        setSearchHistory(current => [...current, queryString]);
        router.push(`/artwork?${queryString}`)
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top" collapseOnSelect>
            <Container fluid>
                <Navbar.Brand href="/">Nonthachai Plodthong</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                        active={router.pathname === "/search"}
                    >
                        <Link href="/" legacyBehavior passHref>
                            <Nav.Link>Home</Nav.Link>
                        </Link>
                        <Link href="/search" legacyBehavior passHref>
                            <Nav.Link active={router.pathname === "/search"}>Advanced Search</Nav.Link>
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
                    <Nav>
                        <NavDropdown title={"User Name"}
                                     style={{color: "#333", transition: "all 0.3s ease-in-out"}}
                                     className="dropdown-hover">
                            <Link href="/favoruites" legacyBehavior passHref>
                                <Nav.Link style={{color: "#333"}} className={styles.navLink}>Favourite</Nav.Link>
                            </Link>
                            <Link href="/history" legacyBehavior passHref>
                                <Nav.Link style={{color: "#333"}} className={styles.navLink}
                                          active={router.pathname === "/history"}
                                >Search
                                    History</Nav.Link>
                            </Link>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <br/>
            <br/>
        </Navbar>
    );
}
