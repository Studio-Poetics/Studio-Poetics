import Link from 'next/link'

export default function ResumePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Pranshu</h1>
        <p className="text-xl text-gray-600 mb-4">Designer & Developer</p>
        <div className="flex justify-center gap-4 text-gray-600">
          <a href="mailto:hello@pranshu.com" className="hover:text-black transition-colors">
            hello@pranshu.com
          </a>
          <span>•</span>
          <a href="https://github.com/pranshu" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
            GitHub
          </a>
          <span>•</span>
          <a href="https://linkedin.com/in/pranshu" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
            LinkedIn
          </a>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          To edit this content, modify the source files in your project directory and run `pnpm build`
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Experience</h2>
        <div className="space-y-8">
          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-semibold">Senior Designer</h3>
                <p className="text-gray-600">Studio Name</p>
              </div>
              <p className="text-gray-600">2020 - Present</p>
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Led design initiatives for major client projects</li>
              <li>Developed and maintained design systems</li>
              <li>Mentored junior designers and conducted design reviews</li>
            </ul>
          </div>

          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-semibold">Designer</h3>
                <p className="text-gray-600">Previous Company</p>
              </div>
              <p className="text-gray-600">2018 - 2020</p>
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Created user interfaces for web and mobile applications</li>
              <li>Collaborated with developers to implement designs</li>
              <li>Conducted user research and usability testing</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Design</h3>
            <ul className="text-gray-600 space-y-1">
              <li>UI/UX Design</li>
              <li>Design Systems</li>
              <li>Prototyping</li>
              <li>User Research</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Development</h3>
            <ul className="text-gray-600 space-y-1">
              <li>React</li>
              <li>Next.js</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Tools</h3>
            <ul className="text-gray-600 space-y-1">
              <li>Figma</li>
              <li>Git</li>
              <li>VS Code</li>
              <li>Adobe Creative Suite</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Education</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">Bachelor of Design</h3>
                <p className="text-gray-600">University Name</p>
              </div>
              <p className="text-gray-600">2014 - 2018</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Project Name</h3>
            <p className="text-gray-600 mb-4">
              Brief description of the project and your role in it.
            </p>
            <Link
              href="/projects/project-name"
              className="text-black hover:underline"
            >
              View Project →
            </Link>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Project Name</h3>
            <p className="text-gray-600 mb-4">
              Brief description of the project and your role in it.
            </p>
            <Link
              href="/projects/project-name"
              className="text-black hover:underline"
            >
              View Project →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 