import React, {useEffect, useState} from "react";
import useSWR from 'swr';
import {Card} from 'react-bootstrap';
import Error from 'next/error';
import {useAtom} from 'jotai';
import {favoruitesAtom} from "../../../store";
import Button from "react-bootstrap/Button";
import {addToFav, removeFromFav} from "../../../lib/userData";

const ArtworkCardDetail = ({objectID}) => {
    const {
        data,
        error
    } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null);
    const [favouriteList, setFavouriteList] = useAtom(favoruitesAtom);
    const [showAdded, setShowAdded] = useState(false); //favouriteList.includes(objectID)
    useEffect(() => {
        setShowAdded(favouriteList?.includes(objectID));
    }, [favouriteList])

    async function favouritesClicked() {
        if (showAdded) {
            setFavouriteList(await removeFromFav(objectID))
            //setFavouriteList(current => current.filter(fav => fav !== objectID))
            setShowAdded(false)
        } else {
            setFavouriteList(await addToFav(objectID))
            setShowAdded(true)
        }

    }

    if (error) {
        return <Error statusCode={404}/>;
    }

    if (!data) {
        return null;
    }
    //console.log(data)
    const {
        primaryImage,
        title,
        objectDate,
        classification,
        medium,
        artistDisplayName,
        artistWikidata_URL,
        creditLine,
        dimensions,
    } = data;

    return (
        <Card>
            {primaryImage && <Card.Img variant="top" src={primaryImage}/>}
            <Card.Body>
                <Card.Title>{title || 'N/A'}</Card.Title>
                <Card.Text>
                    {objectDate || 'N/A'}
                    <br/>
                    {classification || 'N/A'}
                    <br/>
                    {medium || 'N/A'}
                    <br/>
                    {artistDisplayName && (
                        <>
                            {artistDisplayName}{' '}
                            <a href={artistWikidata_URL} target="_blank" rel="noreferrer">
                                wiki
                            </a>
                            <br/>
                        </>
                    )}
                    {creditLine || 'N/A'}
                    <br/>
                    {dimensions || 'N/A'}
                    <br/>
                    <br/>
                    <Button variant={"primary"} onClick={favouritesClicked}>
                        {showAdded ? "+ Favourite (added)" : "Add to your favourite"}
                    </Button>
                    <br/>

                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ArtworkCardDetail;
