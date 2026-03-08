"use client";

import { useState } from "react";

const questions = [
  {
    q: "Qual bioma ocupa cerca de 25% do território brasileiro?",
    options: ["Amazônia", "Caatinga", "Cerrado"],
    answer: "Cerrado"
  },
  {
    q: "Qual destes animais é símbolo do Cerrado?",
    options: ["Lobo-guará", "Pinguim", "Baleia-azul"],
    answer: "Lobo-guará"
  },
  {
    q: "Uma atitude de proteção ambiental é:",
    options: ["Queimar lixo", "Preservar nascentes", "Desmatar áreas"],
    answer: "Preservar nascentes"
  }
];

export function CerradoQuiz() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  function answer(option: string) {
    if (option === questions[index].answer) setScore((prev) => prev + 1);
    if (index + 1 >= questions.length) {
      setFinished(true);
    } else {
      setIndex((prev) => prev + 1);
    }
  }

  if (finished) {
    return (
      <div className="rounded-lg bg-white p-4">
        <h3 className="text-lg font-semibold">Quiz finalizado!</h3>
        <p>
          Você acertou {score} de {questions.length} perguntas.
        </p>
      </div>
    );
  }

  const question = questions[index];

  return (
    <div className="rounded-lg bg-white p-4">
      <h3 className="text-lg font-semibold">Quiz do Cerrado</h3>
      <p className="mt-2 font-medium">{question.q}</p>
      <div className="mt-4 flex flex-col gap-2">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => answer(option)}
            className="rounded border border-cerrado-200 px-3 py-2 text-left hover:bg-cerrado-50"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
