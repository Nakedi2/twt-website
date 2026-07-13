import connectToDatabase from "./mongodb";
import User from "../models/User";
import BlogPost from "../models/BlogPost";
import Service from "../models/Service";
import Testimonial from "../models/Testimonial";
import TeamMember from "../models/TeamMember";
import FAQ from "../models/FAQ";
import bcrypt from "bcryptjs";

const seedUsers = [
  {
    name: "TWT Admin",
    email: "admin@thewalkingtextbooks.co.za",
    password: "Admin@123",
    role: "admin" as const,
  },
];

const seedBlogPosts = [
  {
    title: "How AI is Transforming Education in South Africa",
    slug: "ai-transforming-education-south-africa",
    excerpt:
      "Artificial Intelligence is reshaping how students learn across South Africa. Discover how TWT is leveraging AI to make quality education accessible to all.",
    content: `<p>Artificial Intelligence is no longer a futuristic concept — it is actively transforming classrooms and learning environments across South Africa. At The Walking Textbooks, we are at the forefront of integrating AI-driven tools into education.</p>
<p>From personalised learning platforms that adapt to each student's pace, to intelligent tutoring systems that provide instant feedback, AI is making quality education more accessible than ever before.</p>
<h3>Key Benefits of AI in Education</h3>
<ul>
<li>Personalised learning paths for every student</li>
<li>Real-time assessment and feedback</li>
<li>Scalable tutoring solutions for underserved communities</li>
<li>Data-driven insights for educators</li>
</ul>
<p>Our AI Solutions service is designed to bring these benefits to schools, universities, and corporate training programmes across the continent.</p>`,
    author: "TWT Admin",
    category: "Education Technology",
    tags: ["AI", "education", "South Africa", "edtech"],
    featured: true,
    image: "/images/blog/ai-education.jpg",
    published: true,
  },
  {
    title: "Building Financial Literacy Through Trading Education",
    slug: "building-financial-literacy-trading-education",
    excerpt:
      "Financial literacy is a critical skill for the youth of South Africa. Learn how our Trading Academy is empowering the next generation of traders.",
    content: `<p>Financial literacy remains one of the most important yet underserved skills in South African education. At TWT, our Trading Academy bridges this gap with comprehensive trading education programmes.</p>
<p>Whether you are a complete beginner or an experienced trader looking to refine your strategies, our structured curriculum covers everything from market fundamentals to advanced technical analysis.</p>
<h3>What Our Trading Academy Covers</h3>
<ul>
<li>Forex, equities, and commodities trading</li>
<li>Risk management and portfolio diversification</li>
<li>Technical and fundamental analysis</li>
<li>Psychology of trading and emotional discipline</li>
</ul>
<p>By combining theoretical knowledge with hands-on practice, we prepare our students for real-world market participation.</p>`,
    author: "TWT Admin",
    category: "Trading Education",
    tags: ["trading", "financial literacy", "forex", "education"],
    featured: false,
    image: "/images/blog/trading-education.jpg",
    published: true,
  },
  {
    title: "The Role of Technology Solutions in Modern Businesses",
    slug: "role-technology-solutions-modern-businesses",
    excerpt:
      "From cloud infrastructure to custom software, discover how the right technology solutions can transform your business operations.",
    content: `<p>In today's fast-paced digital landscape, businesses that fail to adopt modern technology solutions risk falling behind. At TWT, we provide end-to-end technology solutions tailored to African businesses.</p>
<h3>Our Technology Solutions Include</h3>
<ul>
<li>Cloud infrastructure setup and migration</li>
<li>Network design and cybersecurity</li>
<li>IT consulting and digital strategy</li>
<li>Hardware procurement and support</li>
</ul>
<p>We understand the unique challenges faced by businesses operating in South Africa and across the continent, from connectivity issues to data sovereignty requirements.</p>
<p>Our team works closely with each client to design solutions that are not only technically sound but also practical and cost-effective.</p>`,
    author: "TWT Admin",
    category: "Technology",
    tags: ["technology", "business", "cloud", "cybersecurity"],
    featured: false,
    image: "/images/blog/tech-solutions.jpg",
    published: true,
  },
  {
    title: "Why Every Student Should Learn to Code in 2026",
    slug: "every-student-should-learn-to-code-2026",
    excerpt:
      "Coding is no longer optional — it is a fundamental skill. Here is why South African students should prioritise learning to program.",
    content: `<p>The demand for software developers and tech-skilled professionals continues to grow exponentially. In South Africa alone, the tech sector is one of the fastest-growing employers.</p>
<h3>Reasons to Learn Coding</h3>
<ul>
<li>High demand for developers in the job market</li>
<li>Critical thinking and problem-solving skills</li>
<li>Ability to create solutions for local challenges</li>
<li>Entrepreneurial opportunities in the digital economy</li>
</ul>
<p>At TWT, our Software Development service includes training programmes designed specifically for students and young professionals who want to break into the tech industry.</p>
<p>We teach modern frameworks, best practices, and real-world project experience that sets our graduates apart.</p>`,
    author: "TWT Admin",
    category: "Software Development",
    tags: ["coding", "software development", "students", "career"],
    featured: true,
    image: "/images/blog/learn-to-code.jpg",
    published: true,
  },
  {
    title: "Academic Tutoring: Bridging the Gap in South African Education",
    slug: "academic-tutoring-bridging-gap-south-africa",
    excerpt:
      "With overcrowded classrooms and limited resources, academic tutoring has never been more important. See how TWT is making a difference.",
    content: `<p>The South African education system faces significant challenges, from resource constraints to teacher shortages. Academic tutoring provides a vital supplement to classroom learning.</p>
<h3>Our Approach to Tutoring</h3>
<ul>
<li>Small group and one-on-one sessions</li>
<li>Subject specialists for mathematics, science, and languages</li>
<li>Both in-person and online tutoring options</li>
<li>Progress tracking and parent communication</li>
</ul>
<p>TWT's Academic Tutoring service has helped hundreds of students improve their grades and build confidence in their academic abilities.</p>
<p>We believe every learner deserves access to quality supplementary education, regardless of their socioeconomic background.</p>`,
    author: "TWT Admin",
    category: "Academic Tutoring",
    tags: ["tutoring", "education", "South Africa", "students"],
    featured: false,
    image: "/images/blog/academic-tutoring.jpg",
    published: true,
  },
  {
    title: "How Custom Software Development Drives Innovation in Africa",
    slug: "custom-software-development-innovation-africa",
    excerpt:
      "Off-the-shelf software often falls short. Learn why custom development is the key to solving Africa's unique challenges.",
    content: `<p>Africa's challenges require African solutions. Custom software development enables organisations to build tools specifically designed for their unique operational needs and local context.</p>
<h3>Benefits of Custom Software</h3>
<ul>
<li>Tailored to specific business processes</li>
<li>Scalable as the organisation grows</li>
<li>Better integration with existing systems</li>
<li>Competitive advantage through unique features</li>
</ul>
<p>At TWT, we have developed custom solutions for educational institutions, financial services, and non-profit organisations across the continent.</p>
<p>From student management systems to mobile applications for rural communities, our development team turns ideas into impactful digital products.</p>`,
    author: "TWT Admin",
    category: "Software Development",
    tags: ["software development", "innovation", "Africa", "custom solutions"],
    featured: false,
    image: "/images/blog/custom-software.jpg",
    published: true,
  },
];

const seedServices = [
  {
    title: "Academic Tutoring",
    slug: "academic-tutoring",
    description:
      "Personalised academic tutoring for learners from Grade 1 to university level. Our qualified tutors help students excel in mathematics, science, languages, and more.",
    icon: "GraduationCap",
    features: [
      "One-on-one and small group sessions",
      "Qualified subject specialists",
      "Online and in-person options",
      "Progress tracking and reports",
      "Exam preparation programmes",
    ],
    subcategories: [
      { name: "Mathematics Tutoring", description: "From basic numeracy to advanced calculus and statistics." },
      { name: "Science Tutoring", description: "Physical sciences, life sciences, and general science." },
      { name: "Language Tutoring", description: "English, Afrikaans, isiZulu, and other South African languages." },
      { name: "Exam Preparation", description: "Matric revision, university entrance exam prep, and study skills." },
    ],
    order: 1,
  },
  {
    title: "Trading Academy",
    slug: "trading-academy",
    description:
      "Comprehensive trading education covering forex, equities, commodities, and cryptocurrency. Learn from experienced traders and build your financial future.",
    icon: "TrendingUp",
    features: [
      "Forex and equities trading courses",
      "Technical and fundamental analysis",
      "Risk management strategies",
      "Live trading sessions",
      "Mentorship programme",
    ],
    subcategories: [
      { name: "Forex Trading", description: "Master the foreign exchange market with practical training." },
      { name: "Equities Trading", description: "Learn to trade JSE and international stocks." },
      { name: "Technical Analysis", description: "Chart patterns, indicators, and trading strategies." },
      { name: "Risk Management", description: "Capital preservation and portfolio management techniques." },
    ],
    order: 2,
  },
  {
    title: "Technology Solutions",
    slug: "technology-solutions",
    description:
      "End-to-end technology consulting and infrastructure solutions for businesses. From cloud migration to cybersecurity, we keep your operations running smoothly.",
    icon: "Server",
    features: [
      "Cloud infrastructure and migration",
      "Cybersecurity assessments",
      "IT consulting and strategy",
      "Network design and implementation",
      "Hardware procurement and support",
    ],
    subcategories: [
      { name: "Cloud Services", description: "AWS, Azure, and Google Cloud setup and management." },
      { name: "Cybersecurity", description: "Security audits, penetration testing, and compliance." },
      { name: "IT Infrastructure", description: "Network design, server management, and hardware solutions." },
      { name: "Digital Strategy", description: "Technology roadmaps and digital transformation consulting." },
    ],
    order: 3,
  },
  {
    title: "AI Solutions",
    slug: "ai-solutions",
    description:
      "Leverage the power of artificial intelligence to automate processes, gain insights, and create intelligent applications for your organisation.",
    icon: "Brain",
    features: [
      "Machine learning model development",
      "Natural language processing",
      "AI-powered analytics",
      "Chatbots and virtual assistants",
      "Predictive modelling",
    ],
    subcategories: [
      { name: "Machine Learning", description: "Custom ML models for prediction, classification, and automation." },
      { name: "NLP Solutions", description: "Text analysis, sentiment analysis, and language understanding." },
      { name: "AI Chatbots", description: "Intelligent conversational agents for customer service and support." },
      { name: "Data Analytics", description: "AI-driven insights from your business data." },
    ],
    order: 4,
  },
  {
    title: "Software Development",
    slug: "software-development",
    description:
      "Custom software development from concept to deployment. We build web applications, mobile apps, and enterprise systems tailored to your needs.",
    icon: "Code",
    features: [
      "Web application development",
      "Mobile app development (iOS and Android)",
      "API design and integration",
      "UI/UX design",
      "DevOps and deployment",
    ],
    subcategories: [
      { name: "Web Development", description: "Modern, responsive web applications using the latest frameworks." },
      { name: "Mobile Development", description: "Native and cross-platform mobile applications." },
      { name: "API Development", description: "RESTful and GraphQL APIs for system integration." },
      { name: "UI/UX Design", description: "User-centred design and prototyping." },
    ],
    order: 5,
  },
];

const seedTestimonials = [
  {
    name: "Thabo Mokoena",
    role: "Student",
    company: "University of Johannesburg",
    content:
      "TWT's academic tutoring programme helped me improve my mathematics mark from 45% to 82% in just six months. The tutors are incredibly patient and knowledgeable.",
    rating: 5,
    featured: true,
  },
  {
    name: "Sarah Nkosi",
    role: "Forex Trader",
    company: "Independent",
    content:
      "The Trading Academy gave me the confidence and skills to start trading full-time. The mentorship programme is worth every cent.",
    rating: 5,
    featured: true,
  },
  {
    name: "James van der Merwe",
    role: "IT Director",
    company: "AfriTech Solutions",
    content:
      "TWT's technology solutions transformed our infrastructure. Their cloud migration was seamless and our uptime has improved to 99.9%.",
    rating: 5,
    featured: true,
  },
  {
    name: "Nompumelelo Dlamini",
    role: "High School Teacher",
    company: "Soweto Secondary School",
    content:
      "The AI-powered learning tools TWT introduced in our school have made a remarkable difference in student engagement and performance.",
    rating: 4,
    featured: false,
  },
  {
    name: "David Pretorius",
    role: "Startup Founder",
    company: "EduTech Africa",
    content:
      "TWT built our student management system from scratch. Their team understood our vision and delivered a product that exceeded expectations.",
    rating: 5,
    featured: false,
  },
  {
    name: "Lerato Khumalo",
    role: "Parent",
    company: "",
    content:
      "My son's confidence in science has grown tremendously since joining TWT's tutoring programme. I highly recommend their services to any parent.",
    rating: 5,
    featured: false,
  },
];

const seedTeamMembers = [
  {
    name: "Thabo Nkosi",
    role: "CEO & Founder",
    bio: "Thabo is a visionary leader with over 15 years of experience in education and technology. He founded TWT with the mission of making quality education accessible to all South Africans.",
    avatar: "/images/team/thabo-nkosi.jpg",
    social: {
      linkedin: "https://linkedin.com/in/thabo-nkosi",
      twitter: "https://twitter.com/thabo_nkosi",
    },
  },
  {
    name: "Priya Patel",
    role: "Chief Technology Officer",
    bio: "Priya brings a wealth of experience in software engineering and AI. She leads TWT's technology initiatives and ensures the company stays at the cutting edge of innovation.",
    avatar: "/images/team/priya-patel.jpg",
    social: {
      linkedin: "https://linkedin.com/in/priya-patel",
      github: "https://github.com/priyapatel",
      twitter: "https://twitter.com/priya_tech",
    },
  },
  {
    name: "Sipho Mthembu",
    role: "Head of Education",
    bio: "Sipho is a passionate educator with a Master's degree in Education from Wits University. He designs TWT's curriculum and training programmes.",
    avatar: "/images/team/sipho-mthembu.jpg",
    social: {
      linkedin: "https://linkedin.com/in/sipho-mthembu",
    },
  },
  {
    name: "Aisha Jacobs",
    role: "Head of Technology",
    bio: "Aisha oversees TWT's technology solutions and software development teams. She has delivered projects for clients across banking, retail, and education sectors.",
    avatar: "/images/team/aisha-jacobs.jpg",
    social: {
      linkedin: "https://linkedin.com/in/aisha-jacobs",
      github: "https://github.com/aishajacobs",
    },
  },
];

const seedFAQs = [
  {
    question: "What age groups do you offer academic tutoring for?",
    answer:
      "We offer tutoring for learners from Grade 1 through to university level. Our programmes are tailored to each age group and academic level.",
    category: "Academic Tutoring",
    order: 1,
  },
  {
    question: "Do I need any prior trading experience to join the Trading Academy?",
    answer:
      "No prior experience is required. Our courses start from the basics and progressively cover more advanced topics. We welcome complete beginners.",
    category: "Trading Academy",
    order: 2,
  },
  {
    question: "What technology solutions does TWT provide?",
    answer:
      "We offer cloud infrastructure, cybersecurity, IT consulting, network design, and hardware procurement. All solutions are tailored to your business needs.",
    category: "Technology Solutions",
    order: 3,
  },
  {
    question: "How does your AI Solutions service work?",
    answer:
      "We start by understanding your business challenge, then design and develop custom AI solutions including chatbots, predictive models, and data analytics tools.",
    category: "AI Solutions",
    order: 4,
  },
  {
    question: "Can TWT build custom software for my business?",
    answer:
      "Absolutely. We specialise in custom web applications, mobile apps, and enterprise systems. We work closely with you from concept through to deployment and support.",
    category: "Software Development",
    order: 5,
  },
  {
    question: "Are your services available online?",
    answer:
      "Yes, most of our services including tutoring, trading courses, and AI solutions are available online. We also offer in-person options at our Johannesburg location.",
    category: "General",
    order: 6,
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept EFT, credit and debit cards, and SnapScan. Payment plans are available for larger programmes. Contact us for more details.",
    category: "General",
    order: 7,
  },
  {
    question: "How can I get started with TWT?",
    answer:
      "Simply visit our contact page, fill out the form, and a member of our team will reach out within 24 hours to discuss your needs and recommend the right programme.",
    category: "General",
    order: 8,
  },
];

export async function seedDatabase(): Promise<void> {
  await connectToDatabase();

  console.log("Seeding database...");

  await User.deleteMany({});
  await BlogPost.deleteMany({});
  await Service.deleteMany({});
  await Testimonial.deleteMany({});
  await TeamMember.deleteMany({});
  await FAQ.deleteMany({});

  for (const userData of seedUsers) {
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    await User.create({ ...userData, password: hashedPassword });
  }
  console.log(`Seeded ${seedUsers.length} users`);

  await BlogPost.insertMany(seedBlogPosts);
  console.log(`Seeded ${seedBlogPosts.length} blog posts`);

  await Service.insertMany(seedServices);
  console.log(`Seeded ${seedServices.length} services`);

  await Testimonial.insertMany(seedTestimonials);
  console.log(`Seeded ${seedTestimonials.length} testimonials`);

  await TeamMember.insertMany(seedTeamMembers);
  console.log(`Seeded ${seedTeamMembers.length} team members`);

  await FAQ.insertMany(seedFAQs);
  console.log(`Seeded ${seedFAQs.length} FAQs`);

  console.log("Database seeded successfully!");
}

if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Seed failed:", error);
      process.exit(1);
    });
}
