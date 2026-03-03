import { useState, useCallback } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Welcome from "./pages/Welcome";
import Checklist from "./pages/Checklist";
import Results from "./pages/Results";
import { totalItems } from "./data/checklistData";

const STORAGE_KEY = "dsc-checked";

function loadChecked() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw));
  } catch {}
  return new Set();
}

function saveChecked(set) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch {}
}

function AppContent() {
  const [checkedIds, setCheckedIds] = useState(loadChecked);

  const handleToggle = useCallback((id) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveChecked(next);
      return next;
    });
  }, []);

  const handleReset = useCallback(() => {
    const empty = new Set();
    saveChecked(empty);
    setCheckedIds(empty);
  }, []);

  return (
    <>
      <Header
        totalChecked={checkedIds.size}
        totalItems={totalItems}
      />
      <Routes>
        <Route path="/" element={<Welcome onReset={handleReset} />} />
        <Route
          path="/checklist"
          element={
            <Checklist checkedIds={checkedIds} onToggle={handleToggle} />
          }
        />
        <Route
          path="/results"
          element={
            <Results checkedIds={checkedIds} onReset={handleReset} />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
