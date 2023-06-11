import { useEffect } from "react";
import { SupabaseClient, Session } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./Homepage.css";

interface HomepageProps {
  supabase: SupabaseClient;
  session: Session;
}

export default function Homepage({ supabase, session }: HomepageProps) {
  const navigate = useNavigate();
  useEffect(() => {
    const createUserIfNotExists = async (userId: string) => {
      try {
        const { error } = await supabase
          .from("users")
          .upsert([{ id: userId }], { onConflict: "id" });

        if (error) {
          throw error;
        }
      } catch (error) {
        console.error("Error creating/updating user:", error);
      }
    };

    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session && session.user) {
        createUserIfNotExists(session.user.id);
        navigate("/todos");
      }
    });
  }, []);

  return (
    <div className="Homepage">
      <Navbar supabase={supabase} session={session} />
      <h1 className="title">Log in to start using the app</h1>

      <div className="login-container">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["google", "github", "discord"]}
        />
      </div>
    </div>
  );
}
