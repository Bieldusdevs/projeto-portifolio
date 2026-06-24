// ============================================
// PÁGINA PRINCIPAL — Ordem das seções
// Para reordenar ou remover seções, edite aqui
// ============================================
import Hero from './components/Hero'
import Projects from './components/Projects'
import Technologies from './components/Technologies'
import Experience from './components/Experience'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <Technologies />
      <Experience />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
