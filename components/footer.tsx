import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-20 w-full">
      <div className="container mx-auto px-4 md:px-6">
        {/* Glasscape and Social Media Section - Moved to top */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-normal mb-6">We are on socials</h3>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="https://instagram.com"
                  className="rainbow-border-btn border border-white rounded-full px-4 py-2 text-sm hover:bg-white hover:text-black transition-colors"
                >
                  INSTAGRAM
                </Link>
                <Link
                  href="https://facebook.com"
                  className="rainbow-border-btn border border-white rounded-full px-4 py-2 text-sm hover:bg-white hover:text-black transition-colors"
                >
                  FACEBOOK
                </Link>
                <Link
                  href="https://twitter.com"
                  className="rainbow-border-btn border border-white rounded-full px-4 py-2 text-sm hover:bg-white hover:text-black transition-colors"
                >
                  TWITTER
                </Link>
                <Link
                  href="https://youtube.com"
                  className="rainbow-border-btn border border-white rounded-full px-4 py-2 text-sm hover:bg-white hover:text-black transition-colors"
                >
                  YOUTUBE
                </Link>
                <Link
                  href="https://telegram.org"
                  className="rainbow-border-btn border border-white rounded-full px-4 py-2 text-sm hover:bg-white hover:text-black transition-colors"
                >
                  TELEGRAM
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-normal mb-6">
                <span className="gradient-text">Experience Reality Reimagined — Discover Glasscape</span>
              </h3>
              <div className="inline-block">
                <Link
                  href="https://glasscape.in"
                  className="rainbow-border-btn border border-white rounded-full px-8 py-3 text-base hover:bg-white hover:text-black transition-colors font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explore Glasscape
                </Link>
              </div>
              <p className="mt-4 text-gray-400 max-w-xl">
                Step into the extraordinary with our breakthrough holographic technology — where digital art meets
                physical reality in a mesmerizing dance of light and dimension.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="text-xl font-normal mb-6">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/games" className="hover:underline">
                  Games
                </Link>
              </li>
              <li>
                <Link href="/workbooks" className="hover:underline">
                  Workbooks
                </Link>
              </li>
              <li>
                <a href="/catalogue.pdf" download className="hover:underline">
                  Catalogue
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-normal mb-6">Exhibitions and Events</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/exhibitions" className="hover:underline">
                  Exhibitions
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="hover:underline">
                  Calendar
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-normal mb-6">Learn</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/workshop" className="hover:underline">
                  Workshops
                </Link>
              </li>
              <li>
                <Link href="/academic" className="hover:underline">
                  Academic Workshop
                </Link>
              </li>
              <li>
                <Link href="/professional" className="hover:underline">
                  Professional Workshop
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-normal mb-6">Research and Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/journal" className="hover:underline">
                  The Studio Poetics Journal
                </Link>
              </li>
              <li>
                <Link href="/workshops" className="hover:underline">
                  Studio Workshops
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="text-xl font-normal mb-6">About</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/jobs" className="hover:underline">
                  Jobs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contacts
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-gray-800">
          <div>
            <h3 className="text-xl font-normal mb-6">Contact Us</h3>
            <p className="mb-3">Poetics Research and Innovation Studio LLP, India</p>
            <p className="mb-3">hello@poetics.studio</p>
          </div>

          <div>
            <h3 className="text-xl font-normal mb-6">Hours</h3>
            <p className="mb-3">Open Mon-Fri, 09:00–15:00</p>
            {/*<p className="mb-2">Ticket office closes 30 minutes before Studio closing time</p>*/}
          </div>
        </div>

        <div className="mt-16 pt-12 border-t border-gray-800 text-sm text-gray-400 flex flex-wrap justify-between gap-6">
          <div className="flex gap-6">
            <Link href="/policies" className="hover:underline">
              Privacy Policies
            </Link>
            <Link href="/license" className="hover:underline">
              License Agreement
            </Link>
          </div>
          <div>© Studio Poetics {new Date().getFullYear()}</div>
          <div>Designed by Studio Poetics</div>
        </div>
      </div>
    </footer>
  )
}
