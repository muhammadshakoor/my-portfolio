import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { projects, categories } from "@/data/projects";

// Cards never render case studies; dropping them here keeps ~18 KB of text
// out of the homepage's client bundle (they're served by /projects/[slug]).
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const projectCards = projects.map(({ caseStudy, ...card }) => card);

export default function Home() {
  return (
    <main id="main">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects projects={projectCards} categories={categories} />
      <Experience />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
