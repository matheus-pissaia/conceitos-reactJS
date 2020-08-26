import React from "react";

import api from "./services/api";

import "./styles.css";
import { useState } from "react";
import { useEffect } from "react";

function App() {

  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {

    const response = await api.post('/repositories', {
      title: `New Project ${Date.now()}`
    });

    const newRepository = response.data;

    setRepositories([...repositories, newRepository]);
  }

  async function handleRemoveRepository(id) {
    
    await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter(
      
      repository => repository.id !== id

    ));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id} >

          {repository.title} 
          
          <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>

        </li> )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
