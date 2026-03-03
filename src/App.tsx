import { useState, useCallback } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Welcome from "./pages/Welcome";
import Slideshow from "./pages/Slideshow";
import Summary from "./pages/Summary";

const STORAGE_KEY = "dsc-completed-phases";

function loadCompleted(): Set<number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set<number>(JSON.parse(raw) as number[]);
  } catch {}
  return new Set<number>();
}

function saveCompleted(set: Set<number>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch {}
}

function AppContent() {
  const [completedPhases, setCompletedPhases] = useState(loadCompleted);

  const handleComplete = useCallback((phaseId: number) => {
    setCompletedPhases((prev) => {
      if (prev.has(phaseId)) return prev;
      const next = new Set(prev);
      next.add(phaseId);
      saveCompleted(next);
      return next;
    });
  }, []);

  const handleReset = useCallback(() => {
    const empty = new Set<number>();
    saveCompleted(empty);
    setCompletedPhases(empty);
  }, []);

  return (
    <>
      <Header completedPhases={completedPhases} />
      <Routes>
        <Route
          path="/"
          element={<Welcome completedPhases={completedPhases} onReset={handleReset} />}
        />
        {/* Unified slideshow — covers learn + activity for a phase */}
        <Route
          path="/phase/:phaseId"
          element={<Slideshow onComplete={handleComplete} />}
        />
        {/* Legacy redirects for any old bookmarks */}
        <Route path="/phase/:phaseId/learn" element={<Navigate to="/phase/:phaseId" replace />} />
        <Route path="/phase/:phaseId/activity" element={<Navigate to="/phase/:phaseId" replace />} />
        <Route
          path="/summary"
          element={<Summary completedPhases={completedPhases} onReset={handleReset} />}
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
