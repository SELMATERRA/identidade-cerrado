"use client";

import { useState } from "react";

const actions = [
  { id: "a1", text: "Plantar espécies nativas", type: "proteger" },
  { id: "a2", text: "Jogar lixo no rio", type: "ameaça" },
  { id: "a3", text: "Economizar água", type: "proteger" },
  { id: "a4", text: "Caça ilegal", type: "ameaça" }
];

export function ProtectNatureGame() {
  const [score, setScore] = useState(0);
  const [done, setDone] = useState<string[]>([]);

  function handleDrop(expected: "proteger" | "ameaça", itemType: string, id: string) {
    if (done.includes(id)) return;
    if (expected === itemType) setScore((prev) => prev + 1);
    setDone((prev) => [...prev, id]);
  }

  return (
    <div className="space-y-4 rounded-lg bg-white p-4">
      <h3 className="text-lg font-semibold">Arraste e solte: Protegendo a Natureza</h3>
      <p className="text-sm text-cerrado-700">Pontuação: {score}</p>

      <div className="grid gap-3 md:grid-cols-2">
        {(["proteger", "ameaça"] as const).map((zone) => (
          <div
            key={zone}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const itemType = e.dataTransfer.getData("type");
              const id = e.dataTransfer.getData("id");
              handleDrop(zone, itemType, id);
            }}
            className="min-h-28 rounded border-2 border-dashed border-cerrado-300 p-3"
          >
            <p className="font-semibold capitalize">{zone}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-2">
        {actions.map((action) => (
          <div
            key={action.id}
            draggable={!done.includes(action.id)}
            onDragStart={(e) => {
              e.dataTransfer.setData("type", action.type);
              e.dataTransfer.setData("id", action.id);
            }}
            className="cursor-grab rounded border border-cerrado-200 bg-cerrado-50 p-2"
          >
            {action.text} {done.includes(action.id) ? "✅" : ""}
          </div>
        ))}
      </div>
    </div>
  );
}
