import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    university: "",
    current_level: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const formBody = new URLSearchParams();

      formBody.append("full_name", formData.full_name);
      formBody.append("email", formData.email);
      formBody.append("phone", formData.phone);
      formBody.append("university", formData.university);
      formBody.append("current_level", formData.current_level);
      formBody.append("message", formData.message);

      const response = await fetch(
        "http://localhost/appkarkhana_api/register.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formBody.toString(),
        }
      );

      const result = await response.json();

      if (result.success) {
        setSuccess(
          "Registration successful! We will contact you soon."
        );

        setFormData({
          full_name: "",
          email: "",
          phone: "",
          university: "",
          current_level: "",
          message: "",
        });
      } else {
        setError(result.message || "Registration failed.");
      }

    } catch (err) {
      setError(
        "Server connection failed. Please make sure XAMPP Apache and MySQL are running."
      );
    }

    setLoading(false);
  }

  return (
    <div className="register-page">

      <div className="register-container">

        <div className="register-header">

          <Link to="/" className="register-logo">
            &lt;/&gt;App<span>KarKhana</span>
          </Link>

          <h1>Register for AppKarKhana</h1>

          <p>
            Secure your seat in our Android App Development course.
          </p>

        </div>


        {success && (
          <div className="success-message">
            {success}
          </div>
        )}


        {error && (
          <div className="error-message">
            {error}
          </div>
        )}


        <form onSubmit={handleSubmit} className="register-form">

          <div className="form-group">
            <label htmlFor="full_name">Full Name</label>

            <input
              id="full_name"
              name="full_name"
              type="text"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>


          <div className="form-group">
            <label htmlFor="email">Email Address</label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>


          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>

            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>


          <div className="form-group">
            <label htmlFor="university">University / Institution</label>

            <input
              id="university"
              name="university"
              type="text"
              value={formData.university}
              onChange={handleChange}
              placeholder="Enter your university name"
              required
            />
          </div>


          <div className="form-group">
            <label htmlFor="current_level">Current Level</label>

            <select
              id="current_level"
              name="current_level"
              value={formData.current_level}
              onChange={handleChange}
              required
            >
              <option value="">
                Select your current level
              </option>

              <option value="School Student">
                School Student
              </option>

              <option value="College Student">
                College Student
              </option>

              <option value="University Student">
                University Student
              </option>

              <option value="Graduate">
                Graduate
              </option>

              <option value="Professional">
                Professional
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </div>


          <div className="form-group">
            <label htmlFor="message">
              Message (Optional)
            </label>

            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write anything you want to ask..."
              rows="4"
            ></textarea>
          </div>


          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Registration →"}
          </button>

        </form>


        <div className="register-footer-links">

          <Link to="/">
            ← Back to Home
          </Link>

          <Link to="/admin">
            Admin Dashboard
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Register;