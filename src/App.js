import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [techs, setTechs] = useState("");

  useEffect(() => {
    loadRepositories();
  }, []);

  async function loadRepositories() {
    await api
      .get("repositories")
      .then((response) => {
        setRepositories(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function handleAddRepository() {
    // TODO
    await api
      .post("repositories", {
        title: title,
        url: url,
        techs: techs == "" ? null : techs.split(","),
      })
      .then(function (response) {
        //console.log(response);
        const repository = response.data;
        setRepositories([...repositories, repository]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api
      .delete(`repositories/${id}`)
      .then(function (response) {
        //console.log(response);
        setRepositories([
          ...repositories.filter((repository) => repository.id !== id),
        ]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function handleLikeRepository(id) {
    await api
      .post(`repositories/${id}/like`)
      .then(function (response) {
        //console.log(response);
        loadRepositories();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Tecnologias com vírgulas"
        value={techs}
        onChange={(e) => setTechs(e.target.value)}
      />
      <br />
      <button onClick={handleAddRepository}>Adicionar</button>
      <br />
      <br />
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleLikeRepository(repository.id)}>
              {`Curtir - ${repository.likes} like(s)`}
            </button>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
