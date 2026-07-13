"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Lightbulb,
  Award,
  Globe,
  Shield,
  Users,
  Heart,
  ArrowRight,
  Linkedin,
  Twitter,
  Calendar,
  BookOpen,
  Rocket,
  BrainCircuit,
  Code2,
  TrendingUp,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We embrace cutting-edge technology to create solutions that push the boundaries of what's possible in education.",
    gradient: "from-[#6C3CE1] to-[#00D4FF]",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for the highest quality in everything we do, from our courses to our technology platforms.",
    gradient: "from-[#00D4FF] to-[#6C3CE1]",
  },
  {
    icon: Globe,
    title: "Accessibility",
    description: "Education should be available to everyone, regardless of location, background, or socioeconomic status.",
    gradient: "from-[#6C3CE1] to-purple-500",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "We operate with transparency and honesty, building trust with our students, partners, and communities.",
    gradient: "from-purple-500 to-[#00D4FF]",
  },
  {
    icon: Users,
    title: "Empowerment",
    description: "We equip individuals with the tools, knowledge, and confidence they need to succeed in the digital age.",
    gradient: "from-[#00D4FF] to-[#6C3CE1]",
  },
  {
    icon: Heart,
    title: "Community",
    description: "We build lasting relationships and foster a supportive community of learners, educators, and technologists.",
    gradient: "from-[#6C3CE1] to-pink-500",
  },
];

const timeline = [
  {
    year: "2019",
    title: "TWT Founded",
    description: "Started as an academic tutoring service in South Africa, driven by a passion to make quality education accessible to all students.",
    icon: GraduationCap,
  },
  {
    year: "2020",
    title: "Digital Transformation",
    description: "Launched our online learning platform during COVID-19, rapidly adapting to the new digital landscape of education.",
    icon: Rocket,
  },
  {
    year: "2021",
    title: "Trading Academy Launch",
    description: "Expanded into trading education, offering comprehensive courses on financial markets and investment strategies.",
    icon: TrendingUp,
  },
  {
    year: "2022",
    title: "AI Integration",
    description: "Incorporated artificial intelligence solutions into our services, revolutionizing personalised learning experiences.",
    icon: BrainCircuit,
  },
  {
    year: "2023",
    title: "Technology Division",
    description: "Launched our software development and technology solutions arm, building custom platforms for clients across Africa.",
    icon: Code2,
  },
  {
    year: "2024",
    title: "Global Expansion",
    description: "Reached students across 10+ countries, establishing TWT as a pan-African leader in education technology.",
    icon: Globe,
  },
];

const team = [
  {
    name: "Thabo Mokoena",
    role: "Founder & CEO",
    bio: "Visionary leader with a passion for education and technology. Thabo founded TWT with the mission of bridging the gap between traditional learning and modern digital solutions across Africa.",
    initials: "TM",
    gradient: "from-[#6C3CE1] to-[#00D4FF]",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Dr. Sarah Ndaba",
    role: "Chief Technology Officer",
    bio: "AI expert and software architect with over a decade of experience in machine learning and educational technology systems.",
    initials: "SN",
    gradient: "from-[#00D4FF] to-[#6C3CE1]",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "James van der Merwe",
    role: "Head of Education",
    bio: "Experienced educator and curriculum designer dedicated to creating world-class learning experiences that inspire and empower students.",
    initials: "JM",
    gradient: "from-purple-500 to-[#00D4FF]",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Priya Sharma",
    role: "Head of Technology",
    bio: "Full-stack developer and trading systems expert with a talent for building robust, scalable platforms that serve thousands of users.",
    initials: "PS",
    gradient: "from-[#6C3CE1] to-pink-500",
    linkedin: "#",
    twitter: "#",
  },
];

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#1a1040] to-[#2d1b69] pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-[#6C3CE1]/20 blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-[#00D4FF]/15 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#6C3CE1]/5 blur-3xl" />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm text-gray-300 mb-8"
            >
              <BookOpen className="h-4 w-4 text-[#00D4FF]" />
              About Us
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-[#6C3CE1] to-[#00D4FF] bg-clip-text text-transparent">
                The Walking Textbooks
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Transforming learning through innovation, technology, and artificial intelligence.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Company Story */}
      <section className="py-20 lg:py-28 bg-white dark:bg-[#0A1628]">
        <Container>
          <AnimatedSection>
            <SectionHeading
              title="Our Story"
              subtitle="From a small tutoring initiative to a leading African EdTech company."
              gradient
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-12">
            <AnimatedSection delay={0.1}>
              <div className="space-y-6">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  The Walking Textbooks was born from a simple yet powerful observation: South Africa&apos;s
                  education system, while rich in potential, faced systemic challenges that left millions
                  of learners underserved. Inequality, limited access to quality resources, and a growing
                  digital divide meant that students in under-resourced communities were falling behind
                  their peers in an increasingly technology-driven world.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  Founded in 2019 by passionate educators and technologists, TWT set out to bridge
                  this gap. Our founders witnessed firsthand how traditional education methods, while
                  valuable, needed to evolve alongside rapidly advancing technology. We began as an
                  academic tutoring service, working directly with South African students to improve
                  their performance in mathematics, science, and languages. But we quickly realised
                  that tutoring alone wasn&apos;t enough — we needed to leverage technology to scale our
                  impact and reach more learners.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  Today, TWT has grown into a comprehensive education and technology company. We
                  combine cutting-edge AI, custom software development, and expert-led education
                  programs to serve students, educators, and businesses across Africa and beyond.
                  From our online learning platforms to our trading academy and AI-powered tools,
                  every product and service we build is guided by our belief that technology, when
                  thoughtfully applied, can transform education and create opportunities for
                  everyone — regardless of where they are or where they come from.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#0A1628] to-[#6C3CE1] p-1">
                  <div className="w-full h-full rounded-3xl bg-white dark:bg-[#0D1B2E] flex items-center justify-center overflow-hidden">
                    <div className="relative p-8 text-center">
                      <div className="grid grid-cols-3 gap-4 mb-8">
                        {[
                          { num: "10+", label: "Countries" },
                          { num: "5K+", label: "Students" },
                          { num: "50+", label: "Courses" },
                        ].map((stat) => (
                          <div
                            key={stat.label}
                            className="rounded-2xl bg-gradient-to-br from-[#6C3CE1]/10 to-[#00D4FF]/10 p-4"
                          >
                            <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#6C3CE1] to-[#00D4FF] bg-clip-text text-transparent">
                              {stat.num}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {stat.label}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-3">
                        {["EdTech Platforms", "AI Solutions", "Trading Academy", "Software Dev"].map(
                          (service) => (
                            <div
                              key={service}
                              className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 text-sm text-gray-700 dark:text-gray-300"
                            >
                              <div className="h-2 w-2 rounded-full bg-gradient-to-r from-[#6C3CE1] to-[#00D4FF]" />
                              {service}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 h-24 w-24 rounded-2xl bg-gradient-to-br from-[#6C3CE1] to-[#00D4FF] opacity-20 blur-xl" />
                <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-2xl bg-gradient-to-br from-[#00D4FF] to-[#6C3CE1] opacity-20 blur-xl" />
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-28 bg-gray-50 dark:bg-[#060e1a]">
        <Container>
          <AnimatedSection>
            <SectionHeading
              title="Mission & Vision"
              subtitle="What drives us and where we're headed."
              gradient
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <AnimatedSection delay={0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative rounded-2xl overflow-hidden bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200/60 dark:border-white/10 p-8 lg:p-10 h-full"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6C3CE1] to-[#00D4FF]" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#6C3CE1]/5 via-transparent to-[#00D4FF]/5 pointer-events-none" />
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#6C3CE1]/10 to-[#00D4FF]/10 dark:from-[#6C3CE1]/20 dark:to-[#00D4FF]/20 text-[#6C3CE1] dark:text-[#00D4FF] mb-6">
                    <Rocket className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    To make high-quality education more accessible while using technology to improve
                    learning experiences for students, educators, and traders across Africa and beyond.
                    We are committed to breaking down barriers and creating pathways to knowledge
                    that empower individuals to transform their lives.
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative rounded-2xl overflow-hidden bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200/60 dark:border-white/10 p-8 lg:p-10 h-full"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00D4FF] to-[#6C3CE1]" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/5 via-transparent to-[#6C3CE1]/5 pointer-events-none" />
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#00D4FF]/10 to-[#6C3CE1]/10 dark:from-[#00D4FF]/20 dark:to-[#6C3CE1]/20 text-[#00D4FF] dark:text-[#6C3CE1] mb-6">
                    <Globe className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    To become Africa&apos;s leading education and technology company, empowering
                    individuals through innovative learning solutions and AI-driven tools. We envision
                    a future where every African learner has access to world-class education and the
                    technology they need to thrive in the global economy.
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Core Values */}
      <section className="py-20 lg:py-28 bg-white dark:bg-[#0A1628]">
        <Container>
          <AnimatedSection>
            <SectionHeading
              title="Our Core Values"
              subtitle="The principles that guide everything we do."
              gradient
            />
          </AnimatedSection>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative rounded-2xl overflow-hidden bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200/60 dark:border-white/10 p-6 group"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${value.gradient}`} />
                <div className="absolute inset-0 bg-gradient-to-br from-[#6C3CE1]/5 via-transparent to-[#00D4FF]/5 pointer-events-none" />
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#6C3CE1]/10 to-[#00D4FF]/10 dark:from-[#6C3CE1]/20 dark:to-[#00D4FF]/20 text-[#6C3CE1] dark:text-[#00D4FF] mb-4 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-28 bg-gray-50 dark:bg-[#060e1a]">
        <Container>
          <AnimatedSection>
            <SectionHeading
              title="Our Journey"
              subtitle="Key milestones that have shaped who we are today."
              gradient
            />
          </AnimatedSection>

          <div className="relative mt-16">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#6C3CE1] via-[#00D4FF] to-[#6C3CE1]" />

            <div className="space-y-12">
              {timeline.map((item, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <AnimatedSection key={item.year} delay={index * 0.1}>
                    <div
                      className={`relative flex items-start gap-8 md:gap-0 ${
                        isLeft ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      {/* Dot */}
                      <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-[#6C3CE1] to-[#00D4FF] flex items-center justify-center z-10 shadow-lg shadow-[#6C3CE1]/25">
                        <item.icon className="h-4 w-4 text-white" />
                      </div>

                      {/* Content */}
                      <div
                        className={`ml-16 md:ml-0 md:w-1/2 ${
                          isLeft ? "md:pr-16 md:text-right" : "md:pl-16"
                        }`}
                      >
                        <div className="relative rounded-2xl bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200/60 dark:border-white/10 p-6">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#6C3CE1]/5 via-transparent to-[#00D4FF]/5 pointer-events-none rounded-2xl" />
                          <div className="relative z-10">
                            <div className={`flex items-center gap-2 mb-2 ${isLeft ? "md:justify-end" : ""}`}>
                              <Calendar className="h-4 w-4 text-[#6C3CE1]" />
                              <span className="text-sm font-bold bg-gradient-to-r from-[#6C3CE1] to-[#00D4FF] bg-clip-text text-transparent">
                                {item.year}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              {item.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Leadership Team */}
      <section className="py-20 lg:py-28 bg-white dark:bg-[#0A1628]">
        <Container>
          <AnimatedSection>
            <SectionHeading
              title="Meet Our Team"
              subtitle="The passionate people behind The Walking Textbooks."
              gradient
            />
          </AnimatedSection>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative rounded-2xl overflow-hidden bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200/60 dark:border-white/10 p-6 text-center group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#6C3CE1]/5 via-transparent to-[#00D4FF]/5 pointer-events-none" />
                <div className="relative z-10">
                  {/* Avatar */}
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${member.gradient} text-white text-2xl font-bold mb-4 shadow-lg group-hover:scale-105 transition-transform duration-300`}
                  >
                    {member.initials}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium bg-gradient-to-r from-[#6C3CE1] to-[#00D4FF] bg-clip-text text-transparent mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>

                  {/* Social Links */}
                  <div className="flex items-center justify-center gap-3">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-[#6C3CE1] hover:text-white transition-all duration-200"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-[#00D4FF] hover:text-[#0A1628] transition-all duration-200"
                      aria-label={`${member.name} Twitter`}
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-[#0A1628] via-[#1a1040] to-[#2d1b69] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -right-32 h-96 w-96 rounded-full bg-[#6C3CE1]/15 blur-3xl" />
          <div className="absolute bottom-1/4 -left-32 h-96 w-96 rounded-full bg-[#00D4FF]/10 blur-3xl" />
        </div>

        <Container className="relative z-10">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
                Join Our{" "}
                <span className="bg-gradient-to-r from-[#6C3CE1] to-[#00D4FF] bg-clip-text text-transparent">
                  Journey
                </span>
              </h2>
              <p className="text-lg text-gray-300 mb-10 max-w-xl mx-auto">
                Whether you&apos;re a student looking to learn, an educator seeking innovative tools, or a
                business wanting to transform through technology — we&apos;re here to help you succeed.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button href="/services" variant="primary" size="lg" icon={<ArrowRight className="h-5 w-5" />} iconPosition="right">
                  Explore Our Services
                </Button>
                <Button href="/contact" variant="secondary" size="lg" className="border-white/20 text-white hover:bg-white/10">
                  Get In Touch
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </main>
  );
}
