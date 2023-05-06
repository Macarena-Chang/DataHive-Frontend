import React, { useState } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const FileUpload = ({ onUpload }) => {
const [uploadedFiles, setUploadedFiles] = useState([]);
const [uploading, setUploading] = useState(false);
const [error, setError] = useState('');

const [uploadMessage, setUploadMessage] = useState('');

const handleFileUpload = (e) => {
const files = Array.from(e.target.files);
setUploadedFiles(files);
};

const handleFileSubmit = async (e) => {
e.preventDefault();

setUploading(true);
setError('');

const formData = new FormData();
uploadedFiles.forEach((file) => {
    formData.append('files', file);
});

try {
    const response = await axios.post('http://0.0.0.0:8000/upload', formData, {
    headers: {
    'Content-Type': 'multipart/form-data',
    },
});

onUpload(response.data.message);
setUploadMessage(response.data.message);
setUploadedFiles([]);
} catch (error) {
setError('An error occurred while uploading the files. Please try again.');
} finally {
setUploading(false);
}
};

return (
<Card className="file-upload-card">
<Card.Header className="bg-primary text-white">
    <h5 className="mb-0">Upload Files</h5>
</Card.Header>
<Card.Body>
    {error && <Alert variant="danger">{error}</Alert>}
    <Form onSubmit={handleFileSubmit}>
    <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Accepted file types: PDF, DOC, DOCX, TXT</Form.Label>
        <Form.Control
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.txt"
        onChange={handleFileUpload}
        />
    </Form.Group>
    <Button type="submit" className="w-100" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
    </Button>
    {uploadMessage && <div className="mt-3">{uploadMessage}</div>}
    </Form>
</Card.Body>
</Card>
);
};

export default FileUpload;