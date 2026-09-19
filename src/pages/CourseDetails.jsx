import { Link } from "react-router-dom";
import "./CourseDetails.css";

function CourseDetails() {
  const modules = [
    {
      number: "01",
      title: "Android Development Fundamentals",
      lessons: "4 Lessons",
      topics: [
        "Android Studio setup",
        "Project structure",
        "Java programming basics",
        "XML layout design",
      ],
    },
    {
      number: "02",
      title: "Java for Android Development",
      lessons: "5 Lessons",
      topics: [
        "Variables and data types",
        "Conditions and loops",
        "Methods and classes",
        "Object-oriented programming",
      ],
    },
    {
      number: "03",
      title: "Building Android Interfaces",
      lessons: "4 Lessons",
      topics: [
        "Layouts and views",
        "Buttons and input fields",
        "RecyclerView",
        "Material UI components",
      ],
    },
    {
      number: "04",
      title: "Backend with PHP and MySQL",
      lessons: "5 Lessons",
      topics: [
        "PHP fundamentals",
        "MySQL database",
        "CRUD operations",
        "REST API development",
      ],
    },
    {
      number: "05",
      title: "Real-World Android Projects",
      lessons: "6 Lessons",
      topics: [
        "Authentication system",
        "Image upload",
        "GPS and Google Maps",
        "Complete project integration",
      ],
    },
  ];

  return (
    <div className="course-page">
      <nav className="course-navbar">
        <Link to="/" className="course-brand">
          <span className="brand-icon">&lt;/&gt;</span>
          <span>AppKarKhana</span>
        </Link>

        <div className="course-nav-links">
          <Link to="/">Home</Link>
          <Link to="/#courses">Courses</Link>
          <Link to="/#about">About</Link>
          <Link to="/#learning">Learning Hub</Link>
        </div>

        <a href="#register" className="course-nav-button">
          Enroll Now
        </a>
      </nav>

      <main>
        <section className="course-hero">
          <div className="course-hero-content">
            <div className="course-badge">🚀 Complete Development Course</div>

            <h1>
              Android App Development
              <span>Basic to Advance</span>
            </h1>

            <p className="course-description">
              Learn how to build real-world Android applications using Java,
              XML, PHP, and MySQL. Start from the fundamentals and become
              confident in developing complete mobile applications.
            </p>

            <div className="course-actions">
              <a href="#register" className="primary-course-button">
                Enroll Now →
              </a>

              <a href="#curriculum" className="secondary-course-button">
                View Curriculum
              </a>
            </div>

            <div className="course-meta">
              <div>
                <strong>6 Weeks</strong>
                <span>Duration</span>
              </div>

              <div>
                <strong>18 Sessions</strong>
                <span>Live Classes</span>
              </div>

              <div>
                <strong>15+ Projects</strong>
                <span>Practical Learning</span>
              </div>
            </div>
          </div>

          <div className="course-price-card">
            <div className="price-card-label">LIMITED LAUNCH OFFER</div>

            <div className="old-price">৳6,500</div>

            <div className="new-price">৳3,499</div>

            <p>One-time payment</p>

            <a href="#register" className="price-enroll-button">
              Secure Your Seat
            </a>

            <small>Limited seats available</small>
          </div>
        </section>

        <section className="course-overview">
          <div className="section-heading">
            <span>What You Will Learn</span>

            <h2>Everything You Need to Build Real Apps</h2>

            <p>
              This course is designed for students who want practical skills,
              portfolio projects, and a strong foundation in app development.
            </p>
          </div>

          <div className="learning-grid">
            <div className="learning-card">
              <div className="learning-icon">📱</div>
              <h3>Android Development</h3>
              <p>
                Build modern Android applications using Android Studio, Java,
                and XML.
              </p>
            </div>

            <div className="learning-card">
              <div className="learning-icon">💻</div>
              <h3>Backend Development</h3>
              <p>
                Create PHP APIs, connect MySQL databases, and exchange data
                using JSON.
              </p>
            </div>

            <div className="learning-card">
              <div className="learning-icon">🗺️</div>
              <h3>Real-World Features</h3>
              <p>
                Learn authentication, image upload, GPS, Google Maps, and
                complete app integration.
              </p>
            </div>

            <div className="learning-card">
              <div className="learning-icon">🚀</div>
              <h3>Portfolio Projects</h3>
              <p>
                Build practical projects that can be added to your GitHub, CV,
                and portfolio.
              </p>
            </div>
          </div>
        </section>

        <section id="curriculum" className="curriculum-section">
          <div className="section-heading">
            <span>Course Curriculum</span>

            <h2>Step-by-Step Learning Roadmap</h2>

            <p>
              Follow a structured learning path from beginner concepts to
              complete Android applications.
            </p>
          </div>

          <div className="modules-list">
            {modules.map((module) => (
              <div className="module-card" key={module.number}>
                <div className="module-number">{module.number}</div>

                <div className="module-content">
                  <div className="module-header">
                    <div>
                      <h3>{module.title}</h3>
                      <span>{module.lessons}</span>
                    </div>

                    <span className="module-arrow">+</span>
                  </div>

                  <ul>
                    {module.topics.map((topic) => (
                      <li key={topic}>{topic}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="register" className="enroll-section">
          <div className="enroll-content">
            <span>Start Your Journey Today</span>

            <h2>
              Turn Your Ideas Into
              <strong>Real Applications.</strong>
            </h2>

            <p>
              Join AppKarKhana and learn the skills needed to design, develop,
              and launch Android applications.
            </p>

            <a
              href="mailto:appkarkhana@gmail.com"
              className="enroll-main-button"
            >
              Register for the Course →
            </a>
          </div>

          <div className="enroll-price">
            <small>Course Fee</small>
            <div className="enroll-old-price">৳6,500</div>
            <div className="enroll-new-price">৳3,499</div>
            <span>Launch Offer</span>
          </div>
        </section>
      </main>

      <footer className="course-footer">
        <div>
          <Link to="/" className="course-brand footer-brand">
            <span className="brand-icon">&lt;/&gt;</span>
            <span>AppKarKhana</span>
          </Link>

          <p>Learn. Build. Launch.</p>
        </div>

        <p>© 2026 AppKarKhana. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default CourseDetails;