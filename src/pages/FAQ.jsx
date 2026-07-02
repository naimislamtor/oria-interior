import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronDown, ArrowRight, MessageCircle } from 'lucide-react'

const faqs = [
  {
    category: 'General',
    questions: [
      {
        q: 'What services does Orio Interior offer?',
        a: 'We offer Residential Interior, Commercial Interior, Office Interior, Restaurant Interior, Custom Furniture Design, and 3D Visualization services. Each service is tailored to meet your specific needs and budget.',
      },
      {
        q: 'How long does a typical interior design project take?',
        a: 'Project timelines vary depending on the scope. A single-room redesign may take 2–4 weeks, while a full-home or commercial project can take 2–4 months. We provide a detailed timeline at the beginning of every project.',
      },
      {
        q: 'Do you offer free consultations?',
        a: 'Yes! We offer a free initial consultation where we discuss your vision, requirements, and budget. You can book it through our website or call us directly.',
      },
    ],
  },
  {
    category: 'Pricing & Budget',
    questions: [
      {
        q: 'How is your pricing structured?',
        a: 'Our pricing depends on the project type, size, and scope. After the initial consultation, we provide a detailed quotation. We offer flexible packages to suit different budgets.',
      },
      {
        q: 'Can you work within a tight budget?',
        a: 'Absolutely. We believe great design doesn\'t have to be expensive. We work with clients across various budget ranges and always aim to maximize value without compromising quality.',
      },
      {
        q: 'What is included in the design fee?',
        a: 'The design fee typically includes concept development, design drawings, 3D visualization, material selection, and project supervision. Specific inclusions are outlined in the project proposal.',
      },
    ],
  },
  {
    category: 'Process & Delivery',
    questions: [
      {
        q: 'What is your design process?',
        a: 'Our process has 4 steps: (1) Free Consultation, (2) Design & Planning with 3D visuals, (3) Execution & Construction, (4) Final Reveal & Handover. We keep you informed at every stage.',
      },
      {
        q: 'Do you handle the construction and installation as well?',
        a: 'Yes, we provide end-to-end project management — from design to final installation. Our trusted network of contractors and craftsmen ensures seamless execution.',
      },
      {
        q: 'Can I make changes during the project?',
        a: 'Minor adjustments can be accommodated during the project. Significant changes may affect timeline and cost, which we discuss transparently before proceeding.',
      },
    ],
  },
  {
    category: 'After Project',
    questions: [
      {
        q: 'Do you provide after-project support?',
        a: 'Yes. We offer a warranty period for our work and are available for any post-completion queries or touch-ups. Client satisfaction is our top priority.',
      },
      {
        q: 'Can I get a maintenance service after completion?',
        a: 'We do offer periodic maintenance checks and can connect you with trusted vendors for ongoing upkeep of your space.',
      },
    ],
  },
]

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="border-b last:border-0 overflow-hidden"
      style={{ borderColor: 'var(--border-color)' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="font-semibold text-base group-hover:text-[var(--accent)] transition" style={{ color: 'var(--text-primary)' }}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
          style={{ color: 'var(--accent)' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="pb-5 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FAQ() {
  return (
    <div style={{ backgroundColor: 'var(--bg-section)' }}>
      {/* Header */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-on-dark)' }}
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?q=80&w=1600"
            alt="FAQ"
            className="w-full h-full object-cover opacity-25"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-semibold uppercase tracking-wider text-sm mb-3"
            style={{ color: 'var(--accent)' }}
          >
            Got Questions?
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Frequently Asked <span style={{ color: 'var(--accent)' }}>Questions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto opacity-75 text-lg"
          >
            Find answers to the most common questions about our services, pricing, and process.
          </motion.p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <div className="space-y-12">
          {faqs.map((section, idx) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <h2
                className="text-xl font-bold mb-4 pb-3 border-b-2"
                style={{ color: 'var(--text-primary)', borderColor: 'var(--accent)' }}
              >
                {section.category}
              </h2>
              <div
                className="premium-card px-6"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
              >
                {section.questions.map((item) => (
                  <FAQItem key={item.q} question={item.q} answer={item.a} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center p-10 rounded-2xl"
          style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-on-dark)' }}
        >
          <MessageCircle size={40} style={{ color: 'var(--accent)' }} className="mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-3">Still Have Questions?</h3>
          <p className="opacity-70 mb-6 max-w-md mx-auto">
            Can't find the answer you're looking for? Our team is happy to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="btn-animated inline-flex items-center gap-2 px-6 py-3 rounded font-semibold"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
            >
              Contact Us <ArrowRight size={16} className="icon-slide" />
            </Link>
            <a
              href="https://wa.me/8801983890650"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-animated inline-flex items-center gap-2 px-6 py-3 rounded font-semibold border"
              style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'var(--text-on-dark)' }}
            >
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default FAQ