import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Admin.css";

const API_URL = "http://localhost/appkarkhana_api";

function Admin() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [admin, setAdmin] = useState(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // =========================================================
  // CHECK ADMIN AUTHENTICATION
  // =========================================================

  async function checkAuthentication() {
    try {
      const response = await fetch(`${API_URL}/auth_check.php`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      const result = await response.json();

      if (!result.success) {
        navigate("/admin-login", { replace: true });
        return false;
      }

      setAdmin(result.admin || null);

      return true;
    } catch (error) {
      navigate("/admin-login", { replace: true });
      return false;
    }
  }

  // =========================================================
  // FETCH STUDENTS
  // =========================================================

  async function fetchStudents(showLoader = false) {
    if (showLoader) {
      setRefreshing(true);
    }

    setError("");

    try {
      const response = await fetch(`${API_URL}/get_students.php`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      const result = await response.json();

      if (!result.success) {
        if (
          result.message &&
          result.message.toLowerCase().includes("unauthorized")
        ) {
          navigate("/admin-login", { replace: true });
          return;
        }

        setError(result.message || "Could not load registrations.");
        return;
      }

      setStudents(
        Array.isArray(result.students)
          ? result.students
          : []
      );
    } catch (error) {
      setError(
        "Unable to connect with server. Please make sure Apache and MySQL are running."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    async function initializeAdmin() {
      const authenticated = await checkAuthentication();

      if (authenticated) {
        await fetchStudents();
      }
    }

    initializeAdmin();
  }, []);

  // =========================================================
  // LOGOUT
  // =========================================================

  async function handleLogout() {
    try {
      await fetch(`${API_URL}/logout.php`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      // Ignore logout request error.
    }

    navigate("/admin-login", {
      replace: true,
    });
  }

  // =========================================================
  // NORMALIZE PAYMENT STATUS
  // =========================================================

  function getStatus(student) {
    const status = String(
      student?.payment_status || "pending"
    )
      .toLowerCase()
      .trim();

    if (
      status !== "pending" &&
      status !== "verified" &&
      status !== "rejected"
    ) {
      return "pending";
    }

    return status;
  }

  // =========================================================
  // UPDATE PAYMENT STATUS
  // =========================================================

  async function updatePaymentStatus(studentId, newStatus) {
    if (!studentId || !newStatus) {
      return;
    }

    setUpdatingId(studentId);
    setError("");

    try {
      const body = new URLSearchParams();

      body.append("id", String(studentId));
      body.append("payment_status", newStatus);

      const response = await fetch(
        `${API_URL}/update_payment.php`,
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

      if (!result.success) {
        setError(
          result.message ||
            "Could not update payment status."
        );

        return;
      }

      // Update table immediately
      setStudents((previousStudents) =>
        previousStudents.map((student) =>
          String(student.id) === String(studentId)
            ? {
                ...student,
                payment_status: newStatus,
              }
            : student
        )
      );

      // Update currently opened modal
      setSelectedStudent((previousStudent) => {
        if (
          !previousStudent ||
          String(previousStudent.id) !==
            String(studentId)
        ) {
          return previousStudent;
        }

        return {
          ...previousStudent,
          payment_status: newStatus,
        };
      });
    } catch (error) {
      setError(
        "Unable to update payment status. Please check the server."
      );
    } finally {
      setUpdatingId(null);
    }
  }

  // =========================================================
  // SEARCH + STATUS FILTER
  // =========================================================

  const filteredStudents = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return students.filter((student) => {
      const status = getStatus(student);

      const matchesStatus =
        statusFilter === "all" ||
        status === statusFilter;

      if (!matchesStatus) {
        return false;
      }

      if (!keyword) {
        return true;
      }

      const searchableText = [
        student.id,
        student.full_name,
        student.email,
        student.phone,
        student.university,
        student.current_level,
        student.payment_method,
        student.payment_number,
        student.transaction_id,
      ]
        .filter(
          (value) =>
            value !== null &&
            value !== undefined
        )
        .join(" ")
        .toLowerCase();

      return searchableText.includes(keyword);
    });
  }, [students, search, statusFilter]);

  // =========================================================
  // DASHBOARD COUNTS
  // =========================================================

  const totalRegistrations = students.length;

  const pendingPayments = students.filter(
    (student) =>
      getStatus(student) === "pending"
  ).length;

  const verifiedPayments = students.filter(
    (student) =>
      getStatus(student) === "verified"
  ).length;

  const rejectedPayments = students.filter(
    (student) =>
      getStatus(student) === "rejected"
  ).length;

  // =========================================================
  // FORMAT DATE
  // =========================================================

  function formatDate(dateValue) {
    if (!dateValue) {
      return "—";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return dateValue;
    }

    return date.toLocaleString("en-BD", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // =========================================================
  // PAYMENT SCREENSHOT URL
  // =========================================================

  function getScreenshotUrl(student) {
    const screenshot =
      student?.payment_screenshot ||
      student?.screenshot ||
      student?.payment_proof ||
      "";

    if (!screenshot) {
      return "";
    }

    const cleanScreenshot = String(screenshot)
      .trim()
      .replace(/^\/+/, "");

    // Already a complete URL
    if (
      cleanScreenshot.startsWith("http://") ||
      cleanScreenshot.startsWith("https://")
    ) {
      return cleanScreenshot;
    }

    /*
    |--------------------------------------------------------------------------
    | IMPORTANT
    |--------------------------------------------------------------------------
    | Your uploaded image is stored like:
    |
    | appkarkhana_api/
    | └── uploads/
    |     └── payment_screenshots/
    |         └── payment_xxxxx.jpg
    |
    | Database stores only:
    | payment_xxxxx.jpg
    |
    | Therefore we need this path:
    |
    | http://localhost/appkarkhana_api/uploads/payment_screenshots/file.jpg
    |--------------------------------------------------------------------------
    */

    if (
      cleanScreenshot.startsWith(
        "uploads/payment_screenshots/"
      )
    ) {
      return `${API_URL}/${cleanScreenshot}`;
    }

    if (
      cleanScreenshot.startsWith(
        "payment_screenshots/"
      )
    ) {
      return `${API_URL}/uploads/${cleanScreenshot}`;
    }

    // Normal case: database contains only filename
    return `${API_URL}/uploads/payment_screenshots/${encodeURIComponent(
      cleanScreenshot
    )}`;
  }

  // =========================================================
  // OPEN DETAILS MODAL
  // =========================================================

  function openDetails(student) {
    setSelectedStudent(student);
    setShowDetails(true);
  }

  // =========================================================
  // CLOSE DETAILS MODAL
  // =========================================================

  function closeDetails() {
    setShowDetails(false);
    setSelectedStudent(null);
  }

  // =========================================================
  // LOADING SCREEN
  // =========================================================

  if (loading) {
    return (
      <div className="admin-loading-page">
        <div className="admin-loading-card">
          <div className="loading-spinner"></div>

          <h2>
            Loading Admin Dashboard
          </h2>

          <p>
            Checking authentication and loading
            registrations...
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // ADMIN PAGE
  // =========================================================

  return (
    <div className="admin-page">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="admin-navbar">
        <div className="admin-navbar-inner">

          <Link
            to="/"
            className="admin-brand"
          >
            <span className="admin-brand-icon">
              &lt;/&gt;
            </span>

            <span>
              App<span>Kar</span>Khana
            </span>
          </Link>


          <div className="admin-navbar-right">

            <div className="admin-user">

              <div className="admin-avatar">
                {(admin?.username || "A")
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className="admin-user-info">

                <span>
                  Logged in as
                </span>

                <strong>
                  {admin?.username || "admin"}
                </strong>

              </div>

            </div>


            <button
              type="button"
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        </div>
      </header>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="admin-main">

        {/* ===================================================
            PAGE HEADER
        =================================================== */}

        <section className="admin-page-header">

          <div>

            <div className="admin-eyebrow">
              ADMINISTRATION
            </div>

            <h1>
              Student Registration
              <span> Dashboard</span>
            </h1>

            <p>
              Manage course registrations and
              manually verify student payments.
            </p>

          </div>


          <button
            type="button"
            className="refresh-btn"
            onClick={() =>
              fetchStudents(true)
            }
            disabled={refreshing}
          >

            <span
              className={
                refreshing ? "spin" : ""
              }
            >
              ↻
            </span>

            {refreshing
              ? "Refreshing..."
              : "Refresh Data"}

          </button>

        </section>


        {/* ===================================================
            ERROR MESSAGE
        =================================================== */}

        {error && (
          <div className="admin-alert admin-alert-error">

            <span>!</span>

            <div>

              <strong>
                Something went wrong
              </strong>

              <p>
                {error}
              </p>

            </div>

          </div>
        )}


        {/* ===================================================
            STATISTICS
        =================================================== */}

        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon stat-icon-blue">
              #
            </div>

            <div className="stat-content">

              <span>
                Total Registrations
              </span>

              <strong>
                {totalRegistrations}
              </strong>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon stat-icon-orange">
              ◷
            </div>

            <div className="stat-content">

              <span>
                Pending Payments
              </span>

              <strong>
                {pendingPayments}
              </strong>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon stat-icon-green">
              ✓
            </div>

            <div className="stat-content">

              <span>
                Verified Payments
              </span>

              <strong>
                {verifiedPayments}
              </strong>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon stat-icon-red">
              ×
            </div>

            <div className="stat-content">

              <span>
                Rejected Payments
              </span>

              <strong>
                {rejectedPayments}
              </strong>

            </div>

          </div>

        </section>


        {/* ===================================================
            REGISTRATIONS
        =================================================== */}

        <section className="registrations-card">

          <div className="registrations-header">

            <div>

              <div className="section-eyebrow">
                LIVE DATABASE
              </div>

              <h2>
                All Course Registrations
              </h2>

              <p>
                Student records loaded directly
                from MySQL.
              </p>

            </div>


            <div className="record-count">

              {filteredStudents.length}

              {" record"}

              {filteredStudents.length !== 1
                ? "s"
                : ""}

            </div>

          </div>


          {/* =================================================
              FILTER BAR
          ================================================= */}

          <div className="filter-bar">

            <div className="search-wrapper">

              <span className="search-icon">
                ⌕
              </span>

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search name, email, phone, transaction..."
              />

            </div>


            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value
                )
              }
              className="status-filter"
            >

              <option value="all">
                All Status
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="verified">
                Verified
              </option>

              <option value="rejected">
                Rejected
              </option>

            </select>

          </div>


          {/* =================================================
              EMPTY STATE
          ================================================= */}

          {filteredStudents.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                ✓
              </div>

              <h3>
                No registrations found
              </h3>

              <p>
                Try changing your search or
                status filter.
              </p>

            </div>

          ) : (

            /* =================================================
               TABLE
            ================================================= */

            <div className="table-container">

              <table className="student-table">

                <thead>

                  <tr>

                    <th>ID</th>

                    <th>
                      Student
                    </th>

                    <th>
                      Contact
                    </th>

                    <th>
                      Institution
                    </th>

                    <th>
                      Payment
                    </th>

                    <th>
                      Screenshot
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Date
                    </th>

                    <th>
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {filteredStudents.map(
                    (student) => {

                      const status =
                        getStatus(student);

                      const screenshotUrl =
                        getScreenshotUrl(
                          student
                        );

                      return (

                        <tr
                          key={student.id}
                        >

                          {/* ID */}

                          <td>

                            <span className="student-id">
                              #{student.id}
                            </span>

                          </td>


                          {/* STUDENT */}

                          <td>

                            <div className="student-cell">

                              <div className="student-avatar">

                                {(
                                  student.full_name ||
                                  "S"
                                )
                                  .charAt(0)
                                  .toUpperCase()}

                              </div>


                              <div>

                                <strong>
                                  {
                                    student.full_name ||
                                    "—"
                                  }
                                </strong>

                                <span>
                                  {
                                    student.current_level ||
                                    "—"
                                  }
                                </span>

                              </div>

                            </div>

                          </td>


                          {/* CONTACT */}

                          <td>

                            <div className="contact-cell">

                              <span>
                                {
                                  student.email ||
                                  "—"
                                }
                              </span>

                              <span>
                                {
                                  student.phone ||
                                  "—"
                                }
                              </span>

                            </div>

                          </td>


                          {/* INSTITUTION */}

                          <td>

                            <div className="institution-cell">

                              <strong>
                                {
                                  student.university ||
                                  "—"
                                }
                              </strong>

                            </div>

                          </td>


                          {/* PAYMENT */}

                          <td>

                            <div className="payment-cell">

                              <strong>

                                ৳
                                {Number(
                                  student.payment_amount ||
                                    3499
                                ).toLocaleString(
                                  "en-BD"
                                )}

                              </strong>


                              <span>

                                {String(
                                  student.payment_method ||
                                    "—"
                                ).toUpperCase()}

                              </span>


                              <small>

                                Sender:{" "}

                                {
                                  student.payment_number ||
                                  "—"
                                }

                              </small>


                              <small>

                                TXN:{" "}

                                {
                                  student.transaction_id ||
                                  "—"
                                }

                              </small>

                            </div>

                          </td>


                          {/* SCREENSHOT */}

                          <td>

                            {screenshotUrl ? (

                              <a
                                href={screenshotUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="screenshot-btn"
                              >

                                <span>
                                  ↗
                                </span>

                                View

                              </a>

                            ) : (

                              <span className="not-available">
                                Not uploaded
                              </span>

                            )}

                          </td>


                          {/* STATUS */}

                          <td>

                            <select
                              className={`payment-status-select status-${status}`}
                              value={status}
                              disabled={
                                updatingId ===
                                student.id
                              }
                              onChange={(event) =>
                                updatePaymentStatus(
                                  student.id,
                                  event.target.value
                                )
                              }
                            >

                              <option value="pending">
                                Pending
                              </option>

                              <option value="verified">
                                Verified
                              </option>

                              <option value="rejected">
                                Rejected
                              </option>

                            </select>

                          </td>


                          {/* DATE */}

                          <td>

                            <span className="date-cell">
                              {formatDate(
                                student.created_at
                              )}
                            </span>

                          </td>


                          {/* DETAILS */}

                          <td>

                            <button
                              type="button"
                              className="details-btn"
                              onClick={() =>
                                openDetails(
                                  student
                                )
                              }
                            >
                              Details
                            </button>

                          </td>

                        </tr>

                      );
                    }
                  )}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </main>


      {/* =====================================================
          DETAILS MODAL
      ===================================================== */}

      {showDetails &&
        selectedStudent && (

          <div
            className="modal-overlay"
            onMouseDown={(event) => {

              if (
                event.target ===
                event.currentTarget
              ) {
                closeDetails();
              }

            }}
          >

            <div className="details-modal">

              {/* MODAL HEADER */}

              <div className="modal-header">

                <div>

                  <div className="section-eyebrow">
                    REGISTRATION DETAILS
                  </div>

                  <h2>
                    {
                      selectedStudent.full_name ||
                      "Student Details"
                    }
                  </h2>

                </div>


                <button
                  type="button"
                  className="modal-close"
                  onClick={closeDetails}
                >
                  ×
                </button>

              </div>


              {/* MODAL BODY */}

              <div className="modal-body">

                <div className="detail-grid">

                  <div className="detail-item">

                    <span>
                      Registration ID
                    </span>

                    <strong>
                      #{selectedStudent.id}
                    </strong>

                  </div>


                  <div className="detail-item">

                    <span>
                      Registration Date
                    </span>

                    <strong>
                      {formatDate(
                        selectedStudent.created_at
                      )}
                    </strong>

                  </div>


                  <div className="detail-item">

                    <span>
                      Full Name
                    </span>

                    <strong>
                      {
                        selectedStudent.full_name ||
                        "—"
                      }
                    </strong>

                  </div>


                  <div className="detail-item">

                    <span>
                      Phone Number
                    </span>

                    <strong>
                      {
                        selectedStudent.phone ||
                        "—"
                      }
                    </strong>

                  </div>


                  <div className="detail-item detail-wide">

                    <span>
                      Email Address
                    </span>

                    <strong>
                      {
                        selectedStudent.email ||
                        "—"
                      }
                    </strong>

                  </div>


                  <div className="detail-item detail-wide">

                    <span>
                      University / Institution
                    </span>

                    <strong>
                      {
                        selectedStudent.university ||
                        "—"
                      }
                    </strong>

                  </div>


                  <div className="detail-item">

                    <span>
                      Current Level
                    </span>

                    <strong>
                      {
                        selectedStudent.current_level ||
                        "—"
                      }
                    </strong>

                  </div>


                  <div className="detail-item">

                    <span>
                      Payment Method
                    </span>

                    <strong>
                      {String(
                        selectedStudent.payment_method ||
                          "—"
                      ).toUpperCase()}
                    </strong>

                  </div>


                  <div className="detail-item">

                    <span>
                      Payment Amount
                    </span>

                    <strong className="amount-text">

                      ৳
                      {Number(
                        selectedStudent.payment_amount ||
                          3499
                      ).toLocaleString(
                        "en-BD"
                      )}

                    </strong>

                  </div>


                  <div className="detail-item">

                    <span>
                      Payment Status
                    </span>

                    <strong>

                      <span
                        className={`status-badge status-badge-${getStatus(
                          selectedStudent
                        )}`}
                      >

                        {getStatus(
                          selectedStudent
                        )}

                      </span>

                    </strong>

                  </div>


                  <div className="detail-item detail-wide">

                    <span>
                      Sender Payment Number
                    </span>

                    <strong>
                      {
                        selectedStudent.payment_number ||
                        "—"
                      }
                    </strong>

                  </div>


                  <div className="detail-item detail-wide">

                    <span>
                      Transaction ID
                    </span>

                    <strong className="transaction-text">
                      {
                        selectedStudent.transaction_id ||
                        "—"
                      }
                    </strong>

                  </div>

                </div>


                {/* MESSAGE */}

                <div className="detail-message">

                  <span>
                    Additional Message
                  </span>

                  <p>
                    {
                      selectedStudent.message ||
                      "No additional message provided."
                    }
                  </p>

                </div>


                {/* SCREENSHOT */}

                {getScreenshotUrl(
                  selectedStudent
                ) && (

                  <div className="modal-screenshot">

                    <div className="modal-screenshot-heading">

                      <span>
                        Payment Screenshot
                      </span>

                      <a
                        href={getScreenshotUrl(
                          selectedStudent
                        )}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open Full Size ↗
                      </a>

                    </div>


                    <div className="modal-image-wrapper">

                      <img
                        src={getScreenshotUrl(
                          selectedStudent
                        )}
                        alt="Payment screenshot"
                        onError={(event) => {
                          event.currentTarget.style.display =
                            "none";
                        }}
                      />

                    </div>

                  </div>

                )}

              </div>


              {/* =================================================
                  MODAL FOOTER
              ================================================= */}

              <div className="modal-footer">

                <button
                  type="button"
                  className="modal-secondary-btn"
                  onClick={closeDetails}
                >
                  Close
                </button>


                <select
                  className={`modal-status-select status-${getStatus(
                    selectedStudent
                  )}`}
                  value={getStatus(
                    selectedStudent
                  )}
                  disabled={
                    updatingId ===
                    selectedStudent.id
                  }
                  onChange={(event) =>
                    updatePaymentStatus(
                      selectedStudent.id,
                      event.target.value
                    )
                  }
                >

                  <option value="pending">
                    Pending
                  </option>

                  <option value="verified">
                    Verified
                  </option>

                  <option value="rejected">
                    Rejected
                  </option>

                </select>

              </div>

            </div>

          </div>

        )}

    </div>
  );
}

export default Admin;