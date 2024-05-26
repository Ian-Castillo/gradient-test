import React, { useState } from 'react';
import Countdown from './components/Countdown';
import './App.css';

const App = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formActionUrl = process.env.REACT_APP_MAILCHIMP_URL;
    const response = await fetch(formActionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email_address: email }),
    });
    if (response.ok) {
      setSubmitted(true);
    } else {
      alert('There was an error submitting your email. Please try again.');
    }
  };

  const targetDate = new Date('2024-12-31T23:59:59');

  return (
    <div className="App">
      <div className="logo">GRADIENT</div>
      <Countdown targetDate={targetDate} />
      <div className="center">
        {!showForm && (
          <button className="cta-button" onClick={handleClick}>
            click here
          </button>
        )}
        {showForm && !submitted && (
          <form onSubmit={handleSubmit} className="email-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ian@test.com"
              required
            />
            <button type="submit">submit</button>
          </form>
        )}
        {submitted && <div className="welcome-message">see you soon</div>}
      </div>
    </div>
  );
};

export default App;