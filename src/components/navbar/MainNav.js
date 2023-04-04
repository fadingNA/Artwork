import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Link from "next/link";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {searchHistoryAtom} from "../../../store";
import {addToHistory} from "../../../lib/userData";
import {readToken, removetoken} from "../../../lib/Auth";
import {IconButton} from "@material-ui/core";
import SearchIcon from '@mui/icons-material/Search';

export default function MainNav({userName}) {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
    const router = useRouter();
    const token = readToken();
    const [isM, setIsM] = useState(false);
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
        if (search) await setSearch(false);
        await router.push(`/artwork?${queryString}`)
    }

    useEffect(() => {
        setIsM(true);
    }, [])

    function searchBar() {
        if (search) {
            setSearch(false)
        } else {
            setSearch(true)
        }
    }

    async function logout() {
        await removetoken();
        await setExpanded(false);
        await router.push('/login');
    }

    return (
        <React.Fragment>
            <Navbar bg={"dark"} collapseOnSelect>
                <Container className={'flex-row'}>
                    {isM && token && token.userName ? (
                        <React.Fragment>
                            <Navbar.Brand href={"/"} className="text-white">Nonthachai Plodthong</Navbar.Brand>
                            <Navbar.Collapse className={"#"}>
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
                        <SearchIcon style={{fill: "whitesmoke"}}/>
                    </IconButton>
                    {isM && token && token.userName ? (
                        <Button onClick={logout}>
                            Logout </Button>
                    ) : (
                        <Container className={'justify-content-between'}>
                            <Link href={'/login'} passHref legacyBehavior>
                                <Button type={'button'} variant={'outline-danger'}
                                        className={'btn btn-outline-white float-end m-2'}>Login</Button>
                            </Link>
                            <Link href={'/register'} passHref legacyBehavior>
                                <Button type={'button'} variant={'outline-light'}
                                        className={'btn btn-outline-white float-end m-2'}>Register</Button>
                            </Link>
                        </Container>
                    )}
                </Container>
            </Navbar>
            {search && (
                <Container>
                    <Form className={"mb-3"} onSubmit={handleSubmit(submitForm)}>
                        <IconButton type="submit" aria-label="search">
                            <SearchIcon style={{fill: "black"}}/>
                        </IconButton>
                        <Container className={"mt-2"}>
                            <Form.Control type={"search"} placeholder={"Search your artwork"} {...register("search")}/>
                        </Container>
                    </Form>
                </Container>
            )}
        </React.Fragment>
    )
}


//{search && (
//                         <Container>
//                             <Form className={"mt-3"} style={{display: 'flex'}} onSubmit={handleSubmit(submitForm)}>
//                                 <IconButton type="submit" aria-label="search">
//                                     <SearchIcon style={{fill: "black"}}/>
//                                 </IconButton>
//                                 <Container className={"mt-2"}>
//                                     <Form.Control type={"search"}
//                                                   placeholder={"Search your artwork"}
//                                                   {...register("search")}/>
//                                 </Container>
//                             </Form>
//                         </Container>
//                     )}

//<React.Fragment>
//             <Navbar bg={"dark"} expand={"lg"} collapseOnSelect>
//                 <Container>
//                     {isM && token && token.userName ? (
//                         <React.Fragment>
//                             <Navbar.Brand href={"/"} className="text-white">Nonthachai Plodthong</Navbar.Brand>
//                             <Navbar.Toggle aria-controls={"basic-navbar-nav"}/>
//                             <Navbar.Collapse className={'text-white mt-1'}>
//                                 <Link href={'search'} legacyBehavior passHref>
//                                     <Nav.Link>Advanced search</Nav.Link>
//                                 </Link>
//                             </Navbar.Collapse>
//                             <Navbar.Collapse className={"justify-content-end"}>
//                                 <Navbar.Text className={"text-white-50 justify-content-end"}>
//                                     Signed in as: {token.userName}
//                                 </Navbar.Text>
//                                 <Button variant={"outline-light"} onClick={logout}>Logout</Button>
//                             </Navbar.Collapse>
//                         </React.Fragment>
//                     ) : (
//                         <React.Fragment>
//                             <Navbar.Brand href={"/"} className="text-white">
//                                 Nonthachai Plodthong
//                             </Navbar.Brand>
//                             <Navbar.Toggle aria-controls={"basic-navbar-nav"}/>
//                             <Navbar.Collapse >
//                                 <Link href={'/login'} passHref legacyBehavior>
//                                     <Button variant={"outline-light"}>Sign in</Button>
//                                 </Link>
//                             </Navbar.Collapse>
//                         </React.Fragment>
//
//                     )}
//                     <Button onClick={searchBar}>
//                         <SearchIcon style={{fill: 'white'}}/>
//                     </Button>
//                 </Container>
//             </Navbar>

//{!
//
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
//<Container>
//                         <Link href={'/search'} passHref legacyBehavior>
//                             <Nav.Link className={"text-white"}>
//                                 Advance Search
//                             </Nav.Link>
//                         </Link>
//                     </Container>
//                     <IconButton type="submit" aria-label="search" onClick={searchBar}>
//                         <SearchIcon style={{fill: "whitesmoke"}}/>
//                     </IconButton>
//                     {isM && token && (
//                         <Link href={'/login'} passHref legacyBehavior>
//                             <Button onClick={logout}>Logout</Button>
//                         </Link>
//                     )}
//
//                     {!token && (
//                         <Link href={'/login'} passHref legacyBehavior>
//                             <Button variant={'outline-light'} className={'m-sm-2'}>Login</Button>
//                         </Link>
//                     )}
//                     {!token && (
//                         <Link href={'/register'} passHref legacyBehavior>
//                             <Button variant={'outline-light'}>Register</Button>
//                         </Link>
//                     )}
//                 </Container>
//             </Navbar