import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Home.css";
import "../components/Navbar.css";

function Home() {
  const [openModule, setOpenModule] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleModule = (index) => {
    setOpenModule(
      openModule === index ? null : index
    );
  };

  const toggleFaq = (index) => {
    setOpenFaq(
      openFaq === index ? null : index
    );
  };

  const modules = [
    {
      number: "01",
      title: "Android Development Fundamentals",
      lesson: "Android Studio & Development Basics",
      topics: [
        "Android Studio setup and configuration",
        "Understanding Android Studio interface",
        "Creating and managing Android projects",
        "Understanding Android project structure",
        "Activities and Android application lifecycle",
        "Java basics required for Android development",
        "XML fundamentals for Android UI",
        "Creating your first Android application",
      ],
    },
    {
      number: "02",
      title: "Java for Android Development",
      lesson: "Programming & Object-Oriented Concepts",
      topics: [
        "Variables and data types",
        "Operators and expressions",
        "Conditional statements",
        "Loops and iteration",
        "Methods and functions",
        "Arrays and Strings",
        "Classes and Objects",
        "Object-Oriented Programming",
        "Inheritance and Polymorphism",
        "Encapsulation and Abstraction",
      ],
    },
    {
      number: "03",
      title: "Building Android Interfaces",
      lesson: "XML UI & Interactive Applications",
      topics: [
        "XML layout fundamentals",
        "LinearLayout and ConstraintLayout",
        "TextView, EditText and Button",
        "ImageView and CardView",
        "Input fields and form design",
        "RecyclerView and Adapter",
        "Lists and dynamic content",
        "Material UI components",
        "Professional Android interface design",
        "Responsive and user-friendly layouts",
      ],
    },
    {
      number: "04",
      title: "Backend with PHP and MySQL",
      lesson: "Database, PHP & REST API",
      topics: [
        "Introduction to backend development",
        "XAMPP and localhost environment",
        "PHP fundamentals",
        "Handling Android application requests",
        "MySQL database creation",
        "Database tables and relationships",
        "SQL queries",
        "CRUD operations",
        "PHP and MySQL integration",
        "REST API development",
        "JSON response handling",
        "Connecting Android apps with backend APIs",
      ],
    },
    {
      number: "05",
      title: "Real-World Android Projects",
      lesson: "Build Complete Applications",
      topics: [
        "User registration and authentication",
        "Login and protected application features",
        "Image selection and image upload",
        "File handling with PHP backend",
        "GPS and location services",
        "Google Maps integration",
        "Map markers and location selection",
        "Working with real-world APIs",
        "Complete Android + PHP + MySQL integration",
        "Building portfolio-ready applications",
      ],
    },
  ];

  const projects = [
    {
      number: "01",
      title: "Student Registration App",
      description:
        "Build a complete registration application connected with a PHP and MySQL backend.",
      stack: "Java • XML • PHP • MySQL",
    },
    {
      number: "02",
      title: "Login & Authentication System",
      description:
        "Create a complete registration and login flow with backend validation.",
      stack: "Android • PHP • MySQL • API",
    },
    {
      number: "03",
      title: "To-Do / Task Manager",
      description:
        "Build a practical task management application with create, update and delete functionality.",
      stack: "Java • XML • Database",
    },
    {
      number: "04",
      title: "Expense Tracker",
      description:
        "Create an application for managing daily expenses and financial records.",
      stack: "Android • Java • MySQL",
    },
    {
      number: "05",
      title: "Notes Management App",
      description:
        "Build a notes application with data management and a clean Android interface.",
      stack: "Java • XML • Database",
    },
    {
      number: "06",
      title: "Online Course Registration",
      description:
        "Create a course registration system with Android frontend and backend database.",
      stack: "Android • PHP • MySQL",
    },
    {
      number: "07",
      title: "Dynamic Content App",
      description:
        "Fetch dynamic information from a backend API and display it using RecyclerView.",
      stack: "REST API • JSON • RecyclerView",
    },
    {
      number: "08",
      title: "Image Upload App",
      description:
        "Learn how to select images from a device and upload them to a PHP server.",
      stack: "Android • PHP • MySQL",
    },
    {
      number: "09",
      title: "GPS Location App",
      description:
        "Build an application that detects and displays the user's current location.",
      stack: "GPS • Location API • Android",
    },
    {
      number: "10",
      title: "Google Maps App",
      description:
        "Work with Google Maps, markers and location-based application features.",
      stack: "Google Maps • GPS • Java",
    },
    {
      number: "11",
      title: "Location-Based Reporting App",
      description:
        "Build a real-world reporting application using location, images and backend APIs.",
      stack: "Android • GPS • Maps • PHP",
    },
    {
      number: "12",
      title: "Emergency / SOS App",
      description:
        "Create an emergency-focused application using location and quick-access features.",
      stack: "Android • GPS • Maps • API",
    },
    {
      number: "13",
      title: "Admin Management System",
      description:
        "Build a backend management interface for viewing and managing submitted data.",
      stack: "PHP • MySQL • REST API",
    },
    {
      number: "14",
      title: "Full Stack Service App",
      description:
        "Combine authentication, APIs, database operations and multiple Android features.",
      stack: "Android • PHP • MySQL • API",
    },
    {
      number: "15+",
      title: "Final Portfolio Project",
      description:
        "Build a complete real-world application by combining the technologies learned throughout the course.",
      stack: "Full Stack Android",
    },
  ];

  const faqs = [
    {
      question:
        "Is this course suitable for complete beginners?",
      answer:
        "Yes. The course starts with Android Studio, project structure and the Java concepts required for Android development. You can gradually move from the fundamentals to complete application development.",
    },
    {
      question:
        "Do I need previous Android development experience?",
      answer:
        "No. Previous Android development experience is not required. The course follows a structured path from fundamentals to practical projects.",
    },
    {
      question:
        "Which technologies will I learn?",
      answer:
        "You will work with Android Studio, Java, XML, PHP, MySQL, SQL, REST API, JSON, GPS and Google Maps as part of the practical development journey.",
    },
    {
      question:
        "How many projects will I build?",
      answer:
        "The course includes 15+ practical projects covering Android applications, databases, authentication, APIs, GPS, Google Maps, image upload and complete application integration.",
    },
    {
      question:
        "Will I learn backend development?",
      answer:
        "Yes. You will learn PHP and MySQL and understand how Android applications communicate with backend systems through REST APIs.",
    },
    {
      question:
        "Will GPS and Google Maps be included?",
      answer:
        "Yes. GPS, location services, Google Maps, markers and location-based application features are included in the Real-World Android Projects module.",
    },
    {
      question:
        "Is the course project-based?",
      answer:
        "Yes. The learning approach focuses on practical development and real projects so that you can apply the concepts you learn.",
    },
    {
      question:
        "What is the current course fee?",
      answer:
        "The current launch offer is ৳3,499. The original course fee is ৳6,500.",
    },
  ];

  return (
    <div className="app">

      {/* =========================================
          NAVBAR
          ========================================= */}
      <header className="navbar">

        <div className="navbar-content">

          <Link
            to="/"
            className="logo"
          >
            <span className="logo-icon">
              &lt;/&gt;
            </span>

            <span className="logo-text">
              <strong>App</strong>KarKhana
            </span>
          </Link>


          <nav className="nav-links">

            <Link
              to="/"
              className="nav-link"
            >
              Home
            </Link>

            <a
              href="#courses"
              className="nav-link"
            >
              Courses
            </a>

            <a
              href="#curriculum"
              className="nav-link"
            >
              Curriculum
            </a>

            <a
              href="#projects"
              className="nav-link"
            >
              Projects
            </a>

            <a
              href="#about"
              className="nav-link"
            >
              About
            </a>

            <a
              href="#faq"
              className="nav-link"
            >
              FAQ
            </a>

            <Link
              to="/status"
              className="nav-link"
            >
              Check Registration
            </Link>

          </nav>


          <Link
            to="/register"
            className="nav-register-btn"
          >
            Register Now
          </Link>

        </div>

      </header>


      <main>

        {/* =========================================
            HERO
            ========================================= */}
        <section
          className="hero-section"
          id="home"
        >

          <div className="hero-container">

            <div className="hero-text">

              <div className="hero-badge">
                🚀 Learn. Build. Launch.
              </div>


              <h1 className="hero-title">
                Build Your Future
                <br />
                With <span>App Development.</span>
              </h1>


              <p className="hero-description">
                Learn Android App Development from basic
                to advanced and turn your ideas into
                real-world applications through practical,
                project-based learning.
              </p>


              <div className="hero-highlights">

                <span>
                  ✓ Basic to Advance
                </span>

                <span>
                  ✓ 15+ Projects
                </span>

                <span>
                  ✓ Android + Backend
                </span>

              </div>


              <div className="hero-buttons">

                <a
                  href="#curriculum"
                  className="primary-button"
                >
                  Explore Curriculum →
                </a>

                <Link
                  to="/register"
                  className="secondary-button"
                >
                  Register Now
                </Link>

              </div>


              <div className="hero-trust">

                <div>
                  <strong>
                    05
                  </strong>

                  <span>
                    Core Modules
                  </span>
                </div>

                <div>
                  <strong>
                    15+
                  </strong>

                  <span>
                    Projects
                  </span>
                </div>

                <div>
                  <strong>
                    Full
                  </strong>

                  <span>
                    Development Journey
                  </span>
                </div>

              </div>

            </div>


            <div className="hero-visual">

              <div className="code-card">

                <div className="code-card-header">

                  <span className="code-dot"></span>

                  <span className="code-dot"></span>

                  <span className="code-dot"></span>

                  <span className="code-file">
                    MainActivity.java
                  </span>

                </div>


                <div className="code-content">

                  <div>
                    <span className="code-keyword">
                      public class
                    </span>{" "}
                    MyFirstApp {"{"}
                  </div>

                  <div>
                    &nbsp;&nbsp;

                    <span className="code-keyword">
                      public void
                    </span>{" "}
                    build() {"{"}
                  </div>

                  <div>
                    &nbsp;&nbsp;&nbsp;&nbsp;

                    System.out.println(

                    <span className="code-string">
                      "Hello World"
                    </span>

                    );
                  </div>

                  <div>
                    &nbsp;&nbsp;{"}"}
                  </div>

                  <div>
                    {"}"}
                  </div>

                  <br />

                  <div className="code-comment">
                    // Build real-world Android apps
                  </div>

                  <div className="code-comment">
                    // Learn Java + XML + PHP + MySQL
                  </div>

                  <div className="code-comment">
                    // Connect apps with REST APIs
                  </div>

                </div>

              </div>


              <div className="hero-floating-card">

                <span className="floating-icon">
                  ⚡
                </span>

                <div>

                  <strong>
                    From Idea → App
                  </strong>

                  <small>
                    Learn by building
                  </small>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =========================================
            COURSE OVERVIEW
            ========================================= */}
        <section
          className="overview-section"
          id="courses"
        >

          <div className="section-container">

            <span className="section-label">
              COMPLETE COURSE
            </span>

            <h2 className="section-title">
              Android App Development
            </h2>

            <p className="section-description">
              A complete practical journey from Android
              fundamentals to backend integration and
              real-world application development.
            </p>

          </div>


          <div className="overview-grid">

            <div className="overview-card">

              <div className="overview-icon">
                📱
              </div>

              <h3>
                Android Development
              </h3>

              <p>
                Learn Android Studio, project structure,
                Activities, Java and core Android development.
              </p>

            </div>


            <div className="overview-card">

              <div className="overview-icon">
                💻
              </div>

              <h3>
                Java & XML
              </h3>

              <p>
                Build Android logic with Java and create
                professional interfaces using XML.
              </p>

            </div>


            <div className="overview-card">

              <div className="overview-icon">
                🗄️
              </div>

              <h3>
                PHP & MySQL
              </h3>

              <p>
                Build backend systems, databases and
                CRUD operations using PHP and MySQL.
              </p>

            </div>


            <div className="overview-card">

              <div className="overview-icon">
                🔗
              </div>

              <h3>
                REST API
              </h3>

              <p>
                Connect Android applications with
                backend servers using REST APIs and JSON.
              </p>

            </div>

          </div>

        </section>


        {/* =========================================
            CURRICULUM
            ========================================= */}
        <section
          className="curriculum-section"
          id="curriculum"
        >

          <div className="section-container">

            <span className="section-label">
              COURSE CURRICULUM
            </span>

            <h2 className="section-title">
              What You Will Learn
            </h2>

            <p className="section-description">
              A structured 5-module learning path designed
              to take you from Android fundamentals to
              complete real-world applications.
            </p>

          </div>


          <div className="modules-list">

            {modules.map((module, index) => (

              <div
                className={`module-card ${
                  openModule === index
                    ? "module-open"
                    : ""
                }`}
                key={module.number}
              >

                <button
                  className="module-header"
                  onClick={() =>
                    toggleModule(index)
                  }
                  aria-expanded={
                    openModule === index
                  }
                >

                  <div className="module-heading">

                    <span className="module-number">
                      {module.number}
                    </span>

                    <div>

                      <span className="module-label">
                        MODULE {module.number}
                      </span>

                      <h3>
                        {module.title}
                      </h3>

                      <p>
                        {module.lesson}
                      </p>

                    </div>

                  </div>


                  <span className="module-toggle">

                    {openModule === index
                      ? "−"
                      : "+"}

                  </span>

                </button>


                {openModule === index && (

                  <div className="module-content">

                    <div className="module-content-inner">

                      <div className="module-learn-title">
                        What you'll learn
                      </div>


                      <div className="module-topics">

                        {module.topics.map(
                          (topic) => (

                            <div
                              className="module-topic"
                              key={topic}
                            >

                              <span>
                                ✓
                              </span>

                              <p>
                                {topic}
                              </p>

                            </div>

                          )
                        )}

                      </div>

                    </div>

                  </div>

                )}

              </div>

            ))}

          </div>

        </section>


        {/* =========================================
            ROADMAP
            ========================================= */}
        <section className="roadmap-section">

          <div className="section-container">

            <span className="section-label">
              LEARNING JOURNEY
            </span>

            <h2 className="section-title">
              From Beginner to App Developer
            </h2>

            <p className="section-description">
              Each module builds the foundation for the
              next stage of your development journey.
            </p>

          </div>


          <div className="roadmap">

            <div className="roadmap-line"></div>


            <div className="roadmap-item">

              <div className="roadmap-number">
                01
              </div>

              <div>
                <span>
                  START
                </span>

                <h3>
                  Learn
                </h3>

                <p>
                  Android Studio,
                  Java and fundamentals.
                </p>
              </div>

            </div>


            <div className="roadmap-item">

              <div className="roadmap-number">
                02
              </div>

              <div>
                <span>
                  BUILD
                </span>

                <h3>
                  Design
                </h3>

                <p>
                  Build Android interfaces
                  with XML.
                </p>
              </div>

            </div>


            <div className="roadmap-item">

              <div className="roadmap-number">
                03
              </div>

              <div>
                <span>
                  CONNECT
                </span>

                <h3>
                  Backend
                </h3>

                <p>
                  PHP, MySQL and
                  REST APIs.
                </p>
              </div>

            </div>


            <div className="roadmap-item">

              <div className="roadmap-number">
                04
              </div>

              <div>
                <span>
                  ADVANCE
                </span>

                <h3>
                  Integrate
                </h3>

                <p>
                  GPS, Maps, images
                  and APIs.
                </p>
              </div>

            </div>


            <div className="roadmap-item">

              <div className="roadmap-number">
                05
              </div>

              <div>
                <span>
                  LAUNCH
                </span>

                <h3>
                  Create
                </h3>

                <p>
                  Build complete
                  portfolio projects.
                </p>
              </div>

            </div>

          </div>

        </section>


        {/* =========================================
            PROJECTS
            ========================================= */}
        <section
          className="projects-section"
          id="projects"
        >

          <div className="section-container">

            <span className="section-label">
              PROJECT-BASED LEARNING
            </span>

            <h2 className="section-title">
              Build 15+ Practical Projects
            </h2>

            <p className="section-description">
              Learn by building practical applications
              instead of only studying theory.
            </p>

          </div>


          <div className="projects-grid">

            {projects.map((project) => (

              <article
                className="project-card"
                key={project.number}
              >

                <div className="project-number">
                  {project.number}
                </div>


                <div className="project-content">

                  <h3>
                    {project.title}
                  </h3>

                  <p>
                    {project.description}
                  </p>

                  <span className="project-stack">
                    {project.stack}
                  </span>

                </div>

              </article>

            ))}

          </div>

        </section>


        {/* =========================================
            TECHNOLOGY STACK
            ========================================= */}
        <section className="technology-section">

          <div className="section-container">

            <span className="section-label">
              TECHNOLOGY STACK
            </span>

            <h2 className="section-title">
              Technologies You'll Work With
            </h2>

            <p className="section-description">
              Learn the core technologies required to
              build complete Android applications.
            </p>

          </div>


          <div className="technology-grid">

            <div className="technology-item">
              <strong>
                Android Studio
              </strong>

              <span>
                Development Environment
              </span>
            </div>


            <div className="technology-item">
              <strong>
                Java
              </strong>

              <span>
                Programming Language
              </span>
            </div>


            <div className="technology-item">
              <strong>
                XML
              </strong>

              <span>
                Android UI
              </span>
            </div>


            <div className="technology-item">
              <strong>
                PHP
              </strong>

              <span>
                Backend Development
              </span>
            </div>


            <div className="technology-item">
              <strong>
                MySQL
              </strong>

              <span>
                Database
              </span>
            </div>


            <div className="technology-item">
              <strong>
                SQL
              </strong>

              <span>
                Database Queries
              </span>
            </div>


            <div className="technology-item">
              <strong>
                REST API
              </strong>

              <span>
                App Communication
              </span>
            </div>


            <div className="technology-item">
              <strong>
                JSON
              </strong>

              <span>
                Data Exchange
              </span>
            </div>


            <div className="technology-item">
              <strong>
                Google Maps
              </strong>

              <span>
                Map Integration
              </span>
            </div>


            <div className="technology-item">
              <strong>
                GPS
              </strong>

              <span>
                Location Services
              </span>
            </div>


            <div className="technology-item">
              <strong>
                Git & GitHub
              </strong>

              <span>
                Version Control
              </span>
            </div>


            <div className="technology-item">
              <strong>
                XAMPP
              </strong>

              <span>
                Local Server
              </span>
            </div>

          </div>

        </section>


        {/* =========================================
            LEARNING OUTCOMES
            ========================================= */}
        <section className="outcome-section">

          <div className="outcome-container">

            <div className="outcome-content">

              <span className="section-label">
                COURSE OUTCOME
              </span>

              <h2>
                What Will You Be Able to Build?
              </h2>

              <p>
                By completing the modules and practical
                projects, you will have a foundation for
                building complete Android applications
                and connecting them with backend systems.
              </p>


              <div className="outcome-list">

                <div>
                  <span>
                    ✓
                  </span>

                  Build Android applications
                  from scratch
                </div>

                <div>
                  <span>
                    ✓
                  </span>

                  Create professional XML
                  interfaces
                </div>

                <div>
                  <span>
                    ✓
                  </span>

                  Work with Java and OOP
                </div>

                <div>
                  <span>
                    ✓
                  </span>

                  Build PHP and MySQL
                  backend systems
                </div>

                <div>
                  <span>
                    ✓
                  </span>

                  Create and use REST APIs
                </div>

                <div>
                  <span>
                    ✓
                  </span>

                  Implement authentication
                  systems
                </div>

                <div>
                  <span>
                    ✓
                  </span>

                  Work with GPS and Google Maps
                </div>

                <div>
                  <span>
                    ✓
                  </span>

                  Build portfolio-ready projects
                </div>

              </div>

            </div>


            <div className="outcome-card">

              <div className="outcome-card-top">

                <span>
                  APPKARKHANA
                </span>

                <span>
                  ROADMAP
                </span>

              </div>


              <div className="outcome-flow">

                <div>

                  <strong>
                    01
                  </strong>

                  Learn

                  <small>
                    Fundamentals
                  </small>

                </div>


                <span>
                  →
                </span>


                <div>

                  <strong>
                    02
                  </strong>

                  Build

                  <small>
                    Android Apps
                  </small>

                </div>


                <span>
                  →
                </span>


                <div>

                  <strong>
                    03
                  </strong>

                  Connect

                  <small>
                    Backend
                  </small>

                </div>


                <span>
                  →
                </span>


                <div>

                  <strong>
                    04
                  </strong>

                  Create

                  <small>
                    Projects
                  </small>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =========================================
            ABOUT
            ========================================= */}
        <section
          className="about-section"
          id="about"
        >

          <div className="about-grid">

            <div className="about-content">

              <span className="section-label">
                ABOUT APPKARKHANA
              </span>

              <h2>
                Learn Through Practical Experience
              </h2>

              <p>
                AppKarKhana is focused on helping students
                learn practical app development skills and
                transform their ideas into working applications.
              </p>

              <p>
                The learning approach combines programming,
                Android development, backend technologies and
                practical projects so that students can
                understand how complete applications are built.
              </p>


              <div className="about-points">

                <div className="about-point">

                  <span className="about-point-icon">
                    ✓
                  </span>

                  <span>
                    Beginner-friendly learning approach
                  </span>

                </div>


                <div className="about-point">

                  <span className="about-point-icon">
                    ✓
                  </span>

                  <span>
                    Practical project-based learning
                  </span>

                </div>


                <div className="about-point">

                  <span className="about-point-icon">
                    ✓
                  </span>

                  <span>
                    Real-world development technologies
                  </span>

                </div>


                <div className="about-point">

                  <span className="about-point-icon">
                    ✓
                  </span>

                  <span>
                    Portfolio-focused projects
                  </span>

                </div>

              </div>

            </div>


            <div className="about-visual">

              <div className="code-card">

                <div className="code-card-header">

                  <span className="code-dot"></span>

                  <span className="code-dot"></span>

                  <span className="code-dot"></span>

                  <span className="code-file">
                    roadmap.txt
                  </span>

                </div>


                <div className="code-content">

                  <div className="code-comment">
                    // AppKarKhana
                  </div>

                  <br />

                  <div>
                    <span className="code-keyword">
                      Learn
                    </span>

                    {" → "}

                    <span className="code-string">
                      Build
                    </span>
                  </div>

                  <div>
                    <span className="code-keyword">
                      Build
                    </span>

                    {" → "}

                    <span className="code-string">
                      Practice
                    </span>
                  </div>

                  <div>
                    <span className="code-keyword">
                      Practice
                    </span>

                    {" → "}

                    <span className="code-string">
                      Create
                    </span>
                  </div>

                  <div>
                    <span className="code-keyword">
                      Create
                    </span>

                    {" → "}

                    <span className="code-string">
                      Launch
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =========================================
            FAQ
            ========================================= */}
        <section
          className="faq-section"
          id="faq"
        >

          <div className="section-container">

            <span className="section-label">
              FAQ
            </span>

            <h2 className="section-title">
              Frequently Asked Questions
            </h2>

            <p className="section-description">
              Everything you may want to know before
              joining the AppKarKhana course.
            </p>

          </div>


          <div className="faq-container">

            {faqs.map((faq, index) => (

              <div
                className={`faq-item ${
                  openFaq === index
                    ? "faq-open"
                    : ""
                }`}
                key={faq.question}
              >

                <button
                  className="faq-question"
                  onClick={() =>
                    toggleFaq(index)
                  }
                  aria-expanded={
                    openFaq === index
                  }
                >

                  <span>
                    {faq.question}
                  </span>

                  <span className="faq-icon">
                    {openFaq === index
                      ? "−"
                      : "+"}
                  </span>

                </button>


                {openFaq === index && (

                  <div className="faq-answer">

                    <p>
                      {faq.answer}
                    </p>

                  </div>

                )}

              </div>

            ))}

          </div>

        </section>


        {/* =========================================
            CTA
            ========================================= */}
        <section className="cta-section">

          <div className="cta-box">

            <span className="cta-label">
              START YOUR JOURNEY
            </span>

            <h2>
              Ready to Start Building?
            </h2>

            <p>
              Join the AppKarKhana Android App Development
              course and start turning your ideas into
              real applications.
            </p>


            <div className="cta-actions">

              <Link
                to="/register"
                className="primary-button"
              >
                Secure Your Seat →
              </Link>

              <a
                href="#curriculum"
                className="cta-outline-button"
              >
                View Curriculum
              </a>

            </div>


            <div className="cta-price">

              <span>
                Original Price
              </span>

              <del>
                ৳6,500
              </del>

              <strong>
                ৳3,499
              </strong>

              <small>
                Launch Offer
              </small>

            </div>

          </div>

        </section>


        {/* =========================================
            CONTACT
            ========================================= */}
        <section
          className="contact-section"
          id="contact"
        >

          <div className="section-container">

            <span className="section-label">
              CONTACT
            </span>

            <h2 className="section-title">
              Have a Question?
            </h2>

            <p className="section-description">
              Feel free to contact AppKarKhana for course
              information and registration support.
            </p>

          </div>


          <div className="contact-card">

            <div className="contact-icon">
              💬
            </div>

            <div>

              <p>
                For course registration and
                payment information
              </p>

               <p>
               AppKarKhana Course Support
              </p>

              <p className="contact-email">
                Whatsapp: +880 1608614063<br></br>
                Email : rumelasif41@gmail.com
              </p>

            </div>

          </div>

        </section>

      </main>


      {/* =========================================
          FOOTER
          ========================================= */}
      <footer className="footer">

        <div className="footer-container">

          <div className="footer-grid">

            <div className="footer-brand">

              <div className="footer-logo">
                &lt;/&gt;AppKarKhana
              </div>

              <p>
                Learn. Build. Launch.
                <br />
                Practical app development learning
                for the next generation.
              </p>

            </div>


            <div className="footer-column">

              <h4>
                Navigation
              </h4>

              <a href="#home">
                Home
              </a>

              <a href="#courses">
                Courses
              </a>

              <a href="#curriculum">
                Curriculum
              </a>

              <a href="#projects">
                Projects
              </a>

              <a href="#about">
                About
              </a>

              <a href="#faq">
                FAQ
              </a>

            </div>


            <div className="footer-column">

              <h4>
                Course
              </h4>

              <Link to="/register">
                Register Now
              </Link>

              <Link to="/status">
                Check Registration
              </Link>

              <a href="#curriculum">
                Course Curriculum
              </a>

              <a href="#projects">
                Projects
              </a>

              <a href="#contact">
                Contact
              </a>

            </div>

          </div>


          <div className="footer-bottom">

            <span>
              © {new Date().getFullYear()} AppKarKhana.
              All rights reserved.
            </span>

            <span>
              Learn. Build. Launch.
            </span>

          </div>

        </div>

      </footer>

    </div>
  );
}

export default Home;