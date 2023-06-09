import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Todos from "./pages/Todos/Todos";
import Homepage from "./pages/Homepage/Homepage";

const supabase = createClient(
  "https://pjddmrvfhqzqdeddbrtl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqZGRtcnZmaHF6cWRlZGRicnRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYzMjY2MjgsImV4cCI6MjAwMTkwMjYyOH0.H7BxUHVOrGIMGRgyZDv1I4oMxYteWd4sbk1jiqtT-x4"
);

export default function App() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" Component={Homepage}></Route>
        <Route path="/todos" Component={Todos}></Route>
      </Routes>
    </Router>
  );
}
