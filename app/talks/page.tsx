"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Play, Pause } from "lucide-react"
import { useState, useRef, useEffect } from "react"

// Audio Player Component
function AudioPlayer({ audioSrc, title }: { audioSrc: string; title: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={audioSrc} preload="metadata" />
      <div className="audio-player-controls">
        <button onClick={togglePlay} className="audio-player-button" aria-label={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <div className="text-sm">{title}</div>
      </div>
      <div className="audio-player-progress">
        <div className="audio-player-progress-bar" style={{ width: `${progressPercentage}%` }}></div>
      </div>
      <div className="audio-player-time">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  )
}

export default function TalksPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <div className="mt-12 mb-8">
        <h1 className="text-5xl font-normal">TALKS & LECTURES</h1>
        <div className="accent-bar"></div>
      </div>

      <div className="border-t border-gray-200 mb-6"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {talks.map((talk, index) => (
          <div key={index} className="border-t pt-4">
            <div className="image-container-rounded aspect-video relative mb-4">
              <Image src={talk.image || "/placeholder.svg"} alt={talk.title} fill className="object-cover" />
            </div>
            <div className="text-xs text-gray-600 mb-1">{talk.category}</div>
            <h3 className="text-xl font-normal mb-2">{talk.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{talk.description}</p>

            {/* Audio Player */}
            <AudioPlayer audioSrc={talk.audioSrc} title={`Listen to "${talk.title}"`} />

            <div className="flex justify-between items-center mt-4">
              <span className="text-xs">{talk.date}</span>
              <Link href={`/talks/${talk.slug}`} className="flex items-center text-sm">
                DETAILS <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Talks Data
const talks = [
  {
    title: "The Aesthetics of Emptiness",
    slug: "aesthetics-of-emptiness",
    category: "Podcast",
    date: "MAY 13, 2023",
    description: "Kenya Hara explores the concept of emptiness as a space of potential in design and everyday life.",
    image: "/placeholder.svg?height=600&width=1000",
    audioSrc: "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3", // Placeholder audio
  },
  {
    title: "Finding Beauty in Everyday Objects",
    slug: "beauty-in-everyday-objects",
    category: "Podcast",
    date: "APRIL 22, 2023",
    description: "A conversation about how design can reveal the poetry in ordinary things.",
    image: "/placeholder.svg?height=600&width=1000",
    audioSrc: "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3", // Placeholder audio
  },
  {
    title: "Material Explorations: Paper and Light",
    slug: "material-explorations",
    category: "Podcast",
    date: "MARCH 15, 2023",
    description: "Documentation of our workshop exploring the relationship between paper and light.",
    image: "/placeholder.svg?height=600&width=1000",
    audioSrc: "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3", // Placeholder audio
  },
  {
    title: "The Philosophy of White Space",
    slug: "philosophy-of-white-space",
    category: "Podcast",
    date: "FEBRUARY 28, 2023",
    description: "An exploration of how emptiness creates meaning in design and architecture.",
    image: "/placeholder.svg?height=600&width=1000",
    audioSrc: "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3", // Placeholder audio
  },
]
