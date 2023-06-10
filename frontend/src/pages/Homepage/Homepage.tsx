import { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./Homepage.css";

export default function Homepage({ supabase, session }) {
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        navigate("/todos");
      }
    });
  }, []);

  return (
    <div className="Homepage">
      <Navbar supabase={supabase} session={session} />
      <h1 className="title">Log in to start using the app</h1>

      <div className="container">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["google", "github", "discord"]}
        />
      </div>
    </div>
  );
}
