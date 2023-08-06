import React from 'react';
import Container from 'react-bootstrap/Container';
import { Image } from 'react-bootstrap';

function HomePage() {
return (
    <Container>
      <div className="h-25 d-inline-block">
        <Image
          src="https://i.ibb.co/Nr1jsxQ/soon.png" 
          alt="Alt text for the image"
          style={{ maxHeight: 300, opacity: 0.8 }}
        />
      </div>
    </Container>
);
};

export default HomePage;
