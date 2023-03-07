import React from "react";
import useSWR from 'swr';
import {Card} from 'react-bootstrap';
import Error from 'next/error';

const ArtworkCardDetail = ({objectID}) => {
    const {data, error} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);

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
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ArtworkCardDetail;
