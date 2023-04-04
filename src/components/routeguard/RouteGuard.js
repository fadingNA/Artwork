import {favoruitesAtom} from "../../../store";
import {searchHistoryAtom} from "../../../store";
import {useAtom} from "jotai";
import {getHistory, getFav} from "../../../lib/userData";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {isAuthenticated} from "../../../lib/Auth";

export default function RouteGuard(props) {
    const PUBLIC_PATHS = ['/register', '/login', '/_error']
    const [favouriteList, setFavList] = useAtom(favoruitesAtom);
    const [authorized, setAuthorized] = useState(false);
    const [historyList, setHistoryList] = useAtom(searchHistoryAtom);
    const router = useRouter();

    async function updateAtoms() {
        setFavList(await getFav());
        setHistoryList(await getHistory());
    }

    useEffect(() => {
        updateAtoms();
        authCheck(router.pathname);
        // on route change complete - run auth check
        router.events.on('routeChangeComplete', authCheck);
        // unsub from events in useEffect Return Function
        return () => {
            router.events.off('routeChangeComplete', authCheck);
        };
    }, []);


    function authCheck(url) {
        const path = url.split('?')[0];
        if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
            console.log(`trying to request a secure path : ${path}`)
            setAuthorized(false);
            router.push('/login');
        } else {
            setAuthorized(true);
        }
    }

    return (<>{authorized && props.children}</>)
}