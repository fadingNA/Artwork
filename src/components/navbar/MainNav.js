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
import {DropdownButton, NavDropdown} from "react-bootstrap";
import styles from '@/styles/History.module.css'
import {addToHistory} from "../../../lib/userData";
import {getToken, removetoken} from "../../../lib/Auth";
import {Dropdown} from "react-bootstrap";

export default function MainNav() {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
    const router = useRouter();
    const token = getToken();
    const {register, handleSubmit} = useForm();

    async function submitForm(data) {
        const searchValue = data.search;
        const queryString = `title=true&q=${searchValue}`
        setSearchHistory(
            await addToHistory(queryString)
        );
        router.push(`/artwork?${queryString}`)
    }

    async function logout() {
        await removetoken();
        await router.push('/login');
    }

    return (
        <main>


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
                            <Button variant="outline-success" type="submit"
                                    className="btn btn-outline-primary m-1"> Search </Button>

                        </Form>

                        <DropdownButton align="end" id="dropdown-item-button" title={token?.userName}>
                            {!token && <Link href={"/login"} legacyBehavior passHref>
                                <Dropdown.Item as="button">Login</Dropdown.Item>
                            </Link>}
                            {!token && <Link href={"/register"} legacyBehavior passHref>
                                <Dropdown.Item as="button">Register</Dropdown.Item>
                            </Link>}
                            {token && <Dropdown.Item as="button">Favourite</Dropdown.Item>}
                            {token && <Dropdown.Item as="button">History</Dropdown.Item>}
                            {token && <Dropdown.Item as="button" onClick={logout}>Logout</Dropdown.Item>}
                        </DropdownButton>

                    </Navbar.Collapse>

                </Container>
                <br/>
                <br/>
            </Navbar>
        </main>
    );
}

//{!token && }
//                                 {!token &&
//                                     <Link href="/login" legacyBehavior passHref>
//                                         <Nav.Link active={router.pathname === "/register"}>Login</Nav.Link>
//                                     </Link>}
//                                 {token && <Nav.Link onClick={logout}> Logout </Nav.Link>}
//                                 {token && <Link href="/favoruites" legacyBehavior passHref>
//                                     <Nav.Link style={{color: "#333", width: '100%'}}
//                                               className={styles.navLink}>Favourite</Nav.Link>
//                                 </Link>}
//                                 {token && <Link href="/history" legacyBehavior passHref>
//                                     <Nav.Link style={{color: "#333"}} className={styles.navLink}
//                                               active={router.pathname === "/history"}
//                                     >Search
//                                         History</Nav.Link>
//                                 </Link>}
