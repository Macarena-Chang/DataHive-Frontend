import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function ResetPassword() {
    return (
        <Modal.Dialog>
            <Modal.Header>
                <Modal.Title>Reset Password</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll send you an email to reset your password.
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary">Close</Button>
                <Button variant="primary">Reset Password</Button>
            </Modal.Footer>
        </Modal.Dialog>
    );
}
