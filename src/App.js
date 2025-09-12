import { useEffect, useState } from "react";

const App = () => {
  const [showTop, setShowTop] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fullText = "B.Tech Student | Web Developer | Problem Solver";

  // Typing effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(prev => prev + fullText.charAt(i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [fullText]);

  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 250);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle message sent notification
  useEffect(() => {
    if (messageSent) {
      const timer = setTimeout(() => {
        setMessageSent(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [messageSent]);

  // Helper function to handle smooth scrolling to sections
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Close mobile menu after clicking a link
      setIsMenuOpen(false);
    }
  };

  const menuLinks = ["About", "Education", "Skills", "Projects", "Contact"];

  return (
    <div className={`font-sans antialiased transition-colors duration-300 ${darkMode ? "bg-slate-950 text-slate-200" : "bg-white text-slate-800"}`}>
      {/* Tailwind CSS and Font */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          body { font-family: 'Inter', sans-serif; }
          .highlight { background-image: linear-gradient(90deg, #6366f1, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
          .skill-badge { padding: 0.5rem 1rem; border-radius: 9999px; font-weight: 600; font-size: 0.875rem; transition: background-color 0.3s, transform 0.2s; }
          .project-card:hover { transform: translateY(-5px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
          
          /* Cool background animation for About Me section */
          .about-section {
            position: relative;
            overflow: hidden;
          }
          .about-section::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(99,102,241,0) 70%);
            transform: rotate(45deg);
            opacity: ${darkMode ? '0.1' : '0.05'};
            animation: move-gradient 20s infinite linear;
            pointer-events: none;
            z-index: 0;
          }
          @keyframes move-gradient {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <script src="https://cdn.tailwindcss.com"></script>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Mobile Sidebar */}
      <aside className={`fixed top-0 left-0 right-0 z-50 w-full shadow-lg transform ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} transition-transform duration-300 ease-in-out md:hidden ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="p-8 flex flex-col items-start h-screen overflow-y-auto">
          <h1 className="text-2xl font-bold mb-8">Menu</h1>
          <nav className="flex flex-col space-y-4 w-full">
            {menuLinks.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.toLowerCase()); }}
                className="text-lg font-medium hover:text-indigo-400 transition-colors duration-200 w-full"
              >
                {link}
              </a>
            ))}
            <button
              onClick={() => { setDarkMode(!darkMode); setIsMenuOpen(false); }}
              className={`mt-4 p-2 rounded-lg w-full text-center transition-colors duration-200 ${darkMode ? "bg-slate-700 text-slate-100 hover:bg-slate-600" : "bg-slate-200 text-slate-800 hover:bg-slate-300"}`}
            >
              {darkMode ? "🌙 Light Mode" : "☀️ Dark Mode"}
            </button>
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isMenuOpen && (
        <div onClick={() => setIsMenuOpen(false)} className="fixed inset-0 z-40 bg-black opacity-50 md:hidden"></div>
      )}

      {/* Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 backdrop-blur-md transition-colors duration-300 ${darkMode ? 'bg-slate-950/80' : 'bg-white/80'}`}>
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold cursor-pointer transition-colors duration-300">Pranav Javalekar</h1>
          <nav className="hidden md:flex items-center space-x-8">
            {menuLinks.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.toLowerCase()); }}
                className="text-lg font-medium hover:text-indigo-400 transition-colors duration-200"
              >
                {link}
              </a>
            ))}
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-slate-700 transition-colors duration-200">
              {darkMode ? "🌙" : "☀️"}
            </button>
          </nav>
          <button onClick={() => setIsMenuOpen(true)} className="md:hidden cursor-pointer p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center p-6 pt-24 overflow-hidden">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
          Hello, I'm <br className="md:hidden" /><span className="highlight">Pranav Javalekar</span>
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl font-medium typed-text h-6 min-w-[200px]">{typedText}</p>
        <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}>
            <button className="w-full sm:w-auto px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition-colors duration-300">
              Contact Me
            </button>
          </a>
          <a href="pranavResume1.pdf" download="pranav_javalekar_resume.pdf">
            <button className={`w-full sm:w-auto px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${darkMode ? 'border border-current' : 'border border-slate-800'}`}>
              📄 Download Resume
            </button>
          </a>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
        {/* About */}
        <section id="about" className="py-20 about-section">
          <h2 className="text-3xl font-bold mb-8">About Me</h2>
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="shrink-0 w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden shadow-lg border-4 border-indigo-500 transition-all duration-300 hover:scale-105">
              <img
                src="https://github.com/mukunda-jadhav/imgs/blob/main/img.jpg?raw=true"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-lg leading-relaxed max-w-3xl">
              I'm a motivated fresher with a passion for building user-centric web applications. Currently pursuing my B.Tech, I enjoy tackling complex problems, continuously learning new technologies, and contributing to meaningful projects. My goal is to apply my skills in <span className="font-semibold text-indigo-400">Python, HTML, CSS, C, and Java</span> to create efficient and impactful solutions.
            </p>
          </div>
        </section>

        {/* Education */}
        <section id="education" className="py-20">
          <h2 className="text-3xl font-bold mb-8">Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-105 ${darkMode ? 'border border-slate-700/50 bg-slate-800/50' : 'border border-slate-200 bg-white/50'}`}>
              <h3 className="text-xl font-semibold mb-2">B.Tech in Electronics & Telecommunication</h3>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Pursuing | A.G. Patil Institute of Technology, Solapur</p>
            </div>
            <div className={`p-6 rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-105 ${darkMode ? 'border border-slate-700/50 bg-slate-800/50' : 'border border-slate-200 bg-white/50'}`}>
              <h3 className="text-xl font-semibold mb-2">Diploma</h3>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>MSBTE University</p>
            </div>
            <div className={`p-6 rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-105 ${darkMode ? 'border border-slate-700/50 bg-slate-800/50' : 'border border-slate-200 bg-white/50'}`}>
              <h3 className="text-xl font-semibold mb-2">10th Grade</h3>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>2020 | 81% Score</p>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-20">
          <h2 className="text-3xl font-bold mb-8">Skills</h2>
          <div className="flex flex-wrap gap-4">
            {["Python", "HTML5", "CSS3", "JavaScript", "C", "Java", "React.js", "Tailwind CSS", "Problem Solving", "Git & GitHub", "Data Structures", "Web Development"].map(skill => (
              <span key={skill} className={`skill-badge ${darkMode ? 'bg-slate-700/50 text-indigo-400 border-slate-600' : 'bg-slate-200 text-indigo-800 border-slate-300'}`}>{skill}</span>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-20">
          <h2 className="text-3xl font-bold mb-8">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Portfolio Website", desc: "This personal portfolio site showcasing my education, skills, and projects. Built with React and styled with Tailwind CSS for a modern, responsive design." },
              { title: "Online Doctor Appointment System", desc: "A robust Java-based application with a MySQL backend, allowing users to efficiently book and manage doctor appointments online." },
              { title: "Tree Planting Booking System", desc: "A Java project with database connectivity, designed to manage requests and records for a tree planting initiative, ensuring seamless data tracking." }
            ].map(project => (
              <div key={project.title} className={`p-6 rounded-xl shadow-lg project-card transition-all duration-300 ${darkMode ? 'border border-slate-700/50 bg-slate-800/50' : 'border border-slate-200 bg-white/50'}`}>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{project.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20">
          <h2 className="text-3xl font-bold mb-8">Contact Me</h2>
          <form className="max-w-xl mx-auto space-y-6" onSubmit={(e) => {
            e.preventDefault();
            setMessageSent(true);
            e.target.reset(); // Reset the form fields
          }}>
            <input type="text" placeholder="Your Name" required className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'border-slate-700 bg-slate-800 text-white' : 'border-slate-300 bg-white text-slate-800'}`} />
            <input type="email" placeholder="Your Email" required className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'border-slate-700 bg-slate-800 text-white' : 'border-slate-300 bg-white text-slate-800'}`} />
            <textarea rows="5" placeholder="Your Message" required className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${darkMode ? 'border-slate-700 bg-slate-800 text-white' : 'border-slate-300 bg-white text-slate-800'}`} />
            <button type="submit" className="w-full px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors duration-300">
              Send Message
            </button>
          </form>

          {/* Message Sent Confirmation */}
          {messageSent && (
            <div className={`mt-8 text-center font-semibold p-4 rounded-lg bg-opacity-30 ${darkMode ? 'text-green-400 bg-green-900' : 'text-green-700 bg-green-200'}`}>
              ✅ Thank you! Your message has been sent.
            </div>
          )}

          <div className="flex justify-center space-x-6 mt-12">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={`text-3xl transition-colors duration-200 ${darkMode ? 'hover:text-indigo-400' : 'hover:text-indigo-600'}`}>
              {/* LinkedIn Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.763s.784-1.763 1.75-1.763 1.75.79 1.75 1.763-.783 1.763-1.75 1.763zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={`text-3xl transition-colors duration-200 ${darkMode ? 'hover:text-indigo-400' : 'hover:text-indigo-600'}`}>
              {/* GitHub Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.809 1.305 3.493.998.108-.77.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.465-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.771.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.197-6.091 8.197-11.387c0-6.627-5.373-12-12-12z" /></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={`text-3xl transition-colors duration-200 ${darkMode ? 'hover:text-indigo-400' : 'hover:text-indigo-600'}`}>
              {/* Instagram Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-3.251-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.646-.07-4.85s.012-3.584.07-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`py-8 text-center text-sm border-t ${darkMode ? 'border-slate-700/50' : 'border-slate-200'}`}>
        <p className="mb-2">📧 pranavjavalekar7@gmail.com | 📞 +91 8010126053 | 📍 Sangola, Solapur</p>
        <p className={`text-slate-400 ${darkMode ? '' : 'text-slate-500'}`}>© {new Date().getFullYear()} Pranav Javalekar | Built with <span className="text-red-500">❤</span> using React.js</p>
      </footer>

      {/* Scroll to Top Button */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-indigo-600 text-white shadow-lg transition-transform duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          {/* Arrow Up Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
        </button>
      )}
    </div>
  );
};

export default App;
