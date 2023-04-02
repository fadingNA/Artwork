import React, {useEffect, useState} from "react";
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
import {Col, DropdownButton, NavDropdown, Row} from "react-bootstrap";
import styles from '@/styles/History.module.css'
import {addToHistory} from "../../../lib/userData";
import {getToken, readToken, removetoken} from "../../../lib/Auth";
import {Dropdown} from "react-bootstrap";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import {IconButton} from "@material-ui/core";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

export default function MainNav({userName}) {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
    const router = useRouter();
    const token = readToken();
    const [isM, setIsM]  = useState(false);
    const {register, handleSubmit} = useForm();
    const [expanded, setExpanded] = useState(false);
    const [search, setSearch] = useState(false);
    console.log(userName)
    async function submitForm(data) {
        const searchValue = data.search;
        const queryString = `title=true&q=${searchValue}`
        setSearchHistory(
            await addToHistory(queryString)
        )
        if (search)  await setSearch(false);
        await router.push(`/artwork?${queryString}`)
    }

    useEffect(()=>{
        setIsM(true);
    },[])
    function searchBar(){
        if (search) {
            setSearch(false)
        }else{
            setSearch(true)
        }
    }
    async function logout() {
        await removetoken();
        setExpanded(false);
        await router.push('/login');
    }

    return (
        <React.Fragment>
            <Navbar bg={"dark"} collapseOnSelect>
                <Container>
                    {isM && token && token.userName ? (
                        <React.Fragment>
                            <Navbar.Brand href={"/"} className="text-white">Nonthachai Plodthong</Navbar.Brand>
                            <Navbar.Collapse className={"justify-content-end"}>
                                <Navbar.Text className={"text-white-50"}>
                                    Signed in as: {token.userName}
                                </Navbar.Text>
                            </Navbar.Collapse>
                        </React.Fragment>
                    ) : (
                        <Navbar.Brand href={"/"} className="text-white">
                             Nonthachai Plodthong
                        </Navbar.Brand>
                    )}
                    <IconButton type="submit" aria-label="search" onClick={searchBar}>
                        <SearchIcon style={{ fill: "whitesmoke" }} />
                    </IconButton>
                </Container>
            </Navbar>
            {search && (
                <Container>
                    <Form className={"mb-3"} onSubmit={handleSubmit(submitForm)} >
                    <IconButton type="submit" aria-label="search">
                        <SearchIcon style={{ fill: "black" }} />
                    </IconButton>
                    <Container className={"mt-2"}>
                            <Form.Control type={"search"} placeholder={"Search your artwork"} {...register ("search")}/>
                    </Container>
                    </Form>
                </Container>
            )}
        </React.Fragment>
    )
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
