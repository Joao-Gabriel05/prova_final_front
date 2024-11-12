import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import FeedbackList from "./feedback/FeedbackList"; // Importando o componente de FeedbackList
import CadastrarFeedback from "./feedback/FeedBackPost"; // Importando o componente de CadastrarFeedback
import './App.css';

function App() {
  return (
    <>
      <div>
        <h1>Feedbacks</h1>
        <nav>
          <ul>
            <li>
              <Link to="/listar">Listar Feedbacks</Link>
            </li>
            <li>
              <Link to="/registrar">Registrar Novo Feedback</Link>
            </li>
          </ul>
        </nav>
        
        <Routes>
          <Route path="/listar" element={<FeedbackList />} />
          <Route path="/registrar" element={<CadastrarFeedback />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
