import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';

export default function Popup() {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(true)} dismissible>
        <Alert.Heading>Login Error</Alert.Heading>
        <p>
          Incorrect username or password. Please try again
          <small>No account? <Link style={{ textDecoration: 'none '}} to='/register'>Register here</Link></small>
        </p>
      </Alert>
    );
  }
}
