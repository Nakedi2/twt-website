import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import BlogPost from "@/models/BlogPost";
import Service from "@/models/Service";
import Testimonial from "@/models/Testimonial";
import TeamMember from "@/models/TeamMember";
import FAQ from "@/models/FAQ";
import bcrypt from "bcryptjs";

export async function GET() {
  return seed();
}

export async function POST() {
  return seed();
}

async function seed() {
  try {
    await connectToDatabase();

    await User.deleteMany({});
    await BlogPost.deleteMany({});
    await Service.deleteMany({});
    await Testimonial.deleteMany({});
    await TeamMember.deleteMany({});
    await FAQ.deleteMany({});

    const hash = await bcrypt.hash("Admin@123", 12);
    await User.create({ name: "TWT Admin", email: "thewalkingtextbooks@gmail.com", password: hash, role: "admin" });

    await FAQ.insertMany([
      { question: "What subjects do you tutor?", answer: "We offer expert tutoring in Mathematics, Physical Sciences, Life Sciences, and Geography.", category: "General", order: 1 },
      { question: "How does the Trading Academy work?", answer: "Structured courses from beginner to advanced with video lessons, live sessions, and mentorship.", category: "Trading", order: 2 },
      { question: "Do you offer online classes?", answer: "Yes! All tutoring and training can be done online via Zoom or Teams.", category: "General", order: 3 },
      { question: "What AI solutions do you provide?", answer: "Custom AI, chatbots, ML models, educational AI tools, and automation systems.", category: "AI", order: 4 },
      { question: "How much does tutoring cost?", answer: "Packages start from R250 per session. Monthly packages available at discounted rates.", category: "Billing", order: 5 },
      { question: "Can I cancel my subscription?", answer: "Yes, cancel anytime with 30 days notice. No lock-in contracts.", category: "Billing", order: 6 },
      { question: "What programming languages do you teach?", answer: "Python, JavaScript, TypeScript, MQL5, React, Next.js, and Node.js.", category: "Technology", order: 7 },
      { question: "Do you provide certificates?", answer: "Yes, all courses come with certificates of completion.", category: "General", order: 8 },
      { question: "How do I get started with trading?", answer: "Start with our Forex Basics course. Sign up on our website.", category: "Trading", order: 9 },
      { question: "Do you offer corporate training?", answer: "Yes, customised corporate training programmes available.", category: "General", order: 10 },
      { question: "What trading platforms do you support?", answer: "MetaTrader 5, TradingView, and custom platforms.", category: "Technology", order: 11 },
      { question: "How can I partner with TWT?", answer: "Email thewalkingtextbooks@gmail.com with your proposal.", category: "General", order: 12 },
    ]);

    await Service.insertMany([
      { title: "Academic Tutoring", slug: "academic-tutoring", description: "Expert tutoring in Mathematics, Physical Sciences, Life Sciences, and Geography.", icon: "BookOpen", features: ["Personalised learning", "Expert tutors", "Online and in-person", "Exam preparation"], subcategories: [{ name: "Mathematics", description: "Numbers, algebra, geometry" }, { name: "Physical Sciences", description: "Physics and chemistry" }, { name: "Life Sciences", description: "Biology and life" }, { name: "Geography", description: "Earth and environment" }], order: 1 },
      { title: "Trading Academy", slug: "trading-academy", description: "Master forex trading with comprehensive courses.", icon: "TrendingUp", features: ["Forex Basics", "Technical Analysis", "Risk Management", "Trading Psychology"], subcategories: [{ name: "Forex Basics", description: "Introduction to forex" }, { name: "Technical Analysis", description: "Chart patterns and indicators" }, { name: "Risk Management", description: "Protecting your capital" }, { name: "Psychology", description: "Trading mindset" }], order: 2 },
      { title: "Technology Solutions", slug: "technology-solutions", description: "MT5 Expert Advisors, AI Trading Systems, and automation.", icon: "Monitor", features: ["MT5 Expert Advisors", "AI Trading Systems", "Automation", "Python Solutions"], subcategories: [{ name: "MT5 Expert Advisors", description: "Automated trading on MetaTrader 5" }, { name: "AI Trading Systems", description: "AI-powered trading" }, { name: "Automation", description: "Workflow automation" }, { name: "Python Solutions", description: "Custom Python tools" }], order: 3 },
      { title: "AI Solutions", slug: "ai-solutions", description: "Custom AI, ML, Educational AI, and Chatbots.", icon: "Brain", features: ["Custom AI", "Machine Learning", "Educational AI", "Chatbots"], subcategories: [{ name: "Custom AI", description: "Tailored AI solutions" }, { name: "Machine Learning", description: "Predictive models" }, { name: "Educational AI", description: "AI for learning" }, { name: "Chatbots", description: "Intelligent assistants" }], order: 4 },
      { title: "Software Development", slug: "software-development", description: "Web Apps, Desktop Apps, and Automation Tools.", icon: "Code", features: ["Web Applications", "Desktop Applications", "Automation Tools"], subcategories: [{ name: "Web Applications", description: "Modern web apps" }, { name: "Desktop Applications", description: "Native desktop software" }, { name: "Automation Tools", description: "Scripting and automation" }], order: 5 },
    ]);

    await Testimonial.insertMany([
      { name: "Thabo Mokoena", role: "Student", company: "University of Johannesburg", content: "TWT changed how I approach Mathematics. Grades went from D to distinctions in six months.", rating: 5, featured: true },
      { name: "Sarah van der Merwe", role: "Forex Trader", company: "Independent", content: "The Trading Academy gave me the confidence and skills to start my own forex portfolio.", rating: 5, featured: true },
      { name: "Dr. James Naidoo", role: "Head of Department", company: "Durban Academy", content: "The AI tools TWT built for our school have been transformational. Student engagement is up.", rating: 5, featured: true },
      { name: "Lerato Phiri", role: "Grade 12 Student", company: "Pretoria High School", content: "Thanks to TWT, I went from failing Physical Sciences to a distinction in matric.", rating: 5, featured: false },
      { name: "Nomsa Dlamini", role: "Software Developer", company: "Tech Startup", content: "TWT built our company a custom AI chatbot. Excellent technology solutions.", rating: 5, featured: false },
      { name: "Pieter Joubert", role: "Business Owner", company: "Cape Town", content: "The mentorship programme helped me develop trading skills and business mindset.", rating: 4, featured: false },
    ]);

    await TeamMember.insertMany([
      { name: "Thabo Mokoena", role: "Founder & CEO", bio: "Visionary leader with a passion for education and technology.", avatar: "", social: { linkedin: "#", twitter: "#" } },
      { name: "Dr. Sarah Ndaba", role: "Chief Technology Officer", bio: "AI expert and software architect with a PhD in Computer Science.", avatar: "", social: { linkedin: "#", twitter: "#" } },
      { name: "James van der Merwe", role: "Head of Education", bio: "Experienced educator with over 15 years in South African education.", avatar: "", social: { linkedin: "#", twitter: "#" } },
      { name: "Priya Sharma", role: "Head of Technology", bio: "Full-stack developer and trading systems expert.", avatar: "", social: { linkedin: "#", twitter: "#" } },
    ]);

    await BlogPost.insertMany([
      { title: "How AI is Transforming Education in South Africa", slug: "ai-transforming-education-south-africa", excerpt: "AI is reshaping how students learn across South Africa.", content: "<p>Artificial Intelligence is transforming classrooms across South Africa. At TWT, we integrate AI-driven tools into education.</p><h3>Key Benefits</h3><ul><li>Personalised learning paths</li><li>Real-time assessment</li><li>24/7 AI chatbot availability</li></ul>", author: "TWT Team", category: "AI", tags: ["AI", "Education", "South Africa"], featured: true, image: "", published: true },
      { title: "Forex Trading: A Complete Beginner's Guide", slug: "forex-trading-beginners-guide", excerpt: "Everything you need to start your forex trading journey.", content: "<p>The forex market is the largest financial market with over $6 trillion traded daily.</p><h3>Getting Started</h3><ul><li>Learn currency pairs</li><li>Understand leverage</li><li>Develop a strategy</li></ul>", author: "TWT Team", category: "Trading", tags: ["Forex", "Trading", "Beginners"], featured: false, image: "", published: true },
      { title: "The Future of EdTech in South Africa", slug: "future-of-edtech-south-africa", excerpt: "Exploring the rapidly growing education technology landscape.", content: "<p>South Africa's EdTech sector is growing rapidly with increasing internet penetration and smartphone adoption.</p>", author: "TWT Team", category: "Education", tags: ["EdTech", "South Africa"], featured: false, image: "", published: true },
      { title: "Building Custom Trading Bots with Python", slug: "building-custom-trading-bots-python", excerpt: "Automate your trading strategies using Python and MT5.", content: "<p>Algorithmic trading is increasingly popular. Python enables building custom trading bots.</p>", author: "TWT Team", category: "Technology", tags: ["Python", "Trading Bots"], featured: false, image: "", published: true },
      { title: "5 Study Tips for Matric Success", slug: "5-study-tips-matric-success", excerpt: "Proven strategies for Grade 12 success.", content: "<ol><li>Create a study schedule</li><li>Practice past papers</li><li>Join a study group</li><li>Use technology</li><li>Take care of yourself</li></ol>", author: "TWT Team", category: "Education", tags: ["Matric", "Study Tips"], featured: false, image: "", published: true },
      { title: "Why Every Student Should Learn About AI", slug: "why-every-student-should-learn-about-ai", excerpt: "Understanding AI is no longer optional.", content: "<p>AI is transforming every industry. Understanding it opens new career opportunities.</p>", author: "TWT Team", category: "AI", tags: ["AI", "Students"], featured: false, image: "", published: true },
    ]);

    return NextResponse.json({ message: "Database seeded successfully!", counts: { users: 1, faqs: 12, services: 5, testimonials: 6, team: 4, posts: 6 } });
  } catch (error) {
    return NextResponse.json({ error: "Seed failed: " + (error as Error).message }, { status: 500 });
  }
}
