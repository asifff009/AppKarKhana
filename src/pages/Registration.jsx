import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Registration.css";

const API_URL = "http://localhost/appkarkhana_api";

const PAYMENT_NUMBER = "01580444543";
const COURSE_FEE = "3499";

function Registration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    university: "",
    current_level: "",
    message: "",

    payment_method: "bkash",
    payment_number: "",
    transaction_id: "",
    payment_screenshot: null,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [registrationId, setRegistrationId] = useState("");
  const [copied, setCopied] = useState(false);
  const [paymentNumberCopied, setPaymentNumberCopied] =
    useState(false);

  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  function handleChange(event) {
    const { name, value, files } = event.target;

    if (name === "payment_screenshot") {
      const file = files?.[0] || null;

      setFormData((previousData) => ({
        ...previousData,
        payment_screenshot: file,
      }));

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      if (file) {
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        setPreviewUrl("");
      }

      return;
    }

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function selectPaymentMethod(method) {
    setFormData((previousData) => ({
      ...previousData,
      payment_method: method,
    }));
  }

  async function copyPaymentNumber() {
    try {
      await navigator.clipboard.writeText(PAYMENT_NUMBER);

      setPaymentNumberCopied(true);

      setTimeout(() => {
        setPaymentNumberCopied(false);
      }, 2000);
    } catch (error) {
      alert(`Payment Number: ${PAYMENT_NUMBER}`);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setCopied(false);

    try {
      const formBody = new FormData();

      formBody.append(
        "full_name",
        formData.full_name.trim()
      );

      formBody.append(
        "email",
        formData.email.trim()
      );

      formBody.append(
        "phone",
        formData.phone.trim()
      );

      formBody.append(
        "university",
        formData.university.trim()
      );

      formBody.append(
        "current_level",
        formData.current_level
      );

      formBody.append(
        "message",
        formData.message.trim()
      );

      formBody.append(
        "payment_method",
        formData.payment_method
      );

      formBody.append(
        "payment_number",
        formData.payment_number.trim()
      );

      formBody.append(
        "transaction_id",
        formData.transaction_id.trim()
      );

      if (formData.payment_screenshot) {
        formBody.append(
          "payment_screenshot",
          formData.payment_screenshot
        );
      }

      const response = await fetch(
        `${API_URL}/register.php`,
        {
          method: "POST",
          body: formBody,
        }
      );

      const result = await response.json();

      console.log("Registration response:", result);

      if (!result.success) {
        setError(
          result.message ||
            "Registration failed. Please try again."
        );

        setLoading(false);
        return;
      }

      /* ==================================================
         GET REGISTRATION ID
         ================================================== */

      const studentId =
        result.student_id ||
        result.data?.student_id ||
        result.student?.id ||
        "";

      if (!studentId) {
        setError(
          "Registration submitted, but Registration ID was not received from the server."
        );

        setLoading(false);
        return;
      }

      /* ==================================================
         GET PRIVATE ACCESS TOKEN
         ================================================== */

      const accessToken =
        result.access_token ||
        result.data?.access_token ||
        result.student?.access_token ||
        "";

      if (!accessToken) {
        setError(
          "Registration submitted, but the private access key was not received from the server. Please contact AppKarKhana support."
        );

        setLoading(false);
        return;
      }

      const id = String(studentId);

      /* ==================================================
         SAVE REGISTRATION ID
         ================================================== */

      localStorage.setItem(
        "appkarkhana_registration_id",
        id
      );

      /* ==================================================
         SAVE PRIVATE ACCESS TOKEN
         ==================================================

         This token is required to access the student's
         registration information.

         Without the correct token, another student ID
         cannot be used to retrieve the registration data.
         ================================================== */

      localStorage.setItem(
        "appkarkhana_access_token",
        accessToken
      );

      setRegistrationId(id);
      setSuccess(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Registration error:", error);

      setError(
        "Server connection failed. Please make sure XAMPP Apache and MySQL are running."
      );
    }

    setLoading(false);
  }

  async function handleCopyId() {
    try {
      await navigator.clipboard.writeText(
        registrationId
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      setCopied(false);
    }
  }

  function handleCheckStatus() {
    navigate(`/status?id=${registrationId}`);
  }

  /* ==================================================
     SUCCESS SCREEN
     ================================================== */

  if (success) {
    return (
      <div className="register-page success-page">

        <div className="success-wrapper">

          <Link
            to="/"
            className="split-logo success-logo"
          >
            <span>&lt;/&gt;</span>
            AppKarKhana
          </Link>

          <div className="registration-success">

            <div className="success-icon">
              ✓
            </div>

            <div className="success-label">
              REGISTRATION SUCCESSFUL
            </div>

            <h1>
              You're All Set!
            </h1>

            <p className="success-description">
              Your registration has been submitted
              successfully. Our team will verify your
              payment shortly.
            </p>

            <div className="registration-id-card">

              <p className="registration-id-title">
                YOUR REGISTRATION ID
              </p>

              <div className="registration-id">
                #{registrationId}
              </div>

              <button
                type="button"
                className="copy-id-button"
                onClick={handleCopyId}
              >
                {copied
                  ? "✓ Copied Successfully"
                  : "Copy Registration ID"}
              </button>

            </div>

            <div className="save-id-warning">

              <div className="warning-symbol">
                !
              </div>

              <div>
                <strong>
                  Save your Registration ID
                </strong>

                <p>
                  Keep this ID safe. You can use it
                  anytime to check your registration
                  and payment status.
                </p>
              </div>

            </div>

            <div className="success-actions">

              <button
                type="button"
                className="check-status-button"
                onClick={handleCheckStatus}
              >
                Check Registration Status
                <span>→</span>
              </button>

              <Link
                to="/"
                className="back-home-button"
              >
                ← Back to Home
              </Link>

            </div>

          </div>

          <div className="success-footer">

            <Link to="/">
              ← Back to Home
            </Link>

            <Link to="/status">
              Check Registration
            </Link>

          </div>

        </div>

      </div>
    );
  }

  /* ==================================================
     REGISTRATION PAGE
     ================================================== */

  return (
    <div className="register-page">

      <div className="split-registration">

        {/* =================================================
            LEFT SIDE — COURSE INFORMATION
            ================================================= */}

        <aside className="course-panel">

          <div className="course-panel-inner">

            <Link
              to="/"
              className="split-logo"
            >
              <span>&lt;/&gt;</span>
              AppKarKhana
            </Link>

            <div className="course-panel-content">

              <div className="course-eyebrow">
                <span></span>
                ANDROID APP DEVELOPMENT
              </div>

              <h1>
                Build Apps.
                <br />
                <strong>
                  Build Your Future.
                </strong>
              </h1>

              <p className="course-description">
                Learn Android app development from
                basic to advanced and build real-world
                projects with AppKarKhana.
              </p>

              {/* PRICE */}

              <div className="course-price-box">

                <div className="price-top">

                  <span>
                    COURSE FEE
                  </span>

                  <span className="discount-badge">
                    LIMITED OFFER
                  </span>

                </div>

                <div className="price-row">

                  <strong>
                    ৳{Number(COURSE_FEE).toLocaleString("en-BD")}
                  </strong>

                  <div className="old-price">
                    <span>
                      Original Price
                    </span>

                    <del>
                      ৳6,500
                    </del>
                  </div>

                </div>

                <div className="save-price">
                  Save ৳3,001 on enrollment
                </div>

              </div>

              {/* COURSE HIGHLIGHTS */}

              <div className="course-highlights">

                <div className="highlight-item">

                  <div className="highlight-icon">
                    ✓
                  </div>

                  <div>
                    <strong>
                      Basic to Advanced
                    </strong>

                    <span>
                      Start from fundamentals
                    </span>
                  </div>

                </div>

                <div className="highlight-item">

                  <div className="highlight-icon">
                    #
                  </div>

                  <div>
                    <strong>
                      15+ Real Projects
                    </strong>

                    <span>
                      Build practical applications
                    </span>
                  </div>

                </div>

                <div className="highlight-item">

                  <div className="highlight-icon">
                    &lt;/&gt;
                  </div>

                  <div>
                    <strong>
                      Industry Tools
                    </strong>

                    <span>
                      Android Studio, Java & XML
                    </span>
                  </div>

                </div>

                <div className="highlight-item">

                  <div className="highlight-icon">
                    DB
                  </div>

                  <div>
                    <strong>
                      Backend Development
                    </strong>

                    <span>
                      PHP, MySQL & SQL
                    </span>
                  </div>

                </div>

              </div>

              {/* TECHNOLOGIES */}

              <div className="technology-section">

                <span className="technology-label">
                  YOU'LL WORK WITH
                </span>

                <div className="technology-list">

                  <span>
                    Android Studio
                  </span>

                  <span>
                    Java
                  </span>

                  <span>
                    XML
                  </span>

                  <span>
                    PHP
                  </span>

                  <span>
                    MySQL
                  </span>

                  <span>
                    SQL
                  </span>

                </div>

              </div>

              {/* BOTTOM NOTE */}

              <div className="course-bottom-note">

                <div className="note-dot"></div>

                <div>
                  <strong>
                    Limited Seats Available
                  </strong>

                  <span>
                    Secure your seat by completing
                    the registration.
                  </span>
                </div>

              </div>

            </div>

            <div className="course-panel-footer">
              © {new Date().getFullYear()} AppKarKhana
            </div>

          </div>

        </aside>

        {/* =================================================
            RIGHT SIDE — REGISTRATION FORM
            ================================================= */}

        <main className="registration-panel">

          <div className="registration-panel-inner">

            <div className="mobile-logo-wrapper">

              <Link
                to="/"
                className="split-logo"
              >
                <span>&lt;/&gt;</span>
                AppKarKhana
              </Link>

            </div>

            <div className="form-header">

              <div className="form-eyebrow">
                COURSE REGISTRATION
              </div>

              <h2>
                Secure Your Seat
              </h2>

              <p>
                Complete the form below to register
                for the AppKarKhana course.
              </p>

            </div>

            {error && (
              <div className="error-message">

                <span>
                  !
                </span>

                <p>
                  {error}
                </p>

              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="registration-form"
            >

              {/* =========================================
                  PERSONAL INFORMATION
                  ========================================= */}

              <section className="registration-section">

                <div className="form-section-heading">

                  <div className="form-section-number">
                    01
                  </div>

                  <div>
                    <h3>
                      Personal Information
                    </h3>

                    <p>
                      Tell us a little about yourself.
                    </p>
                  </div>

                </div>

                <div className="form-grid">

                  <div className="form-group full-width">

                    <label htmlFor="full_name">
                      Full Name
                      <span>*</span>
                    </label>

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

                    <label htmlFor="email">
                      Email Address
                      <span>*</span>
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                    />

                  </div>

                  <div className="form-group">

                    <label htmlFor="phone">
                      Phone Number
                      <span>*</span>
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="01XXXXXXXXX"
                      required
                    />

                  </div>

                  <div className="form-group">

                    <label htmlFor="university">
                      University / Institution
                      <span>*</span>
                    </label>

                    <input
                      id="university"
                      name="university"
                      type="text"
                      value={formData.university}
                      onChange={handleChange}
                      placeholder="Enter your university / institution"
                      required
                    />

                  </div>

                  <div className="form-group">

                    <label htmlFor="current_level">
                      Current Level
                      <span>*</span>
                    </label>

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

                </div>

              </section>

              {/* =========================================
                  PAYMENT INFORMATION
                  ========================================= */}

              <section className="registration-section payment-section">

                <div className="form-section-heading">

                  <div className="form-section-number dark-number">
                    02
                  </div>

                  <div>
                    <h3>
                      Payment Information
                    </h3>

                    <p>
                      Complete your payment and enter
                      the transaction details.
                    </p>
                  </div>

                </div>

                {/* PAYMENT AMOUNT */}

                <div className="payment-amount-card">

                  <div>

                    <span>
                      COURSE PAYMENT
                    </span>

                    <strong>
                      ৳{Number(COURSE_FEE).toLocaleString("en-BD")}
                    </strong>

                    <p>
                      One-time enrollment fee
                    </p>

                  </div>

                  <div className="payment-status-badge">
                    ✓ Manual Payment
                  </div>

                </div>

                {/* SEND MONEY */}

                <div className="send-money-card">

                  <div className="send-money-content">

                    <span>
                      SEND MONEY TO
                    </span>

                    <strong>
                      {PAYMENT_NUMBER}
                    </strong>

                    <p>
                      AppKarKhana Course Payment
                    </p>

                  </div>

                  <button
                    type="button"
                    className="copy-payment-button"
                    onClick={copyPaymentNumber}
                  >
                    {paymentNumberCopied
                      ? "✓ Copied"
                      : "Copy Number"}
                  </button>

                </div>

                {/* PAYMENT STEPS */}

                <div className="payment-instructions">

                  <div className="instruction-title">
                    How to Pay
                  </div>

                  <div className="instruction-list">

                    <div className="instruction-item">

                      <span>
                        1
                      </span>

                      <p>
                        Choose your preferred
                        mobile banking method.
                      </p>

                    </div>

                    <div className="instruction-item">

                      <span>
                        2
                      </span>

                      <p>
                        Send <b>৳3,499</b> to
                        <b> {PAYMENT_NUMBER}</b> using
                        Send Money.
                      </p>

                    </div>

                    <div className="instruction-item">

                      <span>
                        3
                      </span>

                      <p>
                        Save the Transaction ID
                        after successful payment.
                      </p>

                    </div>

                  </div>

                </div>

                {/* PAYMENT METHODS */}

                <div className="payment-method-wrapper">

                  <label className="payment-main-label">
                    Payment Method
                    <span>*</span>
                  </label>

                  <div className="payment-method-options">

                    <button
                      type="button"
                      className={`payment-method-card ${
                        formData.payment_method ===
                        "bkash"
                          ? "active bkash-active"
                          : ""
                      }`}
                      onClick={() =>
                        selectPaymentMethod("bkash")
                      }
                    >

                      <div className="method-icon bkash-icon">
                        b
                      </div>

                      <div>
                        <strong>
                          bKash
                        </strong>

                        <span>
                          Mobile Banking
                        </span>
                      </div>

                      {formData.payment_method ===
                        "bkash" && (
                        <i>
                          ✓
                        </i>
                      )}

                    </button>

                    <button
                      type="button"
                      className={`payment-method-card ${
                        formData.payment_method ===
                        "nagad"
                          ? "active nagad-active"
                          : ""
                      }`}
                      onClick={() =>
                        selectPaymentMethod("nagad")
                      }
                    >

                      <div className="method-icon nagad-icon">
                        N
                      </div>

                      <div>
                        <strong>
                          Nagad
                        </strong>

                        <span>
                          Mobile Banking
                        </span>
                      </div>

                      {formData.payment_method ===
                        "nagad" && (
                        <i>
                          ✓
                        </i>
                      )}

                    </button>

                    <button
                      type="button"
                      className={`payment-method-card ${
                        formData.payment_method ===
                        "rocket"
                          ? "active rocket-active"
                          : ""
                      }`}
                      onClick={() =>
                        selectPaymentMethod("rocket")
                      }
                    >

                      <div className="method-icon rocket-icon">
                        R
                      </div>

                      <div>
                        <strong>
                          Rocket
                        </strong>

                        <span>
                          Mobile Banking
                        </span>
                      </div>

                      {formData.payment_method ===
                        "rocket" && (
                        <i>
                          ✓
                        </i>
                      )}

                    </button>

                  </div>

                </div>

                {/* PAYMENT DETAILS */}

                <div className="payment-details-box">

                  <div className="form-grid">

                    <div className="form-group">

                      <label htmlFor="payment_number">
                        Your Payment Number
                        <span>*</span>
                      </label>

                      <input
                        id="payment_number"
                        name="payment_number"
                        type="tel"
                        value={formData.payment_number}
                        onChange={handleChange}
                        placeholder="01XXXXXXXXX"
                        required
                      />

                      <small>
                        Number used to send the payment.
                      </small>

                    </div>

                    <div className="form-group">

                      <label htmlFor="transaction_id">
                        Transaction ID
                        <span>*</span>
                      </label>

                      <input
                        id="transaction_id"
                        name="transaction_id"
                        type="text"
                        value={formData.transaction_id}
                        onChange={handleChange}
                        placeholder="Enter Transaction ID"
                        required
                      />

                      <small>
                        Found in your payment confirmation.
                      </small>

                    </div>

                  </div>

                </div>

                {/* SCREENSHOT */}

                <div className="screenshot-wrapper">

                  <div className="screenshot-header">

                    <div>

                      <label htmlFor="payment_screenshot">
                        Payment Screenshot
                        <span>*</span>
                      </label>

                      <p>
                        Upload a clear screenshot of
                        your payment.
                      </p>

                    </div>

                    <span>
                      Required
                    </span>

                  </div>

                  <label
                    htmlFor="payment_screenshot"
                    className={`upload-box ${
                      previewUrl
                        ? "has-preview"
                        : ""
                    }`}
                  >

                    {!previewUrl ? (
                      <>
                        <div className="upload-icon">
                          ↑
                        </div>

                        <strong>
                          Upload Payment Screenshot
                        </strong>

                        <p>
                          Click to browse your device
                        </p>

                        <small>
                          JPG, PNG or WEBP • Maximum 5MB
                        </small>
                      </>
                    ) : (

                      <div className="upload-preview">

                        <img
                          src={previewUrl}
                          alt="Payment screenshot preview"
                        />

                        <div className="preview-overlay">

                          <div>
                            <strong>
                              Screenshot Selected
                            </strong>

                            <span>
                              Click to change
                            </span>
                          </div>

                          <div className="preview-check">
                            ✓
                          </div>

                        </div>

                      </div>

                    )}

                  </label>

                  <input
                    id="payment_screenshot"
                    name="payment_screenshot"
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                    onChange={handleChange}
                    hidden
                    required={!previewUrl}
                  />

                </div>

                {/* CHECKLIST */}

                <div className="payment-checklist">

                  <strong>
                    Before submitting
                  </strong>

                  <div>

                    <span>
                      ✓
                    </span>

                    <p>
                      I sent exactly ৳3,499.
                    </p>

                  </div>

                  <div>

                    <span>
                      ✓
                    </span>

                    <p>
                      My Transaction ID is correct.
                    </p>

                  </div>

                  <div>

                    <span>
                      ✓
                    </span>

                    <p>
                      My payment screenshot is clear.
                    </p>

                  </div>

                </div>

              </section>

              {/* =========================================
                  ADDITIONAL INFORMATION
                  ========================================= */}

              <section className="registration-section">

                <div className="form-section-heading">

                  <div className="form-section-number">
                    03
                  </div>

                  <div>

                    <h3>
                      Additional Information
                    </h3>

                    <p>
                      Anything else you want us to know?
                    </p>

                  </div>

                </div>

                <div className="form-group">

                  <label htmlFor="message">

                    Message

                    <span className="optional">
                      Optional
                    </span>

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

              </section>

              {/* =========================================
                  SUBMIT
                  ========================================= */}

              <div className="submit-section">

                <div className="secure-note">

                  <span>
                    ✓
                  </span>

                  <p>
                    Your information will be reviewed
                    by the AppKarKhana team.
                  </p>

                </div>

                <button
                  type="submit"
                  className="submit-button"
                  disabled={loading}
                >

                  {loading ? (
                    <>
                      <span className="button-spinner"></span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Complete Registration
                      <span>
                        →
                      </span>
                    </>
                  )}

                </button>

                <p className="submit-note">
                  By submitting this form, you confirm
                  that the payment information provided
                  by you is accurate.
                </p>

              </div>

            </form>

            <div className="registration-footer">

              <Link to="/">
                ← Back to Home
              </Link>

              <Link to="/status">
                Check Registration
              </Link>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}

export default Registration;