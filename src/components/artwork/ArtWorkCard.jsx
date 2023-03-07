import React from "react";
import useSWR from 'swr';
import {Card, Button} from 'react-bootstrap';
import Error from 'next/error';
import Link from 'next/link';

const ArtworkCard = ({objectID}) => {
    const {data, error} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);

    if (error) {
        return <Error statusCode={404}/>;
    }

    if (!data) {
        return null;
    }

    const {primaryImageSmall, title, objectDate, classification, medium} = data;

    const imageUrl = primaryImageSmall ? primaryImageSmall : 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]';

    return (<>
            <Card>
                <Card.Img variant="top" src={imageUrl}/>
                <Card.Body>
                    <Card.Title>{title || 'N/A'}</Card.Title>
                    <Card.Text>
                        {objectDate || 'N/A'}
                        <br/>
                        {classification || 'N/A'}
                        <br/>
                        {medium || 'N/A'}
                    </Card.Text>
                    <Link href={`/artwork/${objectID}`} passHref>
                        <Button variant="outline-secondary">
                            <storng>ID :</storng>
                            {objectID}</Button>
                    </Link>
                </Card.Body>
            </Card></>
    );
};

export default ArtworkCard;
