
import { Paper } from "@mui/material";
import { Form, Button } from "react-bootstrap";

export default function StudyMaterial() {
    return (

        <>
            <Paper elevation={10} style={{ width: '45%', height: '50vh' }}>
                <Form style={{ width: '80%', marginLeft: '30px', fontWeight: 'bolder' }}>
                    <Form.Group className="mb-3" controlId="formBasicSubject">
                        <Form.Label>Subject</Form.Label>
                        <Form.Control type="text" placeholder="Enter Subject name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicTopic">
                        <Form.Label>Topic</Form.Label>
                        <Form.Control type="text" placeholder="Enter Topic name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicFile" style={{ width: '19%' }}>
                        <Form.Label>Upload Notes</Form.Label>
                        <Form.Control type="file" placeholder="" />
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{ marginLeft: '40%' }}>
                        Add material
                    </Button>
                </Form>
            </Paper>
        </>
    )
}