import {useRouter} from "next/router";
import useSWR from "swr";
import React, {useState, useEffect} from "react";
import Error from "next/error";
import {Card, Col, Pagination, Row, Spinner} from "react-bootstrap";
import ArtworkCard from "@/components/artwork/ArtWorkCard";
import validObjectIDList from '@/public/validObjectIDList.json'

export default function Homes() {
    const [artWorkList, setArtWorkList] = useState([]);
    const [page, setPage] = useState(1);
    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];
    const {data, error, isLoading} = useSWR(`
    https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`)
    useEffect(() => {
        const PER_PAGE = 10;
        const results = [];
        let filteredResults = validObjectIDList.objectIDs.filter(x => data && data.objectIDs && data.objectIDs?.includes(x));
        if (data?.objectIDs) {
            for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
                const chunk = filteredResults.slice(i, i + PER_PAGE);
                results.push(chunk);
            }
            setArtWorkList(results);
            setPage(1);
        }
    }, [data]);
    // Use effect cannot put conditional render have to be same
    // in every Component

    if (isLoading) {
        return <Spinner/>
    }

    function previousPage() {
        if (page >= 2) {
            setPage(page - 1);
        }
    }

    function nextPage() {
        if (page < artWorkList.length) {
            setPage(page + 1);
        } else {
            setPage(artWorkList.length);
        }
    }

    //console.log(artWorkList)
    if (error) {
        return <Error statusCode={404}/>
    }
    return (
        <>
            <Row className="gy-4">
                {artWorkList.length > 0 ? (
                    artWorkList[page - 1].map((currentObjectID) => (
                        <Col lg={3} key={currentObjectID}>
                            <ArtworkCard objectID={currentObjectID}/>
                        </Col>
                    ))
                ) : (
                    <Card body>No art work here.</Card>
                )}
            </Row>
            {artWorkList.length > 0 && (
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Pagination>
                            <Pagination.Prev onClick={previousPage}/>
                            <Pagination.Item>{page}</Pagination.Item>
                            <Pagination.Next onClick={nextPage}/>
                        </Pagination>
                    </Col>
                </Row>
            )}
        </>
    );
};
