import React, { useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/tasks/test?input=${encodeURIComponent(inputValue)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Response data:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
      <div className="App">
        <form onSubmit={handleSubmit}>
          <input
              type="text"
              placeholder="input the text here"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
  );
}

export default App;