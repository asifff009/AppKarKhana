import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost/appkarkhana_api";

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!username.trim() || !password) {
      setError("Please enter your username and password.");
      return;
    }

    setLoading(true);

    try {
      const body = new URLSearchParams();

      body.append("username", username.trim());
      body.append("password", password);

      const response = await fetch(
        `${API_URL}/login.php`,
        {
          method: "POST",

          credentials: "include",

          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },

          body: body.toString(),
        }
      );

      const result = await response.json();

      if (result.success) {

        /*
         * Small delay ensures the PHP session
         * is established before opening dashboard.
         */

        navigate("/admin", {
          replace: true,
        });

      } else {

        setError(
          result.message ||
          "Invalid username or password."
        );
      }

    } catch (error) {

      console.error(error);

      setError(
        "Unable to connect with server. Please make sure XAMPP Apache and MySQL are running."
      );

    } finally {

      setLoading(false);
    }
  }


  return (
    <div className="admin-login-page">

      <div className="admin-login-card">

        {/* BRAND */}

        <Link
          to="/"
          className="admin-brand"
        >
          <span className="admin-brand-icon">
            &lt;/&gt;
          </span>

          <span>
            App<span>KarKhana</span>
          </span>
        </Link>


        {/* HEADING */}

        <div className="admin-login-heading">

          <div className="admin-security-badge">
            SECURE ACCESS
          </div>

          <h1>
            Admin Portal
          </h1>

          <p>
            Authorized administrators only.
          </p>

        </div>


        {/* ERROR */}

        {error && (
          <div className="admin-error">
            <span>!</span>

            <p>{error}</p>
          </div>
        )}


        {/* FORM */}

        <form
          className="admin-login-form"
          onSubmit={handleSubmit}
        >

          {/* USERNAME */}

          <div className="admin-form-group">

            <label htmlFor="admin-username">
              Username
            </label>

            <input
              id="admin-username"
              type="text"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              placeholder="Enter admin username"
              autoComplete="username"
              disabled={loading}
              required
            />

          </div>


          {/* PASSWORD */}

          <div className="admin-form-group">

            <label htmlFor="admin-password">
              Password
            </label>

            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter admin password"
              autoComplete="current-password"
              disabled={loading}
              required
            />

          </div>


          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="admin-login-button"
            disabled={loading}
          >

            {loading
              ? "Signing In..."
              : "Sign In →"}

          </button>

        </form>


        {/* BACK HOME */}

        <Link
          to="/"
          className="admin-back-home"
        >
          ← Back to Home
        </Link>


        {/* SECURITY NOTE */}

        <div className="admin-security-note">

          <span>🔒</span>

          <p>
            This area is restricted to
            authorized AppKarKhana administrators.
          </p>

        </div>

      </div>

    </div>
  );
}

export default AdminLogin;