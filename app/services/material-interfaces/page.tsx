"use client";

import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export default function MaterialInterfaces(): React.JSX.Element {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#fb4e4e] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-6xl md:text-7xl font-normal mb-6">
              Material
              <br />
              Interfaces
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Creating seamless connections between digital experiences and physical materials.
              Where technology meets tangible design.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center bg-white text-[#fb4e4e] px-8 py-3 rounded-full hover:bg-opacity-90 transition-colors"
            >
              Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* What We Do Section */}
      <AnimatedSection>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.h2 className="text-4xl mb-12 text-center" variants={fadeIn}>
              What We Do
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div className="text-center" variants={fadeIn}>
                <div className="w-16 h-16 bg-[#fb4e4e] rounded-full mx-auto mb-4"></div>
                <h3 className="text-2xl mb-4">Smart Materials</h3>
                <p className="text-gray-600">
                  Integrating sensors and responsive elements into everyday materials for intuitive interaction.
                </p>
              </motion.div>
              <motion.div className="text-center" variants={fadeIn}>
                <div className="w-16 h-16 bg-[#fb4e4e] rounded-full mx-auto mb-4"></div>
                <h3 className="text-2xl mb-4">Touch Interfaces</h3>
                <p className="text-gray-600">
                  Developing haptic feedback systems that bridge digital and physical experiences.
                </p>
              </motion.div>
              <motion.div className="text-center" variants={fadeIn}>
                <div className="w-16 h-16 bg-[#fb4e4e] rounded-full mx-auto mb-4"></div>
                <h3 className="text-2xl mb-4">Adaptive Surfaces</h3>
                <p className="text-gray-600">
                  Creating dynamic surfaces that respond to user behavior and environmental conditions.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Process Section */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.h2 className="text-4xl mb-12 text-center" variants={fadeIn}>
              Our Process
            </motion.h2>
            <div className="grid md:grid-cols-4 gap-8">
              <motion.div className="text-center" variants={fadeIn}>
                <div className="text-4xl font-bold text-[#fb4e4e] mb-4">01</div>
                <h3 className="text-xl mb-4">Research</h3>
                <p className="text-gray-600">
                  Understanding material properties and user interaction patterns.
                </p>
              </motion.div>
              <motion.div className="text-center" variants={fadeIn}>
                <div className="text-4xl font-bold text-[#fb4e4e] mb-4">02</div>
                <h3 className="text-xl mb-4">Prototype</h3>
                <p className="text-gray-600">
                  Building functional prototypes to test interaction concepts.
                </p>
              </motion.div>
              <motion.div className="text-center" variants={fadeIn}>
                <div className="text-4xl font-bold text-[#fb4e4e] mb-4">03</div>
                <h3 className="text-xl mb-4">Iterate</h3>
                <p className="text-gray-600">
                  Refining based on user feedback and technical constraints.
                </p>
              </motion.div>
              <motion.div className="text-center" variants={fadeIn}>
                <div className="text-4xl font-bold text-[#fb4e4e] mb-4">04</div>
                <h3 className="text-xl mb-4">Implement</h3>
                <p className="text-gray-600">
                  Delivering production-ready material interface solutions.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
            <motion.h2 className="text-4xl mb-6" variants={fadeIn}>
              Ready to Bridge Digital and Physical?
            </motion.h2>
            <motion.p className="text-lg mb-8 max-w-2xl mx-auto" variants={fadeIn}>
              Let's create interfaces that feel natural, intuitive, and beautifully integrated into the
              material world around us.
            </motion.p>
            <motion.div variants={fadeIn}>
              <Link href="/contact" className="inline-flex items-center bg-[#fb4e4e] text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-colors">
                Explore Material Interfaces <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}