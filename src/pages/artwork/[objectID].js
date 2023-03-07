import ArtworkCardDetail from "@/components/artwork/Artwork";

import {Col, Row} from "react-bootstrap"

import {useRouter} from "next/router";

export default function ArtworkById() {
    const router = useRouter();
    const {objectID} = router.query;
    return (<div>
        <Row>
            <Col>
                <p>Test</p>
                <ArtworkCardDetail objectID={objectID}/>
            </Col>
        </Row>
    </div>)
}