import {favoruitesAtom} from "../../../store";
import {searchHistoryAtom} from "../../../store";
import {useAtom} from "jotai";
import {getHistory, getFav} from "../../../lib/userData";
import {useEffect} from "react";
export default function RouteGuard(props){
    const PUBLIC_PATHS = ['/register']
    const [favouriteList, setFavList] = useAtom(favoruitesAtom);
    const [historyList, setHistoryList] = useAtom(searchHistoryAtom);

    useEffect(() =>{
        async function updateAtoms(){
            setFavList(await getFav());
            setHistoryList(await getHistory());
        }
    },[])


    return (<>{props.children}</>)
}