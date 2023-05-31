import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button, Form, ListGroup, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import './ChatPage.css'; // Import custom styles
import FileUpload from '../components/FileUpload';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../App.css'; //Import css styles from app.css
//Initialize  FontAwesome library 
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Alert } from 'react-bootstrap';

import UserProfile from '../components/UserProfile';


library.add(faSpinner);

const ChatPage = () => {
const [userInput, setUserInput] = useState('');
const [error, setError] = useState({ message: '', statusCode: null });
const [messages, setMessages] = useState([]);
const [isBotTyping, setIsBotTyping] = useState(false);
const [fileNames, setFileNames] = useState([]);
const [selectedFile, setSelectedFile] = useState({ display: 'All Files', value: null });
const codeRegex = /```(.*?)```/s;

useEffect(() => {
    const fetchFileNames = async () => {
    try {
    const response = await axios.get('http://0.0.0.0:8000/filenames_json');
    setFileNames(response.data);
    } catch (error) {
    console.error(error);
    }
};

fetchFileNames();
}, []);

const handleFileSelect = (file) => {
    if (file === 'All Files') {
    setSelectedFile({ display: 'All Files', value: null });
} else {
    const fileName = file.split('/').pop(); // get  file name without  "upload/" 
    setSelectedFile({ display: fileName, value: file });
}
};
const handleFileUploadMessage = (message) => {
setMessages([...messages, { type: 'bot', content: message }]);
};

const chatHistoryRef = useRef(null);

useEffect(() => {
  // Scroll to the bottom of the chat history when a new message is added or when the bot is typing
  chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
}, [messages, isBotTyping]);
const generateMessageID = () => {
    return "msg-" + Math.random().toString(36).substr(2, 9);
};

const handleChange = (e) => {
setUserInput(e.target.value);
};

const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInput.trim() === '') return;

const newMessage = {
    id: generateMessageID(),
    type: 'user',
    content: userInput,
};

// const CodeBlock = ({ language, code }) => {
const CodeBlock = ({  language, code }) => {
    return (
      <SyntaxHighlighter
         language={language}
        style={dark}
        // showLineNumbers={true}
        className="code-block"
      >
        {code}
      </SyntaxHighlighter>
    );
  };


setMessages((prevMessages) => [...prevMessages, newMessage]);
setIsBotTyping(true); 
try {
    const response = await axios.post('http://0.0.0.0:8000/chat_question', {
        user_input: userInput,
        file_name: selectedFile.value,
        });
    
        if (response.status === 422 || response.status === 500) {
        setError({ message: response.data.detail, statusCode: response.status });
        } else {
        const botMessage = {
            id: generateMessageID(),
            type: 'bot',
            content: response.data.response,
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
    } catch (error) {
        console.error(error);
        setError({ message: 'An error occurred. Please Try Again.', statusCode: null });
    } finally {
        setIsBotTyping(false);
    }
    
setUserInput('');
};

return (
<Container fluid className="mt-4">
    <Row>
    <Col md={8}>
        <Card className="chat-card shadow">
        <Card.Header className="card-header-custom text-white">
            <h4 className="mb-0">Chat with your data</h4>
        </Card.Header>
        <Card.Body className="chat-body overflow-auto" ref={chatHistoryRef} >
        {messages.length > 0 ? (
        <ListGroup>

{messages.map((message) => {
const codeMatches = message.content.match(codeRegex);
let contentWithoutCode = message.content;
let codeBlock = '';

if (codeMatches) {
contentWithoutCode = message.content.replace(codeRegex, '');
codeBlock = (
    <SyntaxHighlighter language="bash" style={dark}>
    {codeMatches[1]}
    </SyntaxHighlighter>
);
}

return (
<ListGroup.Item
    key={message.id}
    className={`text-${message.type === 'user' ? 'end user' : 'start bot'}`}
>
    <span dangerouslySetInnerHTML={{ __html: contentWithoutCode.replace(/\n\n/g, '<br/>') }}></span>
    {codeBlock}
</ListGroup.Item>
);
})}
                {error.message && (
    <Alert variant="danger" onClose={() => setError({ message: '', statusCode: null })} dismissible>
        {error.message}
    </Alert>
    )}

            {/* {message.type === 'user' ? 'You: ' : 'Bot: '} */}
            {/* {message.content} */}
        {isBotTyping && (
            <ListGroup.Item className="text-start bot">
                <em>Bot:</em> Typing... <FontAwesomeIcon icon="spinner" spin />
            </ListGroup.Item>
            )}
        </ListGroup>
        
            ) : (
            <div className="chat-empty-state">
                <i className="bi bi-chat-dots-fill fs-1 mb-4"></i>
                <p className="mb-2">No messages yet.</p>
                <p>Start typing to chat with your data!</p>
            </div>
            )}
        </Card.Body>
        <Card.Footer>
        <div className="position-relative">
            <Form onSubmit={handleSubmit}>
            <Row>
                <Col md={3}>
                <div className="dropdown-container">
                <Dropdown onSelect={handleFileSelect}>
    <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic" className="text-truncate" style={{ maxWidth: "150px" }}>
        <i className="bi bi-file-earmark-text me-2"></i> {selectedFile.display}
    </Dropdown.Toggle>
    <Dropdown.Menu className="dropdown-menu-custom">
    <Dropdown.Item eventKey="All Files">All Files</Dropdown.Item>
    {fileNames.map((fileName, index) => {
        const trimmedFileName = fileName.split('/').pop(); // get the file name without the "upload/" part
        return (
            <Dropdown.Item key={index} eventKey={fileName}>
                <i className="bi bi-file-earmark-text me-2"></i> {trimmedFileName}
            </Dropdown.Item>
        );
    })}
</Dropdown.Menu>
</Dropdown>
                </div>
                </Col>
                <Col md={6}>
                <Form.Control
                    type="text"
                    placeholder="Ask a question"
                    value={userInput}
                    onChange={handleChange}
                    className="mt-2 mt-md-0"
                />
                </Col>
                <Col md={3}>
                <Button type="submit" className="w-100 mt-2 mt-md-0 chat-send-btn">
                    <i className="bi bi-arrow-right-circle-fill me-2"></i> Send
                </Button>
                </Col>
            </Row>
            </Form>
        </div>
        </Card.Footer>
        </Card>
    </Col>
    <Col md={4} className="d-flex align-items-center">
        <div className="file-upload-container">
        <FileUpload onUpload={handleFileUploadMessage} />
        </div>
    </Col>
    </Row>

</Container>
);
};

export default ChatPage;