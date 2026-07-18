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
    title: "How AI is Transforming Education in Africa",
    slug: "how-ai-is-transforming-education-in-africa",
    excerpt:
      "Artificial intelligence is reshaping how students learn across the continent, from personalised tutoring systems to automated assessment platforms.",
    content: `<p class="text-lg text-slate-600 leading-relaxed mb-8">Across Africa, a quiet revolution is unfolding in classrooms, lecture halls, and online learning platforms. Artificial intelligence — once the domain of Silicon Valley labs — is now being deployed to solve some of the continent's most pressing educational challenges, from teacher shortages to unequal access to quality learning materials.</p>

<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">The Current State of Education in Africa</h2>
<p class="text-slate-600 leading-relaxed mb-4">Sub-Saharan Africa is home to the youngest population in the world, with over 60% of people under the age of 25. By 2030, an estimated 375 million young Africans will enter the workforce. Yet the education system is struggling to keep pace.</p>
<ul class="list-disc list-inside text-slate-600 leading-relaxed mb-6 space-y-2">
<li>Over 98 million children in sub-Saharan Africa lack access to basic education</li>
<li>The pupil-to-teacher ratio in many countries exceeds 40:1</li>
<li>Only 6% of students in low-income countries have internet access for learning</li>
<li>Textbook shortages remain a critical barrier in rural communities</li>
</ul>
<p class="text-slate-600 leading-relaxed mb-6">These are not just statistics — they represent a generation of learners whose potential is constrained by systemic limitations. AI offers a pathway to bridge these gaps at scale.</p>

<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">How AI is Being Applied</h2>
<p class="text-slate-600 leading-relaxed mb-4">From personalised tutoring chatbots to automated content translation, AI applications in African education are diverse and growing rapidly.</p>

<h3 class="text-xl font-semibold text-slate-900 mt-8 mb-3">Personalised Learning Platforms</h3>
<p class="text-slate-600 leading-relaxed mb-6">AI-powered adaptive learning systems can assess a student's current knowledge level and adjust the difficulty, pace, and content of lessons in real time. This means a Grade 10 learner in Soweto and a learner in rural Limpopo can each receive a learning experience tailored to their needs — something that was previously only available through expensive private tutoring.</p>

<div class="bg-indigo-50 border-l-4 border-indigo-600 rounded-r-xl p-6 my-8">
<p class="text-slate-700 font-medium">Key Insight: Studies show that AI-driven adaptive learning can improve student performance by up to 30% compared to traditional one-size-fits-all approaches, particularly in mathematics and science.</p>
</div>

<h3 class="text-xl font-semibold text-slate-900 mt-8 mb-3">Language and Accessibility</h3>
<p class="text-slate-600 leading-relaxed mb-6">Africa is home to over 2,000 languages. AI-powered translation and natural language processing tools are making educational content accessible in local languages for the first time. Projects like Google's AI-powered translation for African languages and locally developed solutions are breaking down language barriers that have long excluded millions of learners from quality education.</p>

<h3 class="text-xl font-semibold text-slate-900 mt-8 mb-3">Automated Assessment and Feedback</h3>
<p class="text-slate-600 leading-relaxed mb-6">One of the most time-consuming tasks for teachers is grading and providing feedback. AI systems can now automatically assess written responses, provide instant feedback on mathematics problems, and even evaluate coding assignments. This frees up teachers to focus on what they do best — inspiring and mentoring students.</p>

<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">The Numbers That Matter</h2>
<p class="text-slate-600 leading-relaxed mb-4">The impact of AI in African education is becoming measurable:</p>
<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
<div class="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white text-center">
<p class="text-3xl font-bold mb-1">30%</p>
<p class="text-sm text-white/80">Improvement in learning outcomes with adaptive platforms</p>
</div>
<div class="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white text-center">
<p class="text-3xl font-bold mb-1">200+</p>
<p class="text-sm text-white/80">EdTech startups operating across the continent</p>
</div>
<div class="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white text-center">
<p class="text-3xl font-bold mb-1">$1B+</p>
<p class="text-sm text-white/80">Projected EdTech market value in Africa by 2027</p>
</div>
</div>

<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Challenges and Considerations</h2>
<p class="text-slate-600 leading-relaxed mb-4">Despite the promise, significant challenges remain. Data infrastructure across much of the continent is still developing, which limits the deployment of cloud-based AI solutions. There are also important questions about data privacy, algorithmic bias, and ensuring that AI tools are developed with — not just for — African communities.</p>
<p class="text-slate-600 leading-relaxed mb-6">Furthermore, the digital divide means that the learners who could benefit most from AI-powered tools are often those with the least access to the devices and connectivity required to use them. Addressing this requires coordinated effort between governments, the private sector, and civil society.</p>

<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">What This Means for the Future</h2>
<p class="text-slate-600 leading-relaxed mb-6">The integration of AI into African education is not a question of if, but when and how. At The Walking Textbooks, we believe that the most impactful technology is that which is designed with local context in mind. Our approach combines cutting-edge AI research with a deep understanding of the South African education landscape to create solutions that are both innovative and practical.</p>
<p class="text-slate-600 leading-relaxed mb-6">As we look ahead, the organisations and educators who embrace AI thoughtfully — as a tool to augment human teaching, not replace it — will be best positioned to prepare students for a rapidly evolving world.</p>

<div class="bg-slate-50 rounded-2xl p-8 my-8 border border-slate-100">
<h3 class="text-lg font-bold text-slate-900 mb-2">In Summary</h3>
<p class="text-slate-600 leading-relaxed">AI is not a silver bullet for Africa's educational challenges, but it is a powerful lever. By personalising learning, breaking language barriers, and reducing administrative burden on teachers, AI can help unlock the continent's greatest asset: its young people. The Walking Textbooks is committed to being at the forefront of this transformation.</p>
</div>`,
    author: "Thabo Mokoena",
    category: "AI",
    tags: ["AI", "Education", "Africa", "EdTech"],
    featured: true,
    published: true,
  },
  {
    title: "Forex Trading: A Beginner's Complete Guide",
    slug: "forex-trading-a-beginners-complete-guide",
    excerpt:
      "Everything you need to know before placing your first trade, including risk management, chart reading, and building a sustainable strategy.",
    content: `<p class="text-lg text-slate-600 leading-relaxed mb-8">The foreign exchange market is the largest and most liquid financial market in the world, with a daily trading volume exceeding $7.5 trillion. For beginners in South Africa and across the globe, forex trading presents both tremendous opportunity and significant risk. This guide will walk you through everything you need to know before placing your first trade.</p>

<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">What Is Forex Trading?</h2>
<p class="text-slate-600 leading-relaxed mb-6">Forex trading is the act of buying one currency while simultaneously selling another. Currencies are traded in pairs — for example, USD/ZAR (US Dollar to South African Rand) or EUR/USD (Euro to US Dollar). The goal is to profit from changes in the exchange rate between the two currencies.</p>
<p class="text-slate-600 leading-relaxed mb-6">Unlike the stock market, forex operates 24 hours a day, five days a week, across major financial centres including London, New York, Tokyo, and Sydney. This makes it accessible to traders in virtually any time zone.</p>

<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Understanding Currency Pairs</h2>
<p class="text-slate-600 leading-relaxed mb-4">Currency pairs are divided into three categories:</p>
<ul class="list-disc list-inside text-slate-600 leading-relaxed mb-6 space-y-2">
<li><strong>Major Pairs</strong> — Include the US Dollar (e.g., EUR/USD, GBP/USD, USD/JPY). These are the most traded pairs with the tightest spreads.</li>
<li><strong>Minor Pairs</strong> — Do not include the US Dollar but involve major currencies (e.g., EUR/GBP, AUD/NZD).</li>
<li><strong>Exotic Pairs</strong> — Include a major currency paired with a currency from an emerging economy (e.g., USD/ZAR, EUR/TRY). These tend to have wider spreads and higher volatility.</li>
</ul>

<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Key Concepts Every Beginner Must Know</h2>

<h3 class="text-xl font-semibold text-slate-900 mt-8 mb-3">Pips and Lots</h3>
<p class="text-slate-600 leading-relaxed mb-6">A <strong>pip</strong> (Percentage in Point) is the smallest standard unit of price movement in a currency pair — typically the fourth decimal place. For example, if EUR/USD moves from 1.1050 to 1.1055, that is a 5-pip movement. A <strong>lot</strong> is the standard unit of measurement for trade size. One standard lot equals 100,000 units of the base currency. Mini lots (10,000 units) and micro lots (1,000 units) are also available, making the market accessible to traders with smaller accounts.</p>

<h3 class="text-xl font-semibold text-slate-900 mt-8 mb-3">Bid and Ask Price</h3>
<p class="text-slate-600 leading-relaxed mb-6">The <strong>bid</strong> is the price at which you can sell a currency pair, while the <strong>ask</strong> is the price at which you can buy it. The difference between the two is called the <strong>spread</strong>, and it represents the broker's commission. Lower spreads mean lower trading costs.</p>

<h3 class="text-xl font-semibold text-slate-900 mt-8 mb-3">Leverage</h3>
<p class="text-slate-600 leading-relaxed mb-6">Leverage allows you to control a larger position with a smaller amount of capital. For example, with 1:100 leverage, you can control $100,000 with just $1,000. While leverage amplifies potential profits, it equally amplifies potential losses. Understanding and managing leverage is perhaps the most critical skill in forex trading.</p>

<div class="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-6 my-8">
<p class="text-slate-700 font-medium">Warning: High leverage is the number one reason new traders blow their accounts. Always use leverage conservatively and never risk more than you can afford to lose.</p>
</div>

<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Risk Management: The Foundation of Success</h2>
<p class="text-slate-600 leading-relaxed mb-4">Professional traders will tell you that risk management matters more than any trading strategy. Here are the core principles:</p>
<ul class="list-disc list-inside text-slate-600 leading-relaxed mb-6 space-y-2">
<li><strong>The 1% Rule</strong> — Never risk more than 1% of your trading account on a single trade.</li>
<li><strong>Stop Losses</strong> — Always set a stop loss before entering a trade. This is your exit plan if the market moves against you.</li>
<li><strong>Risk-to-Reward Ratio</strong> — Aim for trades where the potential reward is at least twice the potential risk (1:2 ratio or better).</li>
<li><strong>Position Sizing</strong> — Calculate your position size based on your stop loss distance and the 1% rule, not on emotion.</li>
</ul>

<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Getting Started</h2>
<p class="text-slate-600 leading-relaxed mb-6">The path to becoming a successful forex trader begins with education, not with live trading. At TWT's Trading Academy, we provide structured courses that take you from complete beginner to confident, independent trader. Our curriculum covers everything from basic concepts to advanced technical analysis and trading psychology.</p>

<div class="bg-slate-50 rounded-2xl p-8 my-8 border border-slate-100">
<h3 class="text-lg font-bold text-slate-900 mb-2">Ready to Start Your Trading Journey?</h3>
<p class="text-slate-600 leading-relaxed">Visit our <a href="/services/trading-academy" class="text-indigo-600 font-medium hover:text-indigo-700">Trading Academy page</a> to learn more about our comprehensive courses designed for South African traders at every level.</p>
</div>`,
    author: "Lebo Nkosi",
    category: "Trading",
    tags: ["Forex", "Trading", "Beginner", "Finance"],
    featured: false,
    published: true,
  },
  {
    title: "The Future of EdTech in South Africa",
    slug: "the-future-of-edtech-in-south-africa",
    excerpt:
      "From township classrooms to university lecture halls, technology is bridging gaps and creating new opportunities for learners nationwide.",
    content: `<p class="text-lg text-slate-600 leading-relaxed mb-8">South Africa's education system stands at a crossroads. With over 13 million learners in more than 25,000 schools, the challenges of inequality, resource shortages, and infrastructure gaps are immense. Yet technology is emerging as a powerful equaliser — and the EdTech revolution in South Africa is only just beginning.</p>

<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">The Landscape Today</h2>
<p class="text-slate-600 leading-relaxed mb-4">South Africa's EdTech ecosystem has grown rapidly in recent years. The COVID-19 pandemic accelerated digital adoption across all levels of education, forcing schools, universities, and training providers to embrace online and hybrid learning models almost overnight.</p>
<p class="text-slate-600 leading-relaxed mb-6">Today, the South African EdTech market includes a diverse range of solutions — from learning management systems and digital content platforms to AI-powered tutoring tools and assessment technologies. However, adoption remains uneven, with urban, well-resourced schools far ahead of their rural counterparts.</p>

<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Key Trends Shaping the Future</h2>

<h3 class="text-xl font-semibold text-slate-900 mt-8 mb-3">1. Offline-First Design</h3>
<p class="text-slate-600 leading-relaxed mb-6">Connectivity remains a major barrier in rural South Africa. The most impactful EdTech solutions are those designed with offline-first architectures — allowing students to download content when connected and access it anytime, without requiring a constant internet connection. At TWT, this principle is at the core of our platform design.</p>

<h3 class="text-xl font-semibold text-slate-900 mt-8 mb-3">2. Multilingual Content Delivery</h3>
<p class="text-slate-600 leading-relaxed mb-6">South Africa has 11 official languages, and research consistently shows that students learn best in their home language. AI-powered translation and localisation tools are making it possible to deliver curriculum-aligned content in isiZulu, Sesotho, Afrikaans, and other languages at scale.</p>

<h3 class="text-xl font-semibold text-slate-900 mt-8 mb-3">3. Data-Driven Decision Making</h3>
<p class="text-slate-600 leading-relaxed mb-6">Learning analytics and AI-powered assessment tools are enabling educators to track student progress in real time, identify learning gaps early, and intervene before students fall behind. This data-driven approach is transforming how teachers plan lessons and how schools allocate resources.</p>

<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Impact by the Numbers</h2>
<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
<div class="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-6 text-white text-center">
<p class="text-3xl font-bold mb-1">40%</p>
<p class="text-sm text-white/80">Improvement in pass rates at schools using TWT's platform</p>
</div>
<div class="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-6 text-white text-center">
<p class="text-3xl font-bold mb-1">500+</p>
<p class="text-sm text-white/80">Schools connected through EdTech initiatives since 2023</p>
</div>
<div class="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-6 text-white text-center">
<p class="text-3xl font-bold mb-1">R2.1B</p>
<p class="text-sm text-white/80">Projected SA EdTech market value by 2028</p>
</div>
</div>

<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Challenges to Overcome</h2>
<p class="text-slate-600 leading-relaxed mb-4">Despite the progress, several challenges persist:</p>
<ul class="list-disc list-inside text-slate-600 leading-relaxed mb-6 space-y-2">
<li><strong>Digital divide</strong> — Many rural schools still lack basic computer labs and reliable internet</li>
<li><strong>Teacher training</strong> — Educators need ongoing professional development to effectively use technology in their classrooms</li>
<li><strong>Sustainability</strong> — Funding models for EdTech in under-resourced schools need innovative approaches</li>
<li><strong>Data privacy</strong> — Protecting student data while leveraging it for improved learning outcomes</li>
</ul>

<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">The Road Ahead</h2>
<p class="text-slate-600 leading-relaxed mb-6">The future of EdTech in South Africa is bright, but it requires collaboration between government, the private sector, educators, and communities. At The Walking Textbooks, we are committed to being a key player in this transformation — building technology that is designed for South African realities, not imported from elsewhere.</p>

<div class="bg-slate-50 rounded-2xl p-8 my-8 border border-slate-100">
<h3 class="text-lg font-bold text-slate-900 mb-2">Join the Movement</h3>
<p class="text-slate-600 leading-relaxed">Whether you are an educator, school administrator, or parent, we invite you to be part of South Africa's EdTech revolution. <a href="/contact" class="text-indigo-600 font-medium hover:text-indigo-700">Get in touch</a> to learn how TWT can support your learning community.</p>
</div>`,
    author: "Sipho Dlamini",
    category: "Education",
    tags: ["EdTech", "South Africa", "Education", "Innovation"],
    featured: false,
    published: true,
  },
  {
    title: "Building Custom Trading Bots with Python",
    slug: "building-custom-trading-bots-with-python",
    excerpt:
      "A hands-on walkthrough of creating algorithmic trading systems using Python, Pandas, and popular broker APIs.",
    content: `<p class="text-lg text-slate-600 leading-relaxed mb-8">Algorithmic trading has revolutionised financial markets. What was once the exclusive domain of hedge funds and institutional traders is now accessible to individual traders with programming skills. In this guide, we will walk through building a custom trading bot using Python — the most popular language for quantitative finance.</p>

<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Why Python for Trading Bots?</h2>
<p class="text-slate-600 leading-relaxed mb-6">Python has become the language of choice for algorithmic traders for several compelling reasons:</p>
<ul class="list-disc list-inside text-slate-600 leading-relaxed mb-6 space-y-2">
<li><strong>Rich ecosystem</strong> — Libraries like Pandas, NumPy, and TA-Lib provide powerful data analysis and technical indicator capabilities</li>
<li><strong>Broker API integration</strong> — Most brokers offer Python SDKs or REST APIs for market data and order execution</li>
<li><strong>Community support</strong> — A massive community of quant developers means abundant resources, tutorials, and open-source projects</li>
<li><strong>Rapid prototyping</strong> — Python's simplicity allows you to go from idea to backtest in hours, not weeks</li>
</ul>

<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Architecture of a Trading Bot</h2>
<p class="text-slate-600 leading-relaxed mb-4">A well-designed trading bot consists of several key components:</p>

<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
<div class="bg-indigo-50 rounded-xl p-5">
<h4 class="font-semibold text-slate-900 mb-2">Data Module</h4>
<p class="text-sm text-slate-600">Fetches real-time or historical market data from broker APIs or data providers.</p>
</div>
<div class="bg-purple-50 rounded-xl p-5">
<h4 class="font-semibold text-slate-900 mb-2">Strategy Module</h4>
<p class="text-sm text-slate-600">Implements trading logic using technical indicators, price action, or machine learning models.</p>
</div>
<div class="bg-blue-50 rounded-xl p-5">
<h4 class="font-semibold text-slate-900 mb-2">Risk Management</h4>
<p class="text-sm text-slate-600">Controls position sizing, stop losses, and maximum drawdown limits.</p>
</div>
<div class="bg-cyan-50 rounded-xl p-5">
<h4 class="font-semibold text-slate-900 mb-2">Execution Module</h4>
<p class="text-sm text-slate-600">Handles order placement, modification, and cancellation through the broker API.</p>
</div>
</div>

<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">A Simple Moving Average Crossover Strategy</h2>
<p class="text-slate-600 leading-relaxed mb-4">Let us build a basic strategy — the Moving Average Crossover:</p>
<p class="text-slate-600 leading-relaxed mb-4"><strong>Rule:</strong> Buy when the 20-period EMA crosses above the 50-period EMA. Sell when the 20-period EMA crosses below the 50-period EMA.</p>

<div class="bg-slate-900 rounded-xl p-6 my-8 overflow-x-auto">
<pre class="text-sm text-green-400 font-mono"><code>import pandas as pd
import yfinance as yf

# Fetch data
data = yf.download("USDZAR=X", period="6mo", interval="1h")

# Calculate EMAs
data["EMA20"] = data["Close"].ewm(span=20).mean()
data["EMA50"] = data["Close"].ewm(span=50).mean()

# Generate signals
data["Signal"] = 0
data.loc[data["EMA20"] > data["EMA50"], "Signal"] = 1
data.loc[data["EMA20"] < data["EMA50"], "Signal"] = -1

# Calculate returns
data["Strategy_Returns"] = data["Signal"].shift(1) * data["Close"].pct_change()</code></pre>
</div>

<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Backtesting Your Strategy</h2>
<p class="text-slate-600 leading-relaxed mb-6">Before risking real money, always backtest your strategy on historical data. Backtesting tells you how your strategy would have performed in the past, helping you identify its strengths and weaknesses. Key metrics to evaluate include total return, maximum drawdown, Sharpe ratio, and win rate.</p>

<div class="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-6 my-8">
<p class="text-slate-700 font-medium">Important: Past performance does not guarantee future results. Backtesting is a tool for validation, not a crystal curve. Always combine backtesting with forward testing on a demo account.</p>
</div>

<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Next Steps</h2>
<p class="text-slate-600 leading-relaxed mb-6">Building a profitable trading bot is a journey, not a destination. Start simple, backtest rigorously, paper trade extensively, and only then consider live trading with small position sizes. At TWT's Technology Solutions and Trading Academy, we teach traders how to build and deploy automated trading systems that are both profitable and sustainable.</p>`,
    author: "Kagiso Tshepe",
    category: "Technology",
    tags: ["Python", "Trading Bots", "Algo Trading", "Programming"],
    featured: false,
    published: true,
  },
  {
    title: "5 Study Tips for Matric Success",
    slug: "5-study-tips-for-matric-success",
    excerpt:
      "Proven strategies that helped thousands of South African matriculants ace their finals and secure university placements.",
    content: `<p class="text-lg text-slate-600 leading-relaxed mb-8">Matric is one of the most important milestones in a South African student's life. The National Senior Certificate (NSC) exams determine not only your final school results but also your eligibility for university admission, bursaries, and career opportunities. Here are five proven study strategies that have helped thousands of TWT students achieve their best results.</p>

<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">1. Start Early and Create a Study Timetable</h2>
<p class="text-slate-600 leading-relaxed mb-6">The biggest mistake matriculants make is leaving revision until the last minute. Start reviewing Grade 12 content from the beginning of the year, and ideally, begin revising Grade 11 material during the June holidays. Create a realistic study timetable that covers all your subjects, allocates more time to weaker areas, and includes regular breaks. A well-structured timetable reduces anxiety and ensures you cover everything before exam day.</p>

<div class="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-6 my-8">
<p class="text-slate-700 font-medium">Pro Tip: Use the Pomodoro Technique — study for 25 minutes, then take a 5-minute break. After four cycles, take a longer 15-20 minute break. This keeps your brain fresh and improves retention.</p>
</div>

<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">2. Practise Past Papers — The Single Most Effective Strategy</h2>
<p class="text-slate-600 leading-relaxed mb-6">Past exam papers are the most valuable study resource available. They reveal the exam format, common question types, marking schemes, and the level of detail expected in answers. Complete as many past papers as possible under timed conditions to build exam stamina and improve your time management skills.</p>
<p class="text-slate-600 leading-relaxed mb-6">At TWT, we provide curated past paper collections with detailed memos and step-by-step solutions for Mathematics, Physical Sciences, Life Sciences, and Geography.</p>

<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">3. Focus on Understanding, Not Memorising</h2>
<p class="text-slate-600 leading-relaxed mb-6">While some subjects require memorisation (like definitions in Life Sciences or Geography), true understanding is what separates distinction students from those who merely pass. When studying, always ask yourself <em>why</em> something works, not just <em>what</em> it is. For Mathematics and Sciences, practise working through problems rather than just reading solutions.</p>
<p class="text-slate-600 leading-relaxed mb-6">Teaching a concept to someone else — even a sibling or a friend — is one of the most powerful ways to test your understanding. If you can explain it clearly, you truly know it.</p>

<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">4. Take Care of Your Mental and Physical Health</h2>
<p class="text-slate-600 leading-relaxed mb-6">Exam stress is real, and it can significantly affect your performance if not managed properly. Make sure you are:</p>
<ul class="list-disc list-inside text-slate-600 leading-relaxed mb-6 space-y-2">
<li><strong>Sleeping 7-8 hours</strong> — Sleep is when your brain consolidates memories and learning</li>
<li><strong>Exercising regularly</strong> — Even a 30-minute walk improves focus and reduces anxiety</li>
<li><strong>Eating well</strong> — Brain foods like nuts, fish, eggs, and fruits support cognitive function</li>
<li><strong>Taking breaks</strong> — Burnout is real; schedule time for hobbies and socialising</li>
</ul>

<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">5. Get Help When You Need It</h2>
<p class="text-slate-600 leading-relaxed mb-6">There is no shame in asking for help. Whether it is a teacher, a tutor, or an online resource — getting clarification on concepts you struggle with is always better than avoiding them. TWT's Academic Tutoring service provides personalised support for exactly this purpose. Our tutors understand the NSC curriculum inside out and can help you develop targeted strategies for each subject.</p>

<div class="bg-slate-50 rounded-2xl p-8 my-8 border border-slate-100">
<h3 class="text-lg font-bold text-slate-900 mb-2">You've Got This</h3>
<p class="text-slate-600 leading-relaxed">Matric is challenging, but with the right preparation and support, you can achieve results you are proud of. Start early, stay consistent, and remember — every expert was once a beginner. <a href="/services/tutoring" class="text-indigo-600 font-medium hover:text-indigo-700">Explore our tutoring programmes</a> to get the support you need.</p>
</div>`,
    author: "Naledi Molefe",
    category: "Education",
    tags: ["Matric", "Study Tips", "Exams", "Success"],
    featured: false,
    published: true,
  },
  {
    title: "Why Every Student Should Learn About AI",
    slug: "why-every-student-should-learn-about-ai",
    excerpt:
      "AI literacy is no longer optional. Here is why understanding artificial intelligence is critical for every career path in the 21st century.",
    content: `<p class="text-lg text-slate-600 leading-relaxed mb-8">Artificial intelligence is no longer a niche technology reserved for computer scientists and tech companies. It is reshaping every industry — from healthcare and finance to agriculture and education. For students in South Africa and around the world, understanding AI is no longer optional; it is essential.</p>

<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">AI Is Everywhere</h2>
<p class="text-slate-600 leading-relaxed mb-6">Every time you use Netflix's recommendation engine, ask Google a question, or use a language translation app, you are interacting with AI. In South Africa, AI is being used in agriculture to monitor crop health, in healthcare to assist with diagnostics, in finance for fraud detection, and in education for personalised learning. The technology is not coming — it is already here.</p>

<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Why AI Literacy Matters for Every Career</h2>
<p class="text-slate-600 leading-relaxed mb-4">You do not need to become a machine learning engineer to benefit from AI knowledge. Regardless of your career path, AI literacy provides critical advantages:</p>
<ul class="list-disc list-inside text-slate-600 leading-relaxed mb-6 space-y-2">
<li><strong>Doctors and healthcare workers</strong> — AI is being used for medical imaging analysis, drug discovery, and patient monitoring</li>
<li><strong>Lawyers</strong> — AI tools assist with legal research, contract analysis, and case prediction</li>
<li><strong>Marketing professionals</strong> — AI powers content generation, customer segmentation, and campaign optimisation</li>
<li><strong>Farmers</strong> — AI-driven precision agriculture helps optimise irrigation, fertilisation, and pest control</li>
<li><strong>Artists and designers</strong> — Generative AI is transforming creative workflows in graphic design, music, and writing</li>
</ul>

<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">The Skills Gap</h2>
<p class="text-slate-600 leading-relaxed mb-4">South Africa faces a significant technology skills gap. According to recent reports:</p>
<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
<div class="bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl p-6 text-white text-center">
<p class="text-3xl font-bold mb-1">800K+</p>
<p class="text-sm text-white/80">Tech jobs unfilled in South Africa</p>
</div>
<div class="bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl p-6 text-white text-center">
<p class="text-3xl font-bold mb-1">90%</p>
<p class="text-sm text-white/80">Of future jobs will require digital skills</p>
</div>
<div class="bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl p-6 text-white text-center">
<p class="text-3xl font-bold mb-1">3x</p>
<p class="text-sm text-white/80">Faster growth in AI-related salaries</p>
</div>
</div>
<p class="text-slate-600 leading-relaxed mb-6">Students who understand AI concepts will be better positioned to fill these roles, whether as AI specialists or as professionals who can leverage AI tools in their respective fields.</p>

<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">How to Get Started</h2>
<p class="text-slate-600 leading-relaxed mb-4">You do not need a degree in computer science to start learning about AI. Here are practical steps:</p>
<ol class="list-decimal list-inside text-slate-600 leading-relaxed mb-6 space-y-2">
<li><strong>Understand the basics</strong> — Learn what AI, machine learning, and deep learning are and how they differ</li>
<li><strong>Experiment with AI tools</strong> — Use ChatGPT, Google Gemini, and other AI assistants to understand their capabilities</li>
<li><strong>Take an online course</strong> — Platforms like Coursera, edX, and freeCodeCamp offer excellent introductory AI courses</li>
<li><strong>Build a project</strong> — Nothing beats hands-on experience. Build a simple chatbot or image classifier</li>
<li><strong>Join a community</strong> — Connect with other learners through AI meetups, hackathons, and online forums</li>
</ol>

<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">How TWT Is Preparing Students for the AI Era</h2>
<p class="text-slate-600 leading-relaxed mb-6">At The Walking Textbooks, AI literacy is woven into everything we do. Our AI Solutions service develops educational AI tools for schools, our tutoring programmes incorporate AI-powered learning aids, and our Software Development training includes practical AI projects. We believe that every student should graduate with at least a foundational understanding of how AI works and how to use it effectively.</p>

<div class="bg-slate-50 rounded-2xl p-8 my-8 border border-slate-100">
<h3 class="text-lg font-bold text-slate-900 mb-2">The Bottom Line</h3>
<p class="text-slate-600 leading-relaxed">AI is not just for tech companies. It is transforming every career, every industry, and every aspect of daily life. Students who invest time in understanding AI today will have a significant advantage tomorrow. <a href="/services/ai-solutions" class="text-indigo-600 font-medium hover:text-indigo-700">Explore TWT's AI Solutions</a> to see how we are making AI education accessible to all.</p>
</div>`,
    author: "Thabo Mokoena",
    category: "AI",
    tags: ["AI", "Students", "Future Skills", "Technology"],
    featured: false,
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
