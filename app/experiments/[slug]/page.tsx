import ExperimentClient from './ExperimentClient'
import { notFound } from 'next/navigation'

const experiments = [
  {
    title: "Morning Light",
    description: "A study of how natural light transforms spaces throughout the day.",
    image: "/images/experiments/morning-light.jpg",
    slug: "morning-light",
    content: [
      {
        type: "paragraph",
        text: "This experiment explores the dynamic relationship between natural light and architectural spaces throughout the day. By documenting the subtle changes in light quality, intensity, and direction, we gain insights into how these elements shape our perception of space and time."
      },
      {
        type: "paragraph",
        text: "The study focuses on specific moments of transition - dawn, midday, and dusk - capturing how light interacts with different materials, surfaces, and spatial configurations. These observations inform our understanding of how to design spaces that respond sensitively to natural light patterns."
      }
    ]
  },
  {
    title: "Water Surface",
    description: "Exploring the dynamic patterns and reflections created by water surfaces.",
    image: "/images/experiments/water-surface.jpg",
    slug: "water-surface",
    content: [
      {
        type: "paragraph",
        text: "Water surfaces serve as dynamic canvases that reflect and transform their surroundings. This experiment examines how water interacts with light, wind, and environmental elements to create ever-changing patterns and compositions."
      },
      {
        type: "paragraph",
        text: "Through careful observation and documentation, we study the ephemeral nature of these patterns and their potential applications in design. The findings contribute to our understanding of how to incorporate dynamic, responsive elements into architectural and product design."
      }
    ]
  },
  {
    title: "Shadow Compositions",
    description: "Investigating the interplay of light and shadow in architectural spaces.",
    image: "/images/experiments/shadow-compositions.jpg",
    slug: "shadow-compositions",
    content: [
      {
        type: "paragraph",
        text: "Shadows are not merely the absence of light, but active elements that define space and create atmosphere. This experiment investigates how shadows can be designed and manipulated to enhance spatial experience and create meaningful compositions."
      },
      {
        type: "paragraph",
        text: "By studying the relationship between light sources, objects, and their resulting shadows, we develop strategies for incorporating shadow as a deliberate design element. These insights inform our approach to creating spaces that engage with natural and artificial light in thoughtful ways."
      }
    ]
  },
  {
    title: "Weathered Wood",
    description: "Documenting the natural aging process and patina of wooden surfaces.",
    image: "/images/experiments/weathered-wood.jpg",
    slug: "weathered-wood",
    content: [
      {
        type: "paragraph",
        text: "Wood, as a natural material, undergoes continuous transformation through exposure to environmental elements. This experiment documents the aging process of various wood species, examining how time and weather create unique patterns and textures."
      },
      {
        type: "paragraph",
        text: "The study considers both the aesthetic and functional implications of weathering, exploring how these natural processes can be anticipated and incorporated into design decisions. These observations help us develop strategies for working with wood that embrace its dynamic nature."
      }
    ]
  },
  {
    title: "Urban Negative Spaces",
    description: "Examining the overlooked voids and gaps in urban environments.",
    image: "/images/experiments/urban-negative-spaces.jpg",
    slug: "urban-negative-spaces",
    content: [
      {
        type: "paragraph",
        text: "Negative spaces in urban environments - the gaps between buildings, under bridges, and in forgotten corners - often go unnoticed. This experiment brings attention to these spaces, examining their potential as sites for intervention and transformation."
      },
      {
        type: "paragraph",
        text: "Through careful documentation and analysis, we explore how these spaces can be reimagined and activated. The findings contribute to our understanding of how to work with existing urban conditions to create meaningful public spaces and experiences."
      }
    ]
  },
  {
    title: "Condensation Patterns",
    description: "Capturing the ephemeral beauty of condensation on various surfaces.",
    image: "/images/experiments/condensation-patterns.jpg",
    slug: "condensation-patterns",
    content: [
      {
        type: "paragraph",
        text: "Condensation creates temporary, delicate patterns that reveal the interaction between temperature, humidity, and surface materials. This experiment documents these ephemeral formations, studying their aesthetic qualities and potential applications in design."
      },
      {
        type: "paragraph",
        text: "By examining how different materials and surface treatments affect condensation patterns, we develop insights into creating surfaces that respond to environmental conditions in visually interesting ways. These findings inform our approach to designing responsive, dynamic environments."
      }
    ]
  }
]

export function generateStaticParams() {
  return experiments.map((experiment) => ({
    slug: experiment.slug,
  }))
}

export default function ExperimentPage({ params }: { params: { slug: string } }) {
  const experiment = experiments.find((exp) => exp.slug === params.slug)
  if (!experiment) {
    notFound()
  }
  return <ExperimentClient experiment={experiment} />
} 