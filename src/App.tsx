import React, { useState, useEffect, ReactElement } from 'react';
import './App.css'; // Assume appropriate CSS is defined here
// Type definitions
interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
}

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'other';
}

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
}

interface CursorPosition {
  x: number;
  y: number;
}

// Main App Component
const App: React.FC = (): ReactElement => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Sample data
  const skills: Skill[] = [
    { name: 'React', level: 90, category: 'frontend' },
    { name: 'TypeScript', level: 85, category: 'frontend' },
    { name: 'Node.js', level: 80, category: 'backend' },
    { name: 'Python', level: 75, category: 'backend' },
    { name: 'AWS', level: 70, category: 'tools' },
    { name: 'Three.js', level: 65, category: 'frontend' },
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: 'AI-Powered Analytics Dashboard',
      description: 'Real-time data visualization with machine learning insights',
      technologies: ['React', 'TypeScript', 'TensorFlow.js', 'D3.js'],
      githubUrl: '#',
      demoUrl: '#',
    },
    {
      id: 2,
      title: 'Blockchain Voting System',
      description: 'Secure decentralized voting platform using Ethereum smart contracts',
      technologies: ['Solidity', 'Web3.js', 'React', 'Node.js'],
      githubUrl: '#',
      demoUrl: '#',
    },
  ];

  const experiences: Experience[] = [
    {
      company: 'Tech Innovations Inc.',
      role: 'Senior Frontend Developer',
      period: '2021 - Present',
      description: [
        'Led development of next-generation web applications',
        'Implemented advanced React patterns and performance optimizations',
        'Mentored junior developers and established coding standards'
      ]
    },
    {
      company: 'Digital Solutions LLC',
      role: 'Full Stack Developer',
      period: '2018 - 2021',
      description: [
        'Developed full-stack applications using React and Node.js',
        'Designed and implemented RESTful APIs',
        'Collaborated with UX designers to create intuitive interfaces'
      ]
    },
  ];

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = (): void => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && 
            scrollPosition >= element.offsetTop && 
            scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mouse movement for cursor effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Simulate loading completion
    const timer = setTimeout(() => setIsLoading(false), 2000);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  // Render loading screen
  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-animation">
          <div className="orb"></div>
          <div className="pulse"></div>
          <p>Initializing Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Animated background elements */}
      <div className="background">
        <div className="grid-lines"></div>
        <div className="floating-particles">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              width: `${Math.random() * 10 + 2}px`,
              height: `${Math.random() * 10 + 2}px`,
            }}></div>
          ))}
        </div>
      </div>

      {/* Custom cursor */}
      <div 
        className="cursor" 
        style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}
      ></div>

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-brand">
          <span className="code-symbol">&lt;/&gt;</span>
          <span className="name">DEV_PORTFOLIO</span>
        </div>
        <ul className="nav-links">
          {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
            <li key={item}>
              <a 
                href={`#${item.toLowerCase()}`} 
                className={activeSection === item.toLowerCase() ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1>
            <span className="greeting">Hello, I'm</span>
            <span className="name-glitch" data-text="ALEXANDER_CREATE">ALEXANDER_CREATE</span>
            <span className="title">Full Stack Developer & AI Enthusiast</span>
          </h1>
          <p className="hero-description">
            Crafting the future through innovative code and cutting-edge technology solutions.
            Specializing in React, TypeScript, and cloud-native applications.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">View Projects</button>
            <button className="btn-outline">Contact Me</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="code-cube">
            <div className="face front">{`<Code creativity={true} />`}</div>
            <div className="face back">{`function innovate() { return future; }`}</div>
            <div className="face top">{`const portfolio = { awesome: true };`}</div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <h2>About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a passionate software developer with over 5 years of experience creating 
              digital solutions that push the boundaries of technology. My expertise spans 
              from frontend aesthetics to backend architecture, with a special interest in 
              AI integration and futuristic web experiences.
            </p>
            <p>
              When I'm not coding, I'm exploring emerging technologies, contributing to 
              open-source projects, or experimenting with generative art and creative coding.
            </p>
            <div className="stats">
              <div className="stat">
                <span className="number">50+</span>
                <span className="label">Projects Completed</span>
              </div>
              <div className="stat">
                <span className="number">5+</span>
                <span className="label">Years Experience</span>
              </div>
              <div className="stat">
                <span className="number">24</span>
                <span className="label">Technologies</span>
              </div>
            </div>
          </div>
          <div className="about-image">
            <div className="image-placeholder">
              <div className="scan-effect"></div>
              <span>Profile Image</span>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <h2>Technical Skills</h2>
        <div className="skills-container">
          {skills.map((skill) => (
            <div key={skill.name} className="skill-item">
              <div className="skill-header">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-percentage">{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <div 
                  className="skill-progress" 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <h2>Featured Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <h3>{project.title}</h3>
                <div className="project-links">
                  {project.githubUrl && <a href={project.githubUrl}>GitHub</a>}
                  {project.demoUrl && <a href={project.demoUrl}>Live Demo</a>}
                </div>
              </div>
              <p>{project.description}</p>
              <div className="technologies">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience">
        <h2>Professional Experience</h2>
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3>{exp.role}</h3>
                <h4>{exp.company} | {exp.period}</h4>
                <ul>
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <h2>Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <p>
              I'm currently available for freelance work and open to new opportunities.
              If you have a project that needs creative technical solutions, let's connect!
            </p>
            <div className="contact-details">
              <div className="contact-item">
                <span className="label">Email:</span>
                <span>contact@devportfolio.com</span>
              </div>
              <div className="contact-item">
                <span className="label">Location:</span>
                <span>San Francisco, CA</span>
              </div>
            </div>
            <div className="social-links">
              <a href="#">GitHub</a>
              <a href="#">LinkedIn</a>
              <a href="#">Twitter</a>
            </div>
          </div>
          <form className="contact-form">
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <textarea placeholder="Your Message" rows={5}></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Developer Portfolio. All rights reserved.</p>
        <p>Designed with ♥ and lots of code</p>
      </footer>
    </div>
  );
};

export default App;