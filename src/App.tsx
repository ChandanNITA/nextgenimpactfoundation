import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'

import About from './pages/about'
import Blog from './pages/blog'
import BlogSlug from './pages/blog-slug'
import Contact from './pages/contact'
import Donate from './pages/donate'
import Events from './pages/events'
import Gallery from './pages/gallery'
import Impact from './pages/impact'
import Partner from './pages/partner'
import Privacy from './pages/privacy'
import Programs from './pages/programs'
import ProgramsSlug from './pages/programs-slug'
import Stories from './pages/stories'
import StoriesSlug from './pages/stories-slug'
import Terms from './pages/terms'
import Volunteer from './pages/volunteer'
import Home from './pages/Home'
import SubmitTestimonial from './pages/submit-testimonial'
import AdminTestimonials from './pages/admin/testimonials'

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogSlug />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/partner" element={<Partner />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/programs/:slug" element={<ProgramsSlug />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/stories/:slug" element={<StoriesSlug />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/submit-testimonial" element={<SubmitTestimonial />} />
            <Route path="/admin/testimonials" element={<AdminTestimonials />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

