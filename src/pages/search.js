import React, {useEffect} from "react";
import Form from "react-bootstrap/Form";
import {Col, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {searchHistoryAtom} from "../../store";
import {useAtom} from "jotai";
import {addToHistory} from "../../lib/userData";

export default function AdvanceSearch() {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
    const {register, handleSubmit, formState: {errors}, setValue} = useForm();
    const router = useRouter();

    async function submitForm(data) {
        let queryString = "searchBy=true";
        if (data.geoLocation) {
            queryString += `&geoLocation=${encodeURI(data.geoLocation)}`;
        }
        if (data.medium) {
            queryString += `&medium=${encodeURI(data.medium)}`;
        }
        queryString += `&isOnView=${data.isOnView}`;
        queryString += `&isHighlight=${data.isHighlight}`;
        queryString += `&q=${encodeURIComponent(data.q)}`;
        setSearchHistory(
            await addToHistory(queryString)
        )
        router.push(`/artwork?${queryString}`);
    }

    function handleCheckbox(e) {
        setValue(e.target.name, e.target.checked);
    }

    useEffect(() => {
        register('isOnview');
        register('isHighlight');
        //register('q', {required: true})
    }, [register])

    return (
        <div>
            <Form onSubmit={handleSubmit(submitForm)}>
                <Row>
                    <Col>
                        <Form.Group className={"mb-3"}>
                            <Form.Label>Search Query</Form.Label>
                            <Form.Control type={"text"} placeholder={""} {...register("q",
                                {required: true})} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Label>
                            Search By
                        </Form.Label>
                        <Form.Select name={"searchBy"} className={"mb-3"}>
                            <option value="title">Title</option>
                            <option value="tags">Tags</option>
                            <option value="artistOrCulture">Artist Or Culture</option>
                        </Form.Select>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Geo Location</Form.Label>
                            <Form.Control type="text" placeholder={""} name={"geoLocation"}/>
                            <Form.Text className={"text-muted"}>
                                Case Sensitive String
                                (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New
                                York&quot;, etc.), with multiple values separated by the | operator
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Medium</Form.Label>
                            <Form.Control type="text" placeholder="" name="medium"/>
                            <Form.Text className="text-muted">
                                Case Sensitive String
                                (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;,
                                etc.), with multiple values separated by the | operator
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check
                            type="checkbox"
                            label="Highlighted"
                            name={"isHighlight"}
                            onChange={handleCheckbox}/>
                        <Form.Check
                            type="checkbox"
                            label="Currently on View"
                            name="isOnView"
                            onChange={handleCheckbox}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <br/>
                        <Button variant="primary" type={"submit"} disabled={Object.keys(errors).length > 0}>
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}