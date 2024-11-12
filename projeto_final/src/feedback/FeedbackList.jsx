import { useEffect, useState } from "react";

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    loadFeedbacks();
  }, []);

  function loadFeedbacks() {
    fetch("http://127.0.0.1:8080/api/v1/feedbacks", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao listar os feedbacks");
        return response.json();
      })
      .then((data) => {
        setFeedbacks(data.content || []); // Definindo os feedbacks
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  function deleteFeedback(id) {
    fetch(`http://localhost:8080/api/v1/feedbacks/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao excluir feedback");
        loadFeedbacks(); // Recarregar a lista após exclusão
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <td style={{ color: "black" }}>Nome</td>
            <td style={{ color: "black" }}>Avaliação</td>
            <td style={{ color: "black" }}>Comentário</td>
            <td style={{ color: "black" }}>Data</td>
            <td style={{ color: "black" }}>Email</td>
            <td style={{ color: "black" }}>Ações</td>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback.id}>
              <td style={{ color: "black" }}>{feedback.nome}</td>
              <td style={{ color: "black" }}>{feedback.avaliacao}</td>
              <td style={{ color: "black" }}>{feedback.comentario}</td>
              <td style={{ color: "black" }}>
                {new Date(feedback.data).toLocaleDateString() || "Data Indisponível"}
              </td>
              <td style={{ color: "black" }}>{feedback.email}</td>
              <td>
                <button onClick={() => deleteFeedback(feedback.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default FeedbackList;
