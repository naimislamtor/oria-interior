// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   ArrowRight,
//   Target,
//   Eye,
//   Award,
//   Users,
//   Lightbulb,
//   ShieldCheck,
//   Quote,
// } from "lucide-react";

// const journey = [
//   {
//     year: "2016",
//     title: "The Beginning",
//     desc: "Orio Interior was founded with a small team and a big vision — to redefine living spaces.",
//   },
//   {
//     year: "2019",
//     title: "Expanding Services",
//     desc: "Launched commercial and office interior services, growing our client base across the city.",
//   },
//   {
//     year: "2022",
//     title: "100+ Projects",
//     desc: "Crossed 100 successful projects and opened our second design studio.",
//   },
//   {
//     year: "2026",
//     title: "Industry Leader",
//     desc: "Now recognized as one of the leading interior design firms with 250+ completed projects.",
//   },
// ];

// const whyChooseUs = [
//   {
//     icon: Award,
//     title: "Award-Winning Design",
//     desc: "Recognized with multiple design excellence awards over the years.",
//   },
//   {
//     icon: Users,
//     title: "Expert Team",
//     desc: "A skilled team of architects, designers, and craftsmen.",
//   },
//   {
//     icon: Lightbulb,
//     title: "Creative Solutions",
//     desc: "Unique, innovative designs tailored to your lifestyle and budget.",
//   },
//   {
//     icon: ShieldCheck,
//     title: "Quality Assurance",
//     desc: "Premium materials and rigorous quality checks at every step.",
//   },
// ];

// function About() {
//   return (
//     <div style={{ backgroundColor: "var(--bg-section)" }}>
//       {/* Page Header */}
//       <section
//         className="relative py-24 overflow-hidden"
//         style={{
//           backgroundColor: "var(--bg-primary)",
//           color: "var(--text-on-dark)",
//         }}
//       >
//         <div className="absolute inset-0">
//           <img
//             src="https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1600"
//             alt="About Orio Interior"
//             className="w-full h-full object-cover opacity-25"
//           />
//         </div>
//         <div className="relative max-w-7xl mx-auto px-4 text-center">
//           <p
//             className="font-semibold uppercase tracking-wider text-sm mb-3"
//             style={{ color: "var(--accent)" }}
//           >
//             About Orio Interior
//           </p>
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">
//             Designing Spaces,{" "}
//             <span style={{ color: "var(--accent)" }}>Building Stories</span>
//           </h1>
//           <p className="max-w-2xl mx-auto opacity-75 text-lg">
//             A decade of passion, creativity, and craftsmanship — turning
//             ordinary spaces into extraordinary experiences.
//           </p>
//         </div>
//       </section>

//       {/* Company Intro */}
//       <section className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
//         <motion.div
//           initial={{ opacity: 0, x: -30 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           <img
//             src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800"
//             alt="Our Studio"
//             className="rounded-lg shadow-xl w-full h-[450px] object-cover"
//           />
//         </motion.div>
//         <motion.div
//           initial={{ opacity: 0, x: 30 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           <p
//             className="font-semibold uppercase tracking-wider text-sm mb-3"
//             style={{ color: "var(--accent)" }}
//           >
//             Who We Are
//           </p>
//           <h2
//             className="text-3xl md:text-4xl font-bold mb-5"
//             style={{ color: "var(--text-primary)" }}
//           >
//             A Studio Built on Passion for Design
//           </h2>
//           <p
//             className="mb-4 leading-relaxed"
//             style={{ color: "var(--text-secondary)" }}
//           >
//             Orio Interior is a full-service interior design studio dedicated to
//             creating spaces that are not only beautiful but deeply personal. We
//             work closely with homeowners, businesses, and architects to bring
//             every vision to life — from concept sketches to the final reveal.
//           </p>
//           <p
//             className="mb-4 leading-relaxed"
//             style={{ color: "var(--text-secondary)" }}
//           >
//             Our team combines functional planning with artistic detail, ensuring
//             every project reflects the unique personality of the people who live
//             and work in it.
//           </p>
//           <div className="grid grid-cols-2 gap-6 mt-8">
//             <div>
//               <h3
//                 className="text-3xl font-bold"
//                 style={{ color: "var(--accent)" }}
//               >
//                 250+
//               </h3>
//               <p className="text-sm" style={{ color: "var(--text-muted)" }}>
//                 Projects Completed
//               </p>
//             </div>
//             <div>
//               <h3
//                 className="text-3xl font-bold"
//                 style={{ color: "var(--accent)" }}
//               >
//                 10+
//               </h3>
//               <p className="text-sm" style={{ color: "var(--text-muted)" }}>
//                 Years of Experience
//               </p>
//             </div>
//           </div>
//         </motion.div>
//       </section>

//       {/* Vision & Mission */}
//       <section className="py-20" style={{ backgroundColor: "var(--bg-card)" }}>
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-14">
//             <p
//               className="font-semibold uppercase tracking-wider text-sm mb-3"
//               style={{ color: "var(--accent)" }}
//             >
//               Our Purpose
//             </p>
//             <h2
//               className="text-3xl md:text-4xl font-bold"
//               style={{ color: "var(--text-primary)" }}
//             >
//               Vision & Mission
//             </h2>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5 }}
//               className="p-8 rounded-lg border"
//               style={{
//                 backgroundColor: "var(--bg-section)",
//                 borderColor: "var(--border-color)",
//               }}
//             >
//               <div
//                 className="w-14 h-14 rounded-lg flex items-center justify-center mb-5"
//                 style={{
//                   backgroundColor:
//                     "color-mix(in srgb, var(--accent) 12%, transparent)",
//                 }}
//               >
//                 <Eye style={{ color: "var(--accent)" }} size={26} />
//               </div>
//               <h3
//                 className="text-xl font-bold mb-3"
//                 style={{ color: "var(--text-primary)" }}
//               >
//                 Our Vision
//               </h3>
//               <p
//                 className="leading-relaxed"
//                 style={{ color: "var(--text-secondary)" }}
//               >
//                 To become the most trusted interior design brand, recognized for
//                 transforming everyday spaces into extraordinary, functional
//                 works of art across the region.
//               </p>
//             </motion.div>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//               className="p-8 rounded-lg border"
//               style={{
//                 backgroundColor: "var(--bg-section)",
//                 borderColor: "var(--border-color)",
//               }}
//             >
//               <div
//                 className="w-14 h-14 rounded-lg flex items-center justify-center mb-5"
//                 style={{
//                   backgroundColor:
//                     "color-mix(in srgb, var(--accent) 12%, transparent)",
//                 }}
//               >
//                 <Target style={{ color: "var(--accent)" }} size={26} />
//               </div>
//               <h3
//                 className="text-xl font-bold mb-3"
//                 style={{ color: "var(--text-primary)" }}
//               >
//                 Our Mission
//               </h3>
//               <p
//                 className="leading-relaxed"
//                 style={{ color: "var(--text-secondary)" }}
//               >
//                 To deliver thoughtful, high-quality interior design solutions
//                 through honest communication, creative excellence, and a deep
//                 commitment to client satisfaction.
//               </p>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Founder Message */}
//       <section className="max-w-7xl mx-auto px-4 py-20">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="grid md:grid-cols-3 gap-10 items-center p-8 md:p-12 rounded-2xl"
//           style={{ backgroundColor: "var(--bg-primary)" }}
//         >
//           <div className="md:col-span-1">
//             <img
//               src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600"
//               alt="Founder"
//               className="w-full h-72 object-cover rounded-lg"
//             />
//           </div>
//           <div
//             className="md:col-span-2"
//             style={{ color: "var(--text-on-dark)" }}
//           >
//             <Quote
//               style={{ color: "var(--accent)" }}
//               size={36}
//               className="mb-4"
//             />
//             <p className="text-lg md:text-xl leading-relaxed opacity-90 mb-6">
//               "When we started Orio Interior, our goal was simple — to help
//               people fall in love with the spaces they live and work in every
//               day. A decade later, that mission hasn't changed. Every project we
//               take on is a chance to tell a new story through design."
//             </p>
//             <h4 className="text-lg font-bold">Naimul Islam</h4>
//             <p className="text-sm opacity-60">
//               Founder & Creative Director, Orio Interior
//             </p>
//           </div>
//         </motion.div>
//       </section>

//       {/* Company Journey / Timeline */}
//       <section className="py-20" style={{ backgroundColor: "var(--bg-card)" }}>
//         <div className="max-w-5xl mx-auto px-4">
//           <div className="text-center mb-16">
//             <p
//               className="font-semibold uppercase tracking-wider text-sm mb-3"
//               style={{ color: "var(--accent)" }}
//             >
//               Our Journey
//             </p>
//             <h2
//               className="text-3xl md:text-4xl font-bold"
//               style={{ color: "var(--text-primary)" }}
//             >
//               Milestones Along the Way
//             </h2>
//           </div>
//           <div className="relative">
//             <div
//               className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
//               style={{ backgroundColor: "var(--border-color)" }}
//             />
//             <div className="space-y-12">
//               {journey.map((item, idx) => (
//                 <motion.div
//                   key={item.year}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.5, delay: idx * 0.1 }}
//                   className={`flex flex-col md:flex-row items-center gap-6 ${
//                     idx % 2 === 1 ? "md:flex-row-reverse" : ""
//                   }`}
//                 >
//                   <div
//                     className="flex-1 text-center md:text-left"
//                     style={{ textAlign: idx % 2 === 1 ? "right" : "left" }}
//                   >
//                     <div
//                       className="inline-block p-6 rounded-lg border max-w-sm"
//                       style={{
//                         backgroundColor: "var(--bg-section)",
//                         borderColor: "var(--border-color)",
//                       }}
//                     >
//                       <span
//                         className="font-bold text-sm"
//                         style={{ color: "var(--accent)" }}
//                       >
//                         {item.year}
//                       </span>
//                       <h3
//                         className="text-lg font-bold mt-1 mb-2"
//                         style={{ color: "var(--text-primary)" }}
//                       >
//                         {item.title}
//                       </h3>
//                       <p
//                         className="text-sm leading-relaxed"
//                         style={{ color: "var(--text-secondary)" }}
//                       >
//                         {item.desc}
//                       </p>
//                     </div>
//                   </div>
//                   <div
//                     className="hidden md:flex w-4 h-4 rounded-full flex-shrink-0 z-10 border-4"
//                     style={{
//                       backgroundColor: "var(--accent)",
//                       borderColor: "var(--bg-card)",
//                     }}
//                   />
//                   <div className="flex-1 hidden md:block" />
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Why Choose Us */}
//       <section className="max-w-7xl mx-auto px-4 py-20">
//         <div className="text-center mb-14">
//           <p
//             className="font-semibold uppercase tracking-wider text-sm mb-3"
//             style={{ color: "var(--accent)" }}
//           >
//             Why Choose Us
//           </p>
//           <h2
//             className="text-3xl md:text-4xl font-bold"
//             style={{ color: "var(--text-primary)" }}
//           >
//             What Sets Us Apart
//           </h2>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {whyChooseUs.map((item, idx) => {
//             const Icon = item.icon;
//             return (
//               <motion.div
//                 key={item.title}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.4, delay: idx * 0.1 }}
//                 className="text-center p-6 rounded-lg border"
//                 style={{
//                   backgroundColor: "var(--bg-card)",
//                   borderColor: "var(--border-color)",
//                 }}
//               >
//                 <div
//                   className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4"
//                   style={{
//                     backgroundColor:
//                       "color-mix(in srgb, var(--accent) 12%, transparent)",
//                   }}
//                 >
//                   <Icon style={{ color: "var(--accent)" }} size={24} />
//                 </div>
//                 <h3
//                   className="font-bold mb-2"
//                   style={{ color: "var(--text-primary)" }}
//                 >
//                   {item.title}
//                 </h3>
//                 <p
//                   className="text-sm leading-relaxed"
//                   style={{ color: "var(--text-secondary)" }}
//                 >
//                   {item.desc}
//                 </p>
//               </motion.div>
//             );
//           })}
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-16" style={{ backgroundColor: "var(--accent)" }}>
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <h2
//             className="text-3xl md:text-4xl font-bold mb-4"
//             style={{ color: "var(--bg-primary)" }}
//           >
//             Let's Build Something Beautiful Together
//           </h2>
//           <p
//             className="mb-8 max-w-xl mx-auto opacity-80"
//             style={{ color: "var(--bg-primary)" }}
//           >
//             Ready to start your interior design journey? Reach out for a free
//             consultation.
//           </p>
//           <Link
//             to="/contact"
//             className="inline-flex items-center gap-2 px-7 py-3 rounded font-semibold transition"
//             style={{
//               backgroundColor: "var(--bg-primary)",
//               color: "var(--text-on-dark)",
//             }}
//           >
//             Get In Touch <ArrowRight size={18} />
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default About;
import {
  Sofa,
  Building2,
  Briefcase,
  Utensils,
  PenTool,
  Box,
} from "lucide-react";

export const servicesData = [
  {
    slug: "residential-interior",
    icon: Sofa,
    title: "Residential Interior",
    shortDesc: "Transform your home into a stylish, comfortable living space.",
    heroImg:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400",
    overview:
      "Your home should feel like a true reflection of who you are. Our residential interior design service covers everything from single rooms to full-home makeovers — blending comfort, functionality, and personal style into every corner.",
    features: [
      "Living Room & Bedroom Design",
      "Kitchen & Dining Layouts",
      "Custom Storage Solutions",
      "Lighting & Ambiance Planning",
      "Color Palette Consultation",
      "Furniture Selection & Placement",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=600",
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=600",
    ],
  },
  {
    slug: "commercial-interior",
    icon: Building2,
    title: "Commercial Interior",
    shortDesc: "Professional designs that reflect your brand identity.",
    heroImg:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1400",
    overview:
      "A well-designed commercial space builds trust and leaves a lasting impression on clients and customers. We design retail stores, showrooms, and commercial spaces that align with your brand identity while maximizing functionality.",
    features: [
      "Retail & Showroom Design",
      "Brand-Aligned Interiors",
      "Customer Flow Planning",
      "Display & Signage Integration",
      "Material & Finish Selection",
      "Budget-Conscious Solutions",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600",
      "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=80&w=600",
    ],
  },
  {
    slug: "office-interior",
    icon: Briefcase,
    title: "Office Interior",
    shortDesc: "Productive, modern workspaces designed for your team.",
    heroImg:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1400",
    overview:
      "A thoughtfully designed office boosts productivity, collaboration, and employee satisfaction. We create modern workspaces that balance professional aesthetics with practical, efficient layouts.",
    features: [
      "Open & Private Workspace Planning",
      "Meeting Room Design",
      "Ergonomic Furniture Selection",
      "Branding Integration",
      "Acoustic & Lighting Solutions",
      "Breakout & Lounge Areas",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=600",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=600",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=600",
    ],
  },
  {
    slug: "restaurant-interior",
    icon: Utensils,
    title: "Restaurant Interior",
    shortDesc: "Inviting dining spaces that keep customers coming back.",
    heroImg:
      "https://images.unsplash.com/photo-1592861956120-e524fc739696?q=80&w=1400",
    overview:
      "Great food deserves a great atmosphere. We design restaurant and cafe interiors that create memorable dining experiences — combining ambiance, comfort, and operational efficiency.",
    features: [
      "Dining Area Layout & Flow",
      "Theme & Ambiance Design",
      "Bar & Kitchen Integration",
      "Seating Capacity Optimization",
      "Lighting & Acoustic Design",
      "Custom Furniture & Decor",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1592861956120-e524fc739696?q=80&w=600",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=600",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600",
    ],
  },
  {
    slug: "furniture-design",
    icon: PenTool,
    title: "Furniture Design",
    shortDesc: "Custom furniture crafted to match your interior style.",
    heroImg:
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1400",
    overview:
      "Off-the-shelf furniture doesn't always fit your space or style. Our custom furniture design service creates pieces tailored exactly to your interior — in the right size, material, and finish.",
    features: [
      "Custom Sofa & Seating Design",
      "Built-In Wardrobes & Cabinets",
      "Dining & Office Furniture",
      "Material & Upholstery Selection",
      "Space-Optimized Solutions",
      "Craftsmanship Quality Control",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=600",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=600",
    ],
  },
  {
    slug: "3d-visualization",
    icon: Box,
    title: "3D Visualization",
    shortDesc: "See your space before it's built with realistic 3D renders.",
    heroImg:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1400",
    overview:
      "Make confident design decisions before construction begins. Our 3D visualization service creates photo-realistic renders so you can experience your future space — every material, color, and layout — ahead of time.",
    features: [
      "Photo-Realistic 3D Renders",
      "Virtual Walkthroughs",
      "Material & Lighting Simulation",
      "Multiple Design Variations",
      "Floor Plan Visualization",
      "Pre-Construction Approval Renders",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=600",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600",
    ],
  },
];
