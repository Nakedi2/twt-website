import connectToDatabase from "./mongodb";
import User from "../models/User";
import BlogPost from "../models/BlogPost";
import Service from "../models/Service";
import Testimonial from "../models/Testimonial";
import TeamMember from "../models/TeamMember";
import FAQ from "../models/FAQ";
import Subscriber from "../models/Subscriber";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("Connecting to database...");
  await connectToDatabase();
  console.log("Connected. Seeding...");

  await User.deleteMany({});
  await BlogPost.deleteMany({});
  await Service.deleteMany({});
  await Testimonial.deleteMany({});
  await TeamMember.deleteMany({});
  await FAQ.deleteMany({});
  await Subscriber.deleteMany({});

  const hashedPassword = await bcrypt.hash("Admin@123", 12);
  await User.create({
    name: "TWT Admin",
    email: "thewalkingtextbooks@gmail.com",
    password: hashedPassword,
    role: "admin",
  });
  console.log("Seeded 1 user");

  await BlogPost.insertMany([
    {
      title: "How AI is Transforming Education in South Africa",
      slug: "ai-transforming-education-south-africa",
      excerpt: "Artificial Intelligence is reshaping how students learn across South Africa.",
      content: "<p>Artificial Intelligence is no longer a futuristic concept. It is actively transforming classrooms and learning environments across South Africa. At The Walking Textbooks, we are at the forefront of integrating AI-driven tools into education.</p><p>From personalised learning platforms that adapt to each student's pace, to intelligent tutoring systems that provide instant feedback, AI is making quality education more accessible than ever before.</p><h3>Key Benefits of AI in Education</h3><ul><li>Personalised learning paths for every student</li><li>Real-time assessment and feedback</li><li>24/7 availability through AI chatbots</li><li>Data-driven insights for educators</li></ul><p>As we continue to develop AI solutions for the South African education sector, we remain committed to ensuring that technology serves as a tool for empowerment, not a replacement for human connection.</p>",
      author: "TWT Team",
      category: "AI",
      tags: ["AI", "Education", "South Africa", "EdTech"],
      featured: true,
      image: "",
      published: true,
    },
    {
      title: "Forex Trading: A Complete Beginner's Guide",
      slug: "forex-trading-beginners-guide",
      excerpt: "Everything you need to know to start your forex trading journey with confidence.",
      content: "<p>The foreign exchange market is the largest financial market in the world, with over $6 trillion traded daily. If you are looking to start trading forex, this guide will help you understand the fundamentals.</p><h3>What is Forex Trading?</h3><p>Forex trading involves buying and selling currency pairs to profit from exchange rate fluctuations. Unlike the stock market, forex operates 24 hours a day, five days a week.</p><h3>Getting Started</h3><ul><li>Learn the basics of currency pairs</li><li>Understand leverage and margin</li><li>Develop a trading strategy</li><li>Practice with a demo account</li><li>Start with proper risk management</li></ul><p>At TWT Trading Academy, we provide structured courses that take you from complete beginner to confident trader.</p>",
      author: "TWT Team",
      category: "Trading",
      tags: ["Forex", "Trading", "Beginners", "Finance"],
      featured: false,
      image: "",
      published: true,
    },
    {
      title: "The Future of EdTech in South Africa",
      slug: "future-of-edtech-south-africa",
      excerpt: "Exploring the rapidly growing education technology landscape in South Africa.",
      content: "<p>South Africa's education technology sector is experiencing unprecedented growth. With increasing internet penetration and smartphone adoption, digital learning is becoming accessible to millions of students across the country.</p><h3>Current Trends</h3><ul><li>Mobile-first learning platforms</li><li>AI-powered tutoring systems</li><li>Offline-capable educational apps</li><li>Virtual classrooms and live streaming</li></ul><p>The Walking Textbooks is proud to be part of this revolution, building solutions that work for the unique challenges and opportunities of the South African education landscape.</p>",
      author: "TWT Team",
      category: "Education",
      tags: ["EdTech", "South Africa", "Innovation", "Future"],
      featured: false,
      image: "",
      published: true,
    },
    {
      title: "Building Custom Trading Bots with Python",
      slug: "building-custom-trading-bots-python",
      excerpt: "Learn how to automate your trading strategies using Python and MT5.",
      content: "<p>Algorithmic trading has become increasingly popular among retail traders. In this article, we explore how Python can be used to build custom trading bots that execute strategies automatically.</p><h3>Tools You Need</h3><ul><li>Python 3.x</li><li>MetaTrader 5 Python package</li><li>Pandas for data analysis</li><li>TA-Lib for technical indicators</li></ul><p>Our Technology Solutions team at TWT specialises in building custom Expert Advisors and trading bots for MT5.</p>",
      author: "TWT Team",
      category: "Technology",
      tags: ["Python", "Trading Bots", "MT5", "Automation"],
      featured: false,
      image: "",
      published: true,
    },
    {
      title: "5 Study Tips for Matric Success",
      slug: "5-study-tips-matric-success",
      excerpt: "Proven strategies to help Grade 12 students ace their final exams.",
      content: "<p>Matric is one of the most important years of a student's academic journey. Here are five proven study tips to help you succeed.</p><ol><li><strong>Create a study schedule</strong> - Plan your revision well in advance</li><li><strong>Practice past papers</strong> - Familiarise yourself with exam formats</li><li><strong>Join a study group</strong> - Learn from peers and teach each other</li><li><strong>Use technology</strong> - Leverage AI tools and online resources</li><li><strong>Take care of yourself</strong> - Sleep, exercise, and eat well</li></ol><p>At TWT, our tutors are available to help you through every step of your matric journey.</p>",
      author: "TWT Team",
      category: "Education",
      tags: ["Matric", "Study Tips", "Exams", "Grade 12"],
      featured: false,
      image: "",
      published: true,
    },
    {
      title: "Why Every Student Should Learn About AI",
      slug: "why-every-student-should-learn-about-ai",
      excerpt: "Understanding artificial intelligence is no longer optional - it is essential.",
      content: "<p>Artificial Intelligence is transforming every industry, and understanding it is becoming essential for students at all levels.</p><h3>Why AI Literacy Matters</h3><ul><li>AI is being used in healthcare, finance, education, and more</li><li>Understanding AI opens up new career opportunities</li><li>AI literacy helps students think critically about technology</li><li>Early exposure builds confidence with emerging technologies</li></ul><p>TWT offers AI workshops and courses designed specifically for students who want to understand and work with artificial intelligence.</p>",
      author: "TWT Team",
      category: "AI",
      tags: ["AI", "Students", "Future Skills", "Learning"],
      featured: false,
      image: "",
      published: true,
    },
  ]);
  console.log("Seeded 6 blog posts");

  await Service.insertMany([
    {
      title: "Academic Tutoring",
      slug: "academic-tutoring",
      description: "Expert tutoring in Mathematics, Physical Sciences, Life Sciences, and Geography for learners at every level.",
      icon: "BookOpen",
      features: ["Personalised learning plans", "Expert tutors", "Online and in-person", "Exam preparation", "Progress tracking"],
      subcategories: ["Mathematics", "Physical Sciences", "Life Sciences", "Geography"],
      order: 1,
    },
    {
      title: "Trading Academy",
      slug: "trading-academy",
      description: "Master forex trading with comprehensive courses from basics to advanced strategies that deliver real results.",
      icon: "TrendingUp",
      features: ["Forex Basics", "Technical Analysis", "Risk Management", "Trading Psychology", "Live Trading Sessions"],
      subcategories: ["Forex Basics", "Technical Analysis", "Risk Management", "Psychology"],
      order: 2,
    },
    {
      title: "Technology Solutions",
      slug: "technology-solutions",
      description: "MT5 Expert Advisors, AI Trading Systems, and automation solutions for the modern trader.",
      icon: "Monitor",
      features: ["MT5 Expert Advisors", "AI Trading Systems", "Automation Tools", "Python Solutions"],
      subcategories: ["MT5 Expert Advisors", "AI Trading Systems", "Automation", "Python Solutions"],
      order: 3,
    },
    {
      title: "AI Solutions",
      slug: "ai-solutions",
      description: "Custom AI, Machine Learning, Educational AI, and Intelligent Chatbots tailored to your needs.",
      icon: "Brain",
      features: ["Custom AI Development", "Machine Learning", "Educational AI", "Intelligent Chatbots"],
      subcategories: ["Custom AI", "Machine Learning", "Educational AI", "Chatbots"],
      order: 4,
    },
    {
      title: "Software Development",
      slug: "software-development",
      description: "Web Applications, Desktop Applications, and Automation Tools built with modern frameworks.",
      icon: "Code",
      features: ["Web Applications", "Desktop Applications", "Automation Tools", "API Development"],
      subcategories: ["Web Applications", "Desktop Applications", "Automation Tools"],
      order: 5,
    },
  ]);
  console.log("Seeded 5 services");

  await Testimonial.insertMany([
    {
      name: "Thabo Mokoena",
      role: "Student",
      company: "University of Johannesburg",
      content: "TWT completely changed how I approach Mathematics. The combination of expert tutoring and AI-powered practice sessions took my grades from a D to distinctions in just six months.",
      rating: 5,
      featured: true,
    },
    {
      name: "Sarah van der Merwe",
      role: "Forex Trader",
      company: "Independent",
      content: "The Trading Academy gave me the confidence and skills to start my own forex portfolio. The structured curriculum and mentorship are world-class.",
      rating: 5,
      featured: true,
    },
    {
      name: "Dr. James Naidoo",
      role: "Head of Department",
      company: "Durban Academy",
      content: "As a teacher, the AI tools TWT built for our school have been transformational. Student engagement is up and we can track progress in real time.",
      rating: 5,
      featured: true,
    },
    {
      name: "Lerato Phiri",
      role: "Grade 12 Student",
      company: "Pretoria High School",
      content: "Thanks to TWT tutoring, I went from failing Physical Sciences to getting a distinction in my matric finals. The tutors are incredible.",
      rating: 5,
      featured: false,
    },
    {
      name: "Nomsa Dlamini",
      role: "Software Developer",
      company: "Tech Startup",
      content: "TWT built our company a custom AI chatbot that handles customer queries 24/7. Their technology solutions are top-notch.",
      rating: 5,
      featured: false,
    },
    {
      name: "Pieter Joubert",
      role: "Business Owner",
      company: "Cape Town",
      content: "The mentorship programme at TWT helped me develop both my trading skills and business mindset. Highly recommend their services.",
      rating: 4,
      featured: false,
    },
  ]);
  console.log("Seeded 6 testimonials");

  await TeamMember.insertMany([
    {
      name: "Thabo Mokoena",
      role: "Founder & CEO",
      bio: "Visionary leader with a passion for education and technology. Thabo founded TWT with the mission of making quality education accessible to all Africans.",
      avatar: "",
      social: { linkedin: "#", twitter: "#" },
    },
    {
      name: "Dr. Sarah Ndaba",
      role: "Chief Technology Officer",
      bio: "AI expert and software architect with a PhD in Computer Science. Sarah leads TWT's technology innovation and AI development.",
      avatar: "",
      social: { linkedin: "#", twitter: "#" },
    },
    {
      name: "James van der Merwe",
      role: "Head of Education",
      bio: "Experienced educator and curriculum designer with over 15 years in South African education. James ensures our tutoring meets the highest standards.",
      avatar: "",
      social: { linkedin: "#", twitter: "#" },
    },
    {
      name: "Priya Sharma",
      role: "Head of Technology",
      bio: "Full-stack developer and trading systems expert. Priya leads the development of our technology solutions and trading platforms.",
      avatar: "",
      social: { linkedin: "#", twitter: "#" },
    },
  ]);
  console.log("Seeded 4 team members");

  await FAQ.insertMany([
    {
      question: "What subjects do you tutor?",
      answer: "We offer expert tutoring in Mathematics, Physical Sciences, Life Sciences, and Geography. Our tutors are qualified professionals.",
      category: "General",
      order: 1,
    },
    {
      question: "How does the Trading Academy work?",
      answer: "Our Trading Academy offers structured courses from beginner to advanced levels. You get access to video lessons, live trading sessions, and mentorship.",
      category: "Trading",
      order: 2,
    },
    {
      question: "Do you offer online classes?",
      answer: "Yes! All our tutoring and training can be done online via Zoom or Microsoft Teams. We also have recorded sessions available on demand.",
      category: "General",
      order: 3,
    },
    {
      question: "What AI solutions do you provide?",
      answer: "We build custom AI solutions including chatbots, machine learning models, educational AI tools, and automation systems tailored to your needs.",
      category: "AI",
      order: 4,
    },
    {
      question: "How much does tutoring cost?",
      answer: "Our tutoring packages start from R250 per session. We offer monthly packages at discounted rates. Contact us for a custom quote.",
      category: "Billing",
      order: 5,
    },
    {
      question: "Can I cancel my subscription?",
      answer: "Yes, you can cancel your subscription at any time with 30 days notice. There are no lock-in contracts.",
      category: "Billing",
      order: 6,
    },
    {
      question: "What programming languages do you teach?",
      answer: "We specialise in Python, JavaScript, TypeScript, and MQL5 for trading. Our software development team also works with React, Next.js, and Node.js.",
      category: "Technology",
      order: 7,
    },
    {
      question: "Do you provide certificates?",
      answer: "Yes, all our courses come with certificates of completion. Our Trading Academy provides internationally recognised certifications.",
      category: "General",
      order: 8,
    },
    {
      question: "How do I get started with trading?",
      answer: "Start with our Forex Basics course which covers everything you need to know. You can sign up on our website or contact us for more information.",
      category: "Trading",
      order: 9,
    },
    {
      question: "Do you offer corporate training?",
      answer: "Yes, we offer customised corporate training programmes for companies looking to upskill their teams in technology, AI, or trading.",
      category: "General",
      order: 10,
    },
    {
      question: "What trading platforms do you support?",
      answer: "We work with MetaTrader 5, TradingView, and custom-built platforms. Our technology solutions are compatible with most major trading platforms.",
      category: "Technology",
      order: 11,
    },
    {
      question: "How can I partner with TWT?",
      answer: "We are always open to partnerships. Email us at thewalkingtextbooks@gmail.com with your proposal and we will get back to you within 48 hours.",
      category: "General",
      order: 12,
    },
  ]);
  console.log("Seeded 12 FAQs");

  console.log("Database seeded successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
