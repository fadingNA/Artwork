import React from "react";
import {searchHistoryAtom} from "../../store";
import {useAtom} from "jotai";
import {useRouter} from "next/router";
import {Card, ListGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import styles from '@/styles/History.module.css'
import {favoruitesAtom} from "../../store";
import {removeHistory} from "../../lib/userData";
export default function History() {
    const [searchHistory, setSearchHistoryAtom] = useAtom(searchHistoryAtom)
    const [favouritesList, setFavouritesList] = useAtom(favoruitesAtom)
    const router = useRouter();
    if (!favouritesList) return null;
    function historyClicked(e, index) {
        router.push(`/artwork/?${searchHistory[index]}`)
    }

    async function removeHistoryClicked(e, index) {
        e.stopPropagation();
        setSearchHistoryAtom(await removeHistory(searchHistory[index]))
        //setSearchHistoryAtom(true)
    }

    function parsedHistory() {
        let parsedHistory = [];
        searchHistory.forEach(h => {
            let params = new URLSearchParams(h);
            let entires = params.entries();
            parsedHistory.push(Object.fromEntries(entires));
        });
        return parsedHistory;
    }

    let history = parsedHistory();
    return (<div>
        {history.length === 0 ? (
            <Card className={"my-3 p-3"}>
                <Card.Body>
                    <h2>Nothing Here ... 🙁</h2>
                    <p>Try searching for some artwork.</p>
                </Card.Body>
            </Card>
        ) : (
            <ListGroup className={styles.historyListItem}>
                {history.map((historyItem, index) => (
                    <ListGroup.Item
                        key={index}
                        onClick={(e) => historyClicked(e, index)}>
                        {Object.keys(historyItem).map((key, i) => (
                            <span key={i}>
                                <strong> {key} </strong> : {historyItem[key]} <br/>
                            </span>
                        ))}
                        <Button
                            className={"float-end"}
                            variant="danger"
                            size="sm"
                            onClick={(e) => removeHistoryClicked(e, index)}>
                            &times;
                        </Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        )}
    </div>)
}