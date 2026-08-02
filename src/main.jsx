import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    console.error("App crashed:", error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "32px",
            background: "#1a1210",
            color: "#f4e6c8",
            fontFamily: "monospace",
            textAlign: "left",
          }}
        >
          <div style={{ maxWidth: "560px" }}>
            <div style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>
              Something went wrong loading the app
            </div>
            <div style={{ fontSize: "13px", opacity: 0.85, marginBottom: "16px", whiteSpace: "pre-wrap" }}>
              {String(this.state.error && this.state.error.message ? this.state.error.message : this.state.error)}
            </div>
            <div style={{ fontSize: "12px", opacity: 0.6 }}>
              Open the browser console (F12) for the full error. If this mentions Supabase or
              environment variables, check that VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are
              set on your host and redeploy.
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
