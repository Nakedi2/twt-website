const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error("No MONGODB_URI set"); process.exit(1); }

async function seed() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected!");

  const db = mongoose.connection.db;

  // Clear existing data
  await db.collection('users').deleteMany({});
  await db.collection('blogposts').deleteMany({});
  await db.collection('services').deleteMany({});
  await db.collection('testimonials').deleteMany({});
  await db.collection('teammembers').deleteMany({});
  await db.collection('faqs').deleteMany({});
  console.log("Cleared existing data");

  // Seed user
  const bcrypt = require('bcryptjs');
  const hash = await bcrypt.hash('Admin@123', 12);
  await db.collection('users').insertOne({
    name: 'TWT Admin',
    email: 'thewalkingtextbooks@gmail.com',
    password: hash,
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  });
  console.log("Seeded 1 user");

  // Seed FAQs
  const faqs = [
    { question: "What subjects do you tutor?", answer: "We offer expert tutoring in Mathematics, Physical Sciences, Life Sciences, and Geography. Our tutors are qualified professionals with years of experience.", category: "General", order: 1, createdAt: new Date(), updatedAt: new Date() },
    { question: "How does the Trading Academy work?", answer: "Our Trading Academy offers structured courses from beginner to advanced levels with video lessons, live trading sessions, and mentorship.", category: "Trading", order: 2, createdAt: new Date(), updatedAt: new Date() },
    { question: "Do you offer online classes?", answer: "Yes! All our tutoring and training can be done online via Zoom or Microsoft Teams. We also have recorded sessions available on demand.", category: "General", order: 3, createdAt: new Date(), updatedAt: new Date() },
    { question: "What AI solutions do you provide?", answer: "We build custom AI solutions including chatbots, machine learning models, educational AI tools, and automation systems.", category: "AI", order: 4, createdAt: new Date(), updatedAt: new Date() },
    { question: "How much does tutoring cost?", answer: "Our tutoring packages start from R250 per session. We offer monthly packages at discounted rates. Contact us for a custom quote.", category: "Billing", order: 5, createdAt: new Date(), updatedAt: new Date() },
    { question: "Can I cancel my subscription?", answer: "Yes, you can cancel at any time with 30 days notice. There are no lock-in contracts.", category: "Billing", order: 6, createdAt: new Date(), updatedAt: new Date() },
    { question: "What programming languages do you teach?", answer: "We specialise in Python, JavaScript, TypeScript, and MQL5. Our development team works with React, Next.js, and Node.js.", category: "Technology", order: 7, createdAt: new Date(), updatedAt: new Date() },
    { question: "Do you provide certificates?", answer: "Yes, all our courses come with certificates of completion. Our Trading Academy provides internationally recognised certifications.", category: "General", order: 8, createdAt: new Date(), updatedAt: new Date() },
    { question: "How do I get started with trading?", answer: "Start with our Forex Basics course. Sign up on our website or contact us for more information.", category: "Trading", order: 9, createdAt: new Date(), updatedAt: new Date() },
    { question: "Do you offer corporate training?", answer: "Yes, we offer customised corporate training programmes for companies looking to upskill their teams.", category: "General", order: 10, createdAt: new Date(), updatedAt: new Date() },
    { question: "What trading platforms do you support?", answer: "We work with MetaTrader 5, TradingView, and custom-built platforms.", category: "Technology", order: 11, createdAt: new Date(), updatedAt: new Date() },
    { question: "How can I partner with TWT?", answer: "Email us at thewalkingtextbooks@gmail.com with your proposal and we will get back to you within 48 hours.", category: "General", order: 12, createdAt: new Date(), updatedAt: new Date() },
  ];
  await db.collection('faqs').insertMany(faqs);
  console.log("Seeded 12 FAQs");

  // Seed Services
  const services = [
    { title: "Academic Tutoring", slug: "academic-tutoring", description: "Expert tutoring in Mathematics, Physical Sciences, Life Sciences, and Geography.", icon: "BookOpen", features: ["Personalised learning plans", "Expert tutors", "Online and in-person", "Exam preparation"], subcategories: ["Mathematics", "Physical Sciences", "Life Sciences", "Geography"], order: 1, createdAt: new Date(), updatedAt: new Date() },
    { title: "Trading Academy", slug: "trading-academy", description: "Master forex trading with comprehensive courses from basics to advanced strategies.", icon: "TrendingUp", features: ["Forex Basics", "Technical Analysis", "Risk Management", "Trading Psychology"], subcategories: ["Forex Basics", "Technical Analysis", "Risk Management", "Psychology"], order: 2, createdAt: new Date(), updatedAt: new Date() },
    { title: "Technology Solutions", slug: "technology-solutions", description: "MT5 Expert Advisors, AI Trading Systems, and automation solutions.", icon: "Monitor", features: ["MT5 Expert Advisors", "AI Trading Systems", "Automation Tools", "Python Solutions"], subcategories: ["MT5 Expert Advisors", "AI Trading Systems", "Automation", "Python Solutions"], order: 3, createdAt: new Date(), updatedAt: new Date() },
    { title: "AI Solutions", slug: "ai-solutions", description: "Custom AI, Machine Learning, Educational AI, and Intelligent Chatbots.", icon: "Brain", features: ["Custom AI Development", "Machine Learning", "Educational AI", "Chatbots"], subcategories: ["Custom AI", "Machine Learning", "Educational AI", "Chatbots"], order: 4, createdAt: new Date(), updatedAt: new Date() },
    { title: "Software Development", slug: "software-development", description: "Web Applications, Desktop Applications, and Automation Tools.", icon: "Code", features: ["Web Applications", "Desktop Applications", "Automation Tools", "API Development"], subcategories: ["Web Applications", "Desktop Applications", "Automation Tools"], order: 5, createdAt: new Date(), updatedAt: new Date() },
  ];
  await db.collection('services').insertMany(services);
  console.log("Seeded 5 services");

  // Seed Testimonials
  const testimonials = [
    { name: "Thabo Mokoena", role: "Student", company: "University of Johannesburg", content: "TWT completely changed how I approach Mathematics. My grades went from a D to distinctions in just six months.", rating: 5, featured: true, createdAt: new Date(), updatedAt: new Date() },
    { name: "Sarah van der Merwe", role: "Forex Trader", company: "Independent", content: "The Trading Academy gave me the confidence and skills to start my own forex portfolio. World-class curriculum.", rating: 5, featured: true, createdAt: new Date(), updatedAt: new Date() },
    { name: "Dr. James Naidoo", role: "Head of Department", company: "Durban Academy", content: "The AI tools TWT built for our school have been transformational. Student engagement is up significantly.", rating: 5, featured: true, createdAt: new Date(), updatedAt: new Date() },
    { name: "Lerato Phiri", role: "Grade 12 Student", company: "Pretoria High School", content: "Thanks to TWT tutoring, I went from failing Physical Sciences to getting a distinction in my matric finals.", rating: 5, featured: false, createdAt: new Date(), updatedAt: new Date() },
    { name: "Nomsa Dlamini", role: "Software Developer", company: "Tech Startup", content: "TWT built our company a custom AI chatbot that handles customer queries 24/7. Excellent technology solutions.", rating: 5, featured: false, createdAt: new Date(), updatedAt: new Date() },
    { name: "Pieter Joubert", role: "Business Owner", company: "Cape Town", content: "The mentorship programme helped me develop both my trading skills and business mindset. Highly recommend.", rating: 4, featured: false, createdAt: new Date(), updatedAt: new Date() },
  ];
  await db.collection('testimonials').insertMany(testimonials);
  console.log("Seeded 6 testimonials");

  // Seed Team Members
  const team = [
    { name: "Thabo Mokoena", role: "Founder & CEO", bio: "Visionary leader with a passion for education and technology.", avatar: "", social: { linkedin: "#", twitter: "#" }, createdAt: new Date(), updatedAt: new Date() },
    { name: "Dr. Sarah Ndaba", role: "Chief Technology Officer", bio: "AI expert and software architect with a PhD in Computer Science.", avatar: "", social: { linkedin: "#", twitter: "#" }, createdAt: new Date(), updatedAt: new Date() },
    { name: "James van der Merwe", role: "Head of Education", bio: "Experienced educator and curriculum designer with over 15 years in education.", avatar: "", social: { linkedin: "#", twitter: "#" }, createdAt: new Date(), updatedAt: new Date() },
    { name: "Priya Sharma", role: "Head of Technology", bio: "Full-stack developer and trading systems expert.", avatar: "", social: { linkedin: "#", twitter: "#" }, createdAt: new Date(), updatedAt: new Date() },
  ];
  await db.collection('teammembers').insertMany(team);
  console.log("Seeded 4 team members");

  // Seed Blog Posts
  const posts = [
    { title: "How AI is Transforming Education in South Africa", slug: "ai-transforming-education-south-africa", excerpt: "AI is reshaping how students learn across South Africa.", content: "<p>Artificial Intelligence is transforming classrooms across South Africa. At TWT, we integrate AI-driven tools into education.</p><h3>Key Benefits</h3><ul><li>Personalised learning paths</li><li>Real-time assessment</li><li>24/7 AI chatbot availability</li></ul>", author: "TWT Team", category: "AI", tags: ["AI", "Education", "South Africa"], featured: true, image: "", published: true, createdAt: new Date(), updatedAt: new Date() },
    { title: "Forex Trading: A Complete Beginner's Guide", slug: "forex-trading-beginners-guide", excerpt: "Everything you need to know to start your forex trading journey.", content: "<p>The forex market is the largest financial market with over $6 trillion traded daily.</p><h3>Getting Started</h3><ul><li>Learn currency pairs</li><li>Understand leverage</li><li>Develop a strategy</li></ul>", author: "TWT Team", category: "Trading", tags: ["Forex", "Trading", "Beginners"], featured: false, image: "", published: true, createdAt: new Date(), updatedAt: new Date() },
    { title: "The Future of EdTech in South Africa", slug: "future-of-edtech-south-africa", excerpt: "Exploring the rapidly growing education technology landscape.", content: "<p>South Africa's EdTech sector is experiencing unprecedented growth with increasing internet penetration.</p>", author: "TWT Team", category: "Education", tags: ["EdTech", "South Africa", "Innovation"], featured: false, image: "", published: true, createdAt: new Date(), updatedAt: new Date() },
    { title: "Building Custom Trading Bots with Python", slug: "building-custom-trading-bots-python", excerpt: "Learn to automate your trading strategies using Python and MT5.", content: "<p>Algorithmic trading is increasingly popular. Python enables building custom trading bots.</p>", author: "TWT Team", category: "Technology", tags: ["Python", "Trading Bots", "MT5"], featured: false, image: "", published: true, createdAt: new Date(), updatedAt: new Date() },
    { title: "5 Study Tips for Matric Success", slug: "5-study-tips-matric-success", excerpt: "Proven strategies to help Grade 12 students ace their final exams.", content: "<ol><li>Create a study schedule</li><li>Practice past papers</li><li>Join a study group</li><li>Use technology</li><li>Take care of yourself</li></ol>", author: "TWT Team", category: "Education", tags: ["Matric", "Study Tips", "Exams"], featured: false, image: "", published: true, createdAt: new Date(), updatedAt: new Date() },
    { title: "Why Every Student Should Learn About AI", slug: "why-every-student-should-learn-about-ai", excerpt: "Understanding AI is no longer optional - it is essential.", content: "<p>AI is transforming every industry. Understanding it opens new career opportunities.</p>", author: "TWT Team", category: "AI", tags: ["AI", "Students", "Future Skills"], featured: false, image: "", published: true, createdAt: new Date(), updatedAt: new Date() },
  ];
  await db.collection('blogposts').insertMany(posts);
  console.log("Seeded 6 blog posts");

  console.log("ALL DONE! Database seeded successfully!");
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => { console.error("FAILED:", err); process.exit(1); });
