import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./StudentStatus.css";

const API_URL = "http://localhost/appkarkhana_api";

function StudentStatus() {
  const [searchParams] = useSearchParams();

  const [registrationId, setRegistrationId] =
    useState("");

  const [student, setStudent] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [hasSavedRegistration, setHasSavedRegistration] =
    useState(false);


  /*
  |--------------------------------------------------------------------------
  | LOAD SAVED REGISTRATION
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    const urlId =
      searchParams.get("id");

    const savedId =
      localStorage.getItem(
        "appkarkhana_registration_id"
      );

    const savedToken =
      localStorage.getItem(
        "appkarkhana_access_token"
      );


    /*
    | Only consider the saved registration
    | valid when BOTH ID and token exist.
    */

    if (savedId && savedToken) {

      setRegistrationId(savedId);

      setHasSavedRegistration(true);

    } else {

      setHasSavedRegistration(false);

    }


    /*
    | If URL contains an ID, show it in input.
    | But we will NOT use it unless the
    | corresponding private token exists.
    */

    if (urlId) {

      setRegistrationId(urlId);

    }

  }, [searchParams]);


  /*
  |--------------------------------------------------------------------------
  | CHECK STATUS
  |--------------------------------------------------------------------------
  */

  async function handleSearch(event) {

    event.preventDefault();

    setError("");
    setStudent(null);


    const id =
      registrationId.trim();


    if (!id) {

      setError(
        "Please enter your Registration ID."
      );

      return;
    }


    /*
    |--------------------------------------------------------------------------
    | GET SAVED PRIVATE TOKEN
    |--------------------------------------------------------------------------
    */

    const savedId =
      localStorage.getItem(
        "appkarkhana_registration_id"
      );

    const savedToken =
      localStorage.getItem(
        "appkarkhana_access_token"
      );


    /*
    |--------------------------------------------------------------------------
    | SECURITY CHECK
    |--------------------------------------------------------------------------
    |
    | The entered ID MUST match the ID that
    | belongs to the saved private token.
    |
    */

    if (
      !savedId ||
      !savedToken ||
      savedId !== id
    ) {

      setError(
        "You can only check the registration associated with this device. Please use your own Registration ID."
      );

      return;
    }


    setLoading(true);


    try {

      const response = await fetch(
        `${API_URL}/get_student_status.php?id=${encodeURIComponent(
          id
        )}&token=${encodeURIComponent(
          savedToken
        )}`,
        {
          method: "GET",
        }
      );


      const result =
        await response.json();


      if (!result.success) {

        setError(
          result.message ||
            "Unable to verify your registration."
        );

        setLoading(false);

        return;
      }


      setStudent(
        result.student
      );


    } catch (error) {

      console.error(error);

      setError(
        "Unable to connect with the server. Please try again."
      );

    }


    setLoading(false);
  }


  /*
  |--------------------------------------------------------------------------
  | STATUS CLASS
  |--------------------------------------------------------------------------
  */

  function getStatusClass(status) {

    if (status === "verified") {
      return "status-verified";
    }

    if (status === "rejected") {
      return "status-rejected";
    }

    return "status-pending";
  }


  /*
  |--------------------------------------------------------------------------
  | STATUS TEXT
  |--------------------------------------------------------------------------
  */

  function getStatusText(status) {

    if (status === "verified") {
      return "Payment Verified";
    }

    if (status === "rejected") {
      return "Payment Rejected";
    }

    return "Payment Pending";
  }


  return (
    <div className="student-status-page">

      <div className="student-status-container">


        {/* =================================================
            BRAND
            ================================================= */}

        <Link
          to="/"
          className="status-brand"
        >
          <span>&lt;/&gt;</span>
          AppKarKhana
        </Link>


        {/* =================================================
            HEADER
            ================================================= */}

        <div className="status-header">

          <p className="status-eyebrow">
            REGISTRATION STATUS
          </p>

          <h1>
            Check Your Registration
          </h1>

          <p>
            Use your Registration ID to view
            your own registration and payment status.
          </p>

        </div>


        {/* =================================================
            SECURITY NOTICE
            ================================================= */}

        <div className="status-security-notice">

          <div className="security-icon">
            🔒
          </div>

          <div>

            <strong>
              Private Registration Access
            </strong>

            <p>
              Your registration information is private.
              Only the Registration ID connected to your
              private access key can be viewed.
            </p>

          </div>

        </div>


        {/* =================================================
            SEARCH CARD
            ================================================= */}

        <div className="status-search-card">

          <form onSubmit={handleSearch}>

            <label>
              Your Registration ID
            </label>

            <div className="status-search-row">

              <input
                type="text"
                value={registrationId}
                onChange={(event) =>
                  setRegistrationId(
                    event.target.value
                  )
                }
                placeholder="e.g. 27"
                required
              />

              <button
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Checking..."
                  : "Check Status →"}
              </button>

            </div>

          </form>


          <div className="status-search-hint">

            <span>
              🔐
            </span>

            Your private access key is stored securely
            on this device after registration.

          </div>

        </div>


        {/* =================================================
            ERROR
            ================================================= */}

        {error && (

          <div className="status-error">

            <span>
              !
            </span>

            <div>

              <strong>
                Unable to verify registration
              </strong>

              <p>
                {error}
              </p>

            </div>

          </div>

        )}


        {/* =================================================
            RESULT
            ================================================= */}

        {student && (

          <div className="student-result-card">


            {/* TOP */}

            <div className="result-top">

              <div>

                <p className="result-label">
                  REGISTRATION ID
                </p>

                <h2>
                  #{student.id}
                </h2>

              </div>


              <div
                className={`payment-status ${getStatusClass(
                  student.payment_status
                )}`}
              >
                {getStatusText(
                  student.payment_status
                )}
              </div>

            </div>


            <div className="result-divider"></div>


            {/* INFORMATION */}

            <div className="student-info-grid">

              <div className="student-info-item">
                <span>
                  Full Name
                </span>

                <strong>
                  {student.full_name}
                </strong>
              </div>


              <div className="student-info-item">
                <span>
                  Email
                </span>

                <strong>
                  {student.email}
                </strong>
              </div>


              <div className="student-info-item">
                <span>
                  Phone
                </span>

                <strong>
                  {student.phone}
                </strong>
              </div>


              <div className="student-info-item">
                <span>
                  University
                </span>

                <strong>
                  {student.university}
                </strong>
              </div>


              <div className="student-info-item">
                <span>
                  Payment Method
                </span>

                <strong>
                  {student.payment_method
                    ? student.payment_method.toUpperCase()
                    : "-"}
                </strong>
              </div>


              <div className="student-info-item">
                <span>
                  Transaction ID
                </span>

                <strong>
                  {student.transaction_id || "-"}
                </strong>
              </div>


              <div className="student-info-item">
                <span>
                  Course Fee
                </span>

                <strong>
                  ৳
                  {Number(
                    student.payment_amount ||
                      3499
                  ).toLocaleString("en-BD")}
                </strong>
              </div>


              <div className="student-info-item">
                <span>
                  Registration Date
                </span>

                <strong>
                  {student.created_at
                    ? new Date(
                        student.created_at
                      ).toLocaleDateString(
                        "en-BD",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }
                      )
                    : "-"}
                </strong>
              </div>

            </div>


            {/* STATUS MESSAGE */}

            <div
              className={`status-message-box ${getStatusClass(
                student.payment_status
              )}`}
            >

              {student.payment_status ===
                "verified" && (
                <>
                  <strong>
                    ✓ Payment Verified
                  </strong>

                  <p>
                    Your payment has been verified.
                    Your course registration is confirmed.
                  </p>
                </>
              )}


              {student.payment_status ===
                "pending" && (
                <>
                  <strong>
                    Payment Verification Pending
                  </strong>

                  <p>
                    Your registration has been received.
                    Our team is currently reviewing
                    your payment information.
                  </p>
                </>
              )}


              {student.payment_status ===
                "rejected" && (
                <>
                  <strong>
                    Payment Rejected
                  </strong>

                  <p>
                    Your payment could not be verified.
                    Please contact AppKarKhana support
                    for further information.
                  </p>
                </>
              )}

            </div>

          </div>

        )}


        {/* =================================================
            FOOTER LINKS
            ================================================= */}

        <div className="status-footer-links">

          <Link to="/register">
            Register for the Course
          </Link>

          <span>
            •
          </span>

          <Link to="/">
            Back to Home
          </Link>

        </div>


      </div>

    </div>
  );
}

export default StudentStatus;