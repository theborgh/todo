import Navbar from "../../components/Navbar/Navbar";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

export default function Homepage() {
  const navigate = useNavigate();
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL as string,
    import.meta.env.VITE_SUPABASE_ANON_KEY as string
  );

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
      navigate("/todos");
    }
  });

  return (
    <div className="Homepage">
      <Navbar />
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
