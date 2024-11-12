import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, MenuItem, Select } from "@mui/material";

function CadastrarFeedback() {
  const [nome, setNome] = useState("");
  const [avaliacao, setAvaliacao] = useState("");
  const [comentario, setComentario] = useState("");
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState([]);

  // Carregar os e-mails da API
  useEffect(() => {
    fetch("http://184.72.80.215/usuario")
      .then((response) => response.json())
      .then((data) => {
        const emailsList = data.map((user) => user.email);
        setEmails(emailsList);
      })
      .catch((error) => alert("Erro ao carregar emails: " + error.message));
  }, []);

  const createFeedback = () => {
    fetch("http://127.0.0.1:8080/api/v1/feedbacks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, avaliacao, comentario, email })
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao cadastrar feedback");
        alert("Feedback cadastrado com sucesso!");
        setNome("");
        setAvaliacao("");
        setComentario("");
        setEmail("");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Cadastrar Feedback</Typography>

      <TextField
        label="Nome"
        fullWidth
        margin="normal"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <TextField
        label="Avaliação"
        fullWidth
        margin="normal"
        value={avaliacao}
        onChange={(e) => setAvaliacao(e.target.value)}
      />
      <TextField
        label="Comentário"
        fullWidth
        margin="normal"
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
      />

      <Select
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        displayEmpty
      >
        <MenuItem value="" disabled>Selecione um e-mail</MenuItem>
        {emails.map((emailOption, index) => (
          <MenuItem key={index} value={emailOption}>{emailOption}</MenuItem>
        ))}
      </Select>

      <Button variant="contained" color="primary" onClick={createFeedback}>Cadastrar</Button>
    </Container>
  );
}

export default CadastrarFeedback;
