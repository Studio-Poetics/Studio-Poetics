"use client"

import Image from "next/image"
import { ArrowUp, ArrowDown } from "lucide-react"
import { useState } from "react"

interface Event {
  image: string
  category: string
  title: string
  timeStart: string
  timeEnd: string
  location: string
  registration: string
  registrationLink?: string
  date: string
}

interface CalendarSection {
  month: string
  year: string
  events: Event[]
}

// Define calendar data
const calendarData: CalendarSection[] = [
  {
    month: "DECEMBER",
    year: "2024",
    events: [
      {
        image: "/raw1.png",
        category: "Exhibition",
        title: "RAW Collaborative Exhibition",
        timeStart: "Gandhinagar",
        timeEnd: "Gujarat",
        location: "STUDIO SPACE",
        registration: "FREE ENTRY",
        date: "December 2024"
      },
      {
        image: "/placeholder.svg?height=200&width=300",
        category: "Workshop",
        title: "IoT Workshop",
        timeStart: "National Institute of Design",
        timeEnd: "Bangalore Campus",
        location: "STUDIO SPACE",
        registration: "FOR UNIVERSITY STUDENTS ONLY",
        date: "December 23, 2024 - January 3, 2025"
      }
    ]
  },
  {
    month: "JANUARY",
    year: "2025",
    events: [
      {
        image: "/placeholder.svg?height=200&width=300",
        category: "Workshop",
        title: "Immersive Interactive Media Workshop",
        timeStart: "National Institute of Design",
        timeEnd: "Ahmedabad",
        location: "STUDIO SPACE",
        registration: "FOR UNIVERSITY STUDENTS ONLY",
        date: "January 13-25, 2025"
      },
      {
        image: "/placeholder.svg?height=200&width=300",
        category: "Workshop",
        title: "Augmented and Extended Reality Workshop",
        timeStart: "JK Lakshmipat University",
        timeEnd: "Jaipur",
        location: "STUDIO SPACE",
        registration: "FOR UNIVERSITY STUDENTS ONLY",
        date: "January 27 - February 7, 2025"
      }
    ]
  },
  {
    month: "MARCH-APRIL",
    year: "2025",
    events: [
      {
        image: "/placeholder.svg?height=200&width=300",
        category: "Workshop",
        title: "Interactive Machines Workshop",
        timeStart: "Anant National University",
        timeEnd: "Gujarat",
        location: "STUDIO SPACE",
        registration: "FOR UNIVERSITY STUDENTS ONLY",
        date: "March-April 2025"
      }
    ]
  },
  {
    month: "JULY",
    year: "2025",
    events: [
      {
        image: "/placeholder.svg?height=200&width=300",
        category: "Workshop",
        title: "The Power of Beginners Mindset Workshop",
        timeStart: "Date to be announced",
        timeEnd: "",
        location: "STUDIO SPACE",
        registration: "REGISTER NOW",
        registrationLink: "https://forms.gle/your-form-link-here",
        date: "July 2025"
      }
    ]
  },
  {
    month: "AUGUST",
    year: "2025",
    events: [
      {
        image: "/placeholder.svg?height=200&width=300",
        category: "Workshop",
        title: "Technology in Retail Workshop",
        timeStart: "National Institute of Design",
        timeEnd: "Bangalore",
        location: "STUDIO SPACE",
        registration: "FOR UNIVERSITY STUDENTS ONLY",
        date: "August 1-8, 2025"
      },
      {
        image: "/placeholder.svg?height=200&width=300",
        category: "Workshop",
        title: "Learning to Design for Blockchain Ecosystem",
        timeStart: "A Beginners Workshop",
        timeEnd: "",
        location: "STUDIO SPACE",
        registration: "REGISTER NOW",
        registrationLink: "https://forms.gle/your-form-link-here",
        date: "August 9-10, 2025"
      }
    ]
  }
]

export default function CalendarPage() {
  // State to track which calendar sections are open
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    "DECEMBER 2024": false,
    "JANUARY 2025": false,
    "MARCH-APRIL 2025": false,
    "JULY 2025": false,
    "AUGUST 2025": false
  })

  // Toggle calendar section
  const toggleSection = (monthYear: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [monthYear]: !prev[monthYear],
    }))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <div className="mt-12 mb-8">
        <h1 className="text-5xl font-normal">CALENDAR</h1>
      </div>

      <div className="border-t border-gray-200 mb-6"></div>

      {/* Calendar entries */}
      <div className="mb-12">
        {calendarData.map((section) => {
          const monthYear = `${section.month} ${section.year}`
          return (
            <div key={monthYear} className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{monthYear}</span>
                </div>
                <button
                  onClick={() => toggleSection(monthYear)}
                  className="focus:outline-none transition-transform duration-300"
                  aria-label={openSections[monthYear] ? "Collapse section" : "Expand section"}
                >
                  {openSections[monthYear] ? <ArrowUp className="h-6 w-6" /> : <ArrowDown className="h-6 w-6" />}
                </button>
              </div>

              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-500 ease-in-out overflow-hidden ${
                  openSections[monthYear] ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {section.events.map((event, index) => (
                  <div key={`${monthYear}-${index}`} className="border-t pt-4">
                    <div className="relative h-48 mb-4">
                      <Image 
                        src={event.image} 
                        alt={event.title} 
                        fill 
                        className="object-cover rounded-sm"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="text-xs text-gray-600 mb-1">{event.category}</div>
                    <h3 className="text-lg font-normal mb-2">{event.title}</h3>
                    <div className="flex justify-between text-xs mt-4">
                      <div>
                        <div>{event.timeStart}</div>
                        <div>{event.timeEnd}</div>
                      </div>
                      <div className="text-right">
                        <div>{event.location}</div>
                        {event.registrationLink ? (
                          <a
                            href={event.registrationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#fb4e4e] font-medium hover:opacity-80 transition-opacity duration-200"
                          >
                            {event.registration}
                          </a>
                        ) : (
                          <div>{event.registration}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className={`border-t transition-all duration-500 ${!openSections[monthYear] ? "mt-0" : "mt-8"}`}
              ></div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
