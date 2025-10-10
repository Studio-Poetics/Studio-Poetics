import type React from "react"
import JournalArticleClient from "./client"

// To add or edit journal articles, modify this array:
// - Add a new object for each article
// - Each article needs: slug, title, date, category, excerpt, image, and content
// - The slug should be URL-friendly (lowercase, hyphens for spaces)
// - Make sure each slug is unique
const journalArticles = [
  {
    slug: "gentle-future-interfaces",
    title: "The Gentle Future of Digital Interfaces",
    date: "March 15, 2024",
    category: "Design",
    excerpt: "Exploring how minimalism and thoughtful design can create calming digital experiences that respect our attention and well-being.",
    image: "/gentle-future.png",
    content: [
      {
        type: "paragraph",
        text: "Lately, I've found myself more sensitive to the ways screens speak to us. Some shout. Others whisper. Most just hum along, quietly demanding attention. But every now and then, I come across a digital experience that feels… calm. Thoughtful. Almost tender in its presence. And it makes me wonder—what if our interfaces could feel less like tools and more like companions?"
      },
      {
        type: "subheading",
        text: "A Space to Breathe"
      },
      {
        type: "paragraph",
        text: "When I speak of 'gentle interfaces,' I don't mean simply minimal ones. There's a difference. Minimalism often reduces, pares down, simplifies. But gentleness brings with it a kind of care. A softness. It invites rather than instructs."
      },
      {
        type: "paragraph",
        text: "In my own work—or even when I use apps that feel well-considered—I've noticed how much silence matters. Not just in sound, but in visual quiet. Ample spacing. Muted tones. Type that doesn't rush to be read, but settles on the screen like breath. These choices don't scream 'design.' They simply make space for the user to arrive, to pause, to feel welcomed."
      },
      {
        type: "subheading",
        text: "Design That Listens"
      },
      {
        type: "paragraph",
        text: "There's something almost musical about a well-paced interface. The rhythm of transitions, the subtle feedback of a button, the way content unfolds gradually—it all creates a sense of being listened to. I don't want to be overwhelmed by features; I want to discover them, gently, at my own pace."
      },
      {
        type: "paragraph",
        text: "Sometimes, that means resisting the urge to fill every inch with information. Other times, it means adding just the right motion—enough to feel alive, not enough to distract. This is the quiet choreography of thoughtful design. And while it might not win immediate attention, it builds a lasting sense of trust."
      },
      {
        type: "subheading",
        text: "Kindness, Embedded"
      },
      {
        type: "paragraph",
        text: "To design gently is, in a way, to practice empathy. I think of a user not just as someone trying to do something, but someone who may be tired, distracted, overstimulated. The interface should not be another demand on their attention. It should be a place of ease."
      },
      {
        type: "paragraph",
        text: "When I build or critique digital tools, I ask: does this interaction feel respectful? Could it be softer? Can I reduce friction without reducing meaning? These aren't aesthetic questions alone—they're ethical ones. I believe good design today must care for our cognitive load as much as our visual taste."
      },
      {
        type: "subheading",
        text: "A Gentle Horizon"
      },
      {
        type: "paragraph",
        text: "I don't think gentleness is opposed to innovation. If anything, it's a radical shift—away from noise, toward presence. It challenges us to slow down, to make less but mean more. It values rhythm over reach, clarity over control."
      },
      {
        type: "paragraph",
        text: "There's still so much to explore. But perhaps the future of digital interfaces isn't about more intelligence or more immediacy—it's about more stillness. More warmth. Interfaces that don't just work, but feel right."
      },
      {
        type: "paragraph",
        text: "That, to me, is a future worth designing for."
      }
    ]
  },
  {
    slug: "technology-with-empathy",
    title: "Building Technology with Empathy",
    date: "March 10, 2024",
    category: "Technology",
    excerpt: "We create technology that serves people—not the other way around.",
    image: "/empathy.png",
    content: [
      {
        type: "paragraph",
        text: "Somewhere along the way, we stopped asking why we build and began asking only how fast. Somewhere along the way, technology slipped out of our hands and became something we chase—endlessly, breathlessly, often without pause."
      },
      {
        type: "paragraph",
        text: "I've noticed this subtle, painful shift. Technology, once a tool, has become a master. Our screens tell us when to wake, where to go, what to want. And many of the people building these systems—brilliant, ambitious, well-funded—seem to wear a particular badge of honor: make something people can't live without."
      },
      {
        type: "paragraph",
        text: "It's a strange metric of success: not to improve life, but to make oneself indispensable to it. Not to build for people, but to bind them."
      },
      {
        type: "paragraph",
        text: "This is where empathy disappears."
      },
      {
        type: "subheading",
        text: "1. Designing With, Not For"
      },
      {
        type: "paragraph",
        text: "Empathy begins by stepping outside our own brilliance. It asks us to listen—not only to what people say, but to what they feel, what they avoid, what they need but cannot name."
      },
      {
        type: "paragraph",
        text: "When we design with empathy, we stop treating users as endpoints. We begin to see them as collaborators. The interface becomes a conversation, not a funnel. The product becomes an invitation, not a prescription."
      },
      {
        type: "paragraph",
        text: "In our work, we often ask simple questions: Does this reduce anxiety? Does it leave room for rest? Does it honour the user's time, body, attention?"
      },
      {
        type: "paragraph",
        text: "Sometimes the answers are uncomfortable. But they always guide us toward something better."
      },
      {
        type: "subheading",
        text: "2. Resisting the Addiction Model"
      },
      {
        type: "paragraph",
        text: "A great deal of modern tech design is based on behavior loops: metrics, nudges, habits, clicks. These loops often work too well. They pull people in and don't let go."
      },
      {
        type: "paragraph",
        text: "This isn't accidental. It's deliberate. The goal is 'engagement'—not meaning, not joy, not usefulness. Just time spent."
      },
      {
        type: "paragraph",
        text: "But empathy refuses this logic. Empathy respects boundaries. It builds tools that know when to step aside. We try to design systems that respect the off-switch. That don't punish you for logging out. That don't manipulate you into returning."
      },
      {
        type: "paragraph",
        text: "This isn't less ambitious. It's more humane."
      },
      {
        type: "subheading",
        text: "3. Technology as a Guest, Not a Host"
      },
      {
        type: "paragraph",
        text: "Imagine technology not as architecture, but as furniture. Not something that dictates the shape of our lives, but something that fits gently into it."
      },
      {
        type: "paragraph",
        text: "I like this metaphor. It reminds me that tech should adapt to humans—not the other way around. The chair does not demand how we sit. The lamp does not insist on how we see."
      },
      {
        type: "paragraph",
        text: "Empathetic technology feels like that: quiet, helpful, respectful. It waits until needed. It asks nothing in return. It enhances, but does not overtake."
      },
      {
        type: "subheading",
        text: "4. Against the Tyranny of Metrics"
      },
      {
        type: "paragraph",
        text: "So many founders, especially in tech, talk about scale, stickiness, virality. They speak the language of empire, not empathy. They want users, not individuals. Growth, not impact. And more often than not, they end up building systems that extract rather than nourish."
      },
      {
        type: "paragraph",
        text: "But what if success looked different?"
      },
      {
        type: "paragraph",
        text: "What if success meant a mother could breathe easier? A teenager could feel seen? A neighborhood could share more, worry less?"
      },
      {
        type: "paragraph",
        text: "These are soft metrics—hard to chart, harder to sell. But they are real. They are the kind of metrics that matter, even if they never appear on a pitch deck."
      },
      {
        type: "subheading",
        text: "5. Empathy as Infrastructure"
      },
      {
        type: "paragraph",
        text: "To build technology with empathy is not just about aesthetics or interface polish. It's about how things are structured underneath. It's about power, ownership, agency. It's about who gets to decide, who gets to speak, who gets to leave."
      },
      {
        type: "paragraph",
        text: "Empathy lives in defaults. In permission settings. In how data is stored, who it is shared with, and how easily someone can opt out. It lives in the small choices that determine the big outcomes."
      },
      {
        type: "paragraph",
        text: "It's slow work. Sometimes invisible work. But it's the kind of work we believe in."
      },
      {
        type: "subheading",
        text: "A Technology That Can Be Forgotten"
      },
      {
        type: "paragraph",
        text: "There's a quiet dignity in creating something that doesn't want attention. A technology that can be forgotten because it works so well, so gently, that it fades into the background of a better life."
      },
      {
        type: "paragraph",
        text: "We want to build more of that."
      },
      {
        type: "paragraph",
        text: "Not technologies that claim your time, but ones that return it. Not platforms that trap, but ones that open. Not inventions that enslave, but ones that liberate."
      },
      {
        type: "paragraph",
        text: "This is what it means, for us, to build with empathy."
      },
      {
        type: "paragraph",
        text: "Written from the studio\nWhere we believe technology should serve the human spirit—not consume it."
      }
    ]
  },
  {
    slug: "blockchain-as-design-material",
    title: "Blockchain as a Design Material",
    date: "March 5, 2024",
    category: "Technology",
    excerpt: "Understanding how blockchain can be approached as a material with unique, conceptual properties.",
    image: "/blockchain-as-amaterial.png",
    content: [
      {
        type: "paragraph",
        text: "When I first encountered blockchain, I didn't see code or finance. I saw form. Not form as in shape, but as in structure—a set of constraints and affordances that could be shaped into something meaningful."
      },
      {
        type: "paragraph",
        text: "As a designer, I've learned to feel the grain of materials: how paper folds, how wood responds to humidity, how light bends around curves. Blockchain, too, has a grain. It's not tactile, but it's there—in its logic, its transparency, its resistance to change."
      },
      {
        type: "paragraph",
        text: "And like any material, once you understand how it behaves, you can begin to design with it, not just on top of it."
      },
      {
        type: "subheading",
        text: "1. Immutability Has Weight"
      },
      {
        type: "paragraph",
        text: "Working with blockchain feels like working with stone. Once something is etched, it stays. It doesn't forget. Every action, every transaction becomes a block in a chain that cannot be undone. This isn't just about permanence—it's about responsibility."
      },
      {
        type: "paragraph",
        text: "When I think of blockchain as a design material, this immutability becomes a kind of weight. It slows you down. It makes you consider the consequences of each input. You're not just prototyping anymore; you're making a pact."
      },
      {
        type: "paragraph",
        text: "It's a material that demands care."
      },
      {
        type: "subheading",
        text: "2. Trust Is Designed Differently"
      },
      {
        type: "paragraph",
        text: "I've always been fascinated by how we design for trust—whether it's the reassuring click of a closing latch, or the consistency of a visual system. Blockchain challenges this. It doesn't rely on central authority or branding. Instead, it distributes trust, embeds it in protocol, exposes the mechanics."
      },
      {
        type: "paragraph",
        text: "Designing in this space means moving from interface to infrastructure. You're not just making something look trustworthy—you're showing how it works. You let the user see the gears turning. Transparency isn't just ethical here; it's functional."
      },
      {
        type: "paragraph",
        text: "It's a strange kind of beauty: a system that's honest by design."
      },
      {
        type: "subheading",
        text: "3. Time Isn't Linear Anymore"
      },
      {
        type: "paragraph",
        text: "In most materials, time is something you battle—degradation, fading, wear. With blockchain, time becomes something you design. It moves forward in blocks, not seconds. You can set things to unlock in the future, respond to cumulative events, or remain dormant unless triggered by consensus."
      },
      {
        type: "paragraph",
        text: "This fascinated me. The idea that time could be programmed like clay shaped by gesture. You're no longer just designing interactions—you're designing temporal behaviors."
      },
      {
        type: "paragraph",
        text: "It opens up a poetic space. A contract that ripens. A message that waits. A memory that only reveals itself when it's needed."
      },
      {
        type: "subheading",
        text: "4. Decentralization is a Kind of Texture"
      },
      {
        type: "paragraph",
        text: "Most systems want to be smooth—centralized, controlled, easy to navigate. Blockchain doesn't work that way. It's messy, distributed, layered with redundancies. But in that mess, there's a kind of texture I've come to appreciate."
      },
      {
        type: "paragraph",
        text: "To design for decentralization is to let go of control. You're setting up conditions, protocols, and then stepping back to let a system evolve. It's like planting seeds instead of drawing blueprints. You don't get to predict everything—but that's part of the power."
      },
      {
        type: "paragraph",
        text: "This turns users into participants, contributors, even co-owners. It's design as choreography, not command."
      },
      {
        type: "subheading",
        text: "5. Material Honesty Still Applies"
      },
      {
        type: "paragraph",
        text: "I believe in designing with honesty. You don't ask bamboo to behave like steel. You don't force clay to keep its corners. Blockchain, too, demands to be treated on its own terms."
      },
      {
        type: "paragraph",
        text: "It's not fast. It's not lightweight. It doesn't do well with gray areas or reversals. But it is secure. It is public. It is communal."
      },
      {
        type: "paragraph",
        text: "The temptation is to use blockchain where it's not needed—just because it's novel. But to work with it meaningfully is to ask: what is this material good for? What can only be done in this way? What becomes possible when permanence, transparency, and collective verification are your base layer?"
      },
      {
        type: "subheading",
        text: "Toward a Poetics of Infrastructure"
      },
      {
        type: "paragraph",
        text: "Reading Kenya Hara taught me that materials aren't just things we use—they are things we see through. They shape not just what we make, but how we think. Blockchain, for me, is one of those materials."
      },
      {
        type: "paragraph",
        text: "It's not just a tool for finance or control. It's a way to structure memory, participation, and meaning."
      },
      {
        type: "paragraph",
        text: "And maybe, just maybe, it's a new kind of poetic infrastructure—one we're only beginning to understand."
      }
    ]
  },
  {
    slug: "playful-learning-digital-spaces",
    title: "Playful Learning in Digital Spaces",
    date: "September 15, 2024",
    category: "Education & Games",
    excerpt: "How can we design digital environments that foster curiosity and joy in learning? This exploration examines the intersection of game design principles and educational technology, proposing new models for engaging digital experiences.",
    image: "/playful-future.png",
    content: [
      {
        type: "paragraph",
        text: "There's something magical that happens when learning feels like play. I've watched children lose themselves in a game for hours, mastering complex rules, strategizing, failing and trying again—all with an enthusiasm that formal education often struggles to capture. What if we could design digital learning environments that harness this natural curiosity and joy?"
      },
      {
        type: "subheading",
        text: "The Alchemy of Play and Learning"
      },
      {
        type: "paragraph",
        text: "Play isn't the opposite of serious learning—it's one of its most powerful catalysts. When we play, we experiment without fear of judgment. We take risks because the stakes feel manageable. We persist through challenges because the process itself is rewarding."
      },
      {
        type: "paragraph",
        text: "In digital spaces, this translates to environments where exploration is encouraged, where failure is reframed as iteration, and where discovery feels like adventure rather than assignment. The challenge isn't making learning fun—it's designing experiences where the learning emerges naturally from the play."
      },
      {
        type: "subheading",
        text: "Beyond Gamification: Authentic Play Experiences"
      },
      {
        type: "paragraph",
        text: "Too often, educational technology falls into the trap of gamification—adding points, badges, and leaderboards to existing content and calling it playful. But true playful learning runs deeper. It's about creating systems where the core mechanics of the experience are inherently engaging."
      },
      {
        type: "paragraph",
        text: "Instead of rewarding completion, we can design for discovery. Instead of measuring speed, we can celebrate creativity. Instead of standardized paths, we can create spaces for personal exploration and meaning-making."
      },
      {
        type: "subheading",
        text: "Designing for Different Types of Play"
      },
      {
        type: "paragraph",
        text: "Not all play is the same, and not all learners are motivated by the same types of experiences. Some find joy in solving puzzles and mastering systems. Others prefer social collaboration and shared storytelling. Still others are drawn to creative expression and open-ended exploration."
      },
      {
        type: "paragraph",
        text: "Effective playful learning environments offer multiple pathways—spaces where different types of players can find their own sources of engagement while still moving toward shared learning goals. This might mean offering both competitive challenges and collaborative projects, both structured activities and open sandboxes."
      },
      {
        type: "subheading",
        text: "The Role of Agency in Digital Learning"
      },
      {
        type: "paragraph",
        text: "One of the most powerful aspects of play is the sense of agency it provides. Players make meaningful choices that affect their experience. They have control over their journey, their strategies, their pace of engagement."
      },
      {
        type: "paragraph",
        text: "Digital learning environments can amplify this agency in ways that traditional classrooms struggle to achieve. Learners can choose their own paths through content, set their own goals, and even modify the rules of their experience. This sense of ownership transforms passive consumption into active participation."
      },
      {
        type: "subheading",
        text: "Creating Safe Spaces for Risk-Taking"
      },
      {
        type: "paragraph",
        text: "Play requires psychological safety—the freedom to experiment without serious consequences. In learning contexts, this means creating environments where mistakes are not just tolerated but celebrated as part of the discovery process."
      },
      {
        type: "paragraph",
        text: "Digital spaces can offer unique advantages here. They can provide immediate, low-stakes feedback. They can offer unlimited 'lives' or attempts. They can create parallel universes where learners can test hypotheses without real-world repercussions."
      },
      {
        type: "subheading",
        text: "Community and Collaboration in Playful Learning"
      },
      {
        type: "paragraph",
        text: "Some of the most powerful learning happens in community. When players share discoveries, teach each other strategies, and collaborate on challenges, they're not just learning content—they're developing social and communication skills."
      },
      {
        type: "paragraph",
        text: "Digital learning environments can facilitate these connections in thoughtful ways, creating opportunities for peer mentoring, collaborative problem-solving, and shared celebration of achievements. The goal isn't just individual mastery, but collective growth."
      },
      {
        type: "subheading",
        text: "Balancing Structure and Freedom"
      },
      {
        type: "paragraph",
        text: "Effective playful learning requires a delicate balance. Too much structure and the experience feels constraining. Too little and learners may feel overwhelmed or directionless."
      },
      {
        type: "paragraph",
        text: "The art is in designing what we might call 'productive constraints'—frameworks that provide enough guidance to be helpful while leaving room for personal exploration and creativity. This might mean offering clear objectives while allowing multiple paths to achieve them, or providing tools and resources while letting learners decide how to use them."
      },
      {
        type: "subheading",
        text: "Toward Joyful Learning Futures"
      },
      {
        type: "paragraph",
        text: "As we design the future of digital learning, we have an opportunity to move beyond the industrial model of education toward something more human, more joyful, more aligned with how we naturally learn and grow."
      },
      {
        type: "paragraph",
        text: "This doesn't mean making everything a game, but rather recognizing that the best learning experiences share many qualities with the best play experiences: they're engaging, voluntary, intrinsically motivated, and personally meaningful."
      },
      {
        type: "paragraph",
        text: "In digital spaces, we can create environments that honor the learner's curiosity, agency, and joy. We can design for wonder, discovery, and authentic engagement. We can build tools that don't just deliver content, but nurture the human capacity for growth and understanding."
      },
      {
        type: "paragraph",
        text: "That's the kind of future worth playing toward."
      }
    ]
  },
  {
    slug: "ethics-persuasive-design",
    title: "The Ethics of Persuasive Design",
    date: "August 20, 2024",
    category: "Design Ethics",
    excerpt: "As designers, we wield significant influence over user behavior. This piece examines our responsibility to create ethical persuasion patterns that respect user autonomy while achieving business goals, proposing frameworks for more conscious design decisions.",
    image: "/ethics.png",
    content: [
      {
        type: "paragraph",
        text: "Every interface is an argument. Every button placement, color choice, and animation is making a case for a particular action. As designers, we're not just creating aesthetics—we're shaping behavior, influencing decisions, and ultimately affecting how people live their digital lives."
      },
      {
        type: "paragraph",
        text: "This power comes with profound responsibility. The question isn't whether our designs persuade—they inevitably do. The question is whether they persuade ethically."
      },
      {
        type: "subheading",
        text: "The Spectrum of Persuasion"
      },
      {
        type: "paragraph",
        text: "Not all persuasion is manipulation. There's a meaningful difference between guiding users toward choices that serve their interests and exploiting psychological vulnerabilities for profit. The challenge is learning to recognize where we fall on this spectrum and consciously choosing the ethical path."
      },
      {
        type: "paragraph",
        text: "Ethical persuasion aligns user interests with business goals. It helps people accomplish what they came to do more effectively. It respects their time, attention, and autonomy. Manipulative design, by contrast, prioritizes business metrics over user wellbeing, often leading people to make choices they later regret."
      },
      {
        type: "subheading",
        text: "Dark Patterns and Their Impact"
      },
      {
        type: "paragraph",
        text: "Dark patterns—design techniques that trick users into unintended actions—have become disturbingly common. From hidden unsubscribe links to sneaky auto-renewals, from fake urgency to friend spam, these patterns exploit cognitive biases and erode trust."
      },
      {
        type: "paragraph",
        text: "The immediate business results might seem positive, but the long-term costs are significant: reduced user trust, negative brand perception, and potential legal consequences. More importantly, they contribute to a digital ecosystem where users must constantly guard against deception."
      },
      {
        type: "subheading",
        text: "The Responsibility of Choice Architecture"
      },
      {
        type: "paragraph",
        text: "Every interface is a form of choice architecture—it shapes the context in which users make decisions. Default settings, option ordering, visual prominence, and timing all influence outcomes, often more powerfully than the content itself."
      },
      {
        type: "paragraph",
        text: "With this influence comes responsibility. Are we designing defaults that serve user interests or just business interests? Are we presenting choices clearly and honestly? Are we giving users the information they need to make informed decisions?"
      },
      {
        type: "subheading",
        text: "Consent in the Age of Data"
      },
      {
        type: "paragraph",
        text: "Nowhere is ethical design more critical than in how we handle user data and privacy. The standard approach—lengthy legal documents and broad consent requests—often fails to provide meaningful choice or understanding."
      },
      {
        type: "paragraph",
        text: "Ethical data design means making privacy settings accessible and understandable. It means asking for consent at the moment it's relevant, not bundling everything together. It means designing for informed choice, not just legal compliance."
      },
      {
        type: "subheading",
        text: "The Attention Economy and Respect"
      },
      {
        type: "paragraph",
        text: "In an attention economy, our designs compete for one of the most precious resources: human attention. This creates pressure to make interfaces more engaging, more addictive, more difficult to leave."
      },
      {
        type: "paragraph",
        text: "But what if we designed for respect rather than retention? What if success meant helping users accomplish their goals efficiently and then stepping aside? This requires redefining metrics and success indicators, but it builds deeper trust and more sustainable relationships."
      },
      {
        type: "subheading",
        text: "Building Ethical Design Practices"
      },
      {
        type: "paragraph",
        text: "Creating ethical persuasive design requires intentional practice and systems. This might include regular ethics reviews, diverse team perspectives, user advocacy roles, and metrics that measure user wellbeing alongside business performance."
      },
      {
        type: "paragraph",
        text: "It also requires asking difficult questions: Who benefits from this design decision? What are the potential negative consequences? How might vulnerable users be affected? Are we being transparent about our intentions?"
      },
      {
        type: "subheading",
        text: "Transparency as a Design Principle"
      },
      {
        type: "paragraph",
        text: "One of the most powerful tools for ethical persuasion is transparency. When users understand how a system works, what data is being collected, and why certain recommendations are made, they can make more informed choices."
      },
      {
        type: "paragraph",
        text: "This doesn't mean overwhelming users with technical details, but rather finding ways to communicate clearly about the logic behind our designs. Transparency builds trust and enables genuine consent."
      },
      {
        type: "subheading",
        text: "The Long View of Design Ethics"
      },
      {
        type: "paragraph",
        text: "Ethical design isn't just about avoiding harm—it's about actively contributing to human flourishing. It's about creating digital experiences that enhance rather than exploit, that empower rather than manipulate, that respect the humanity of every user."
      },
      {
        type: "paragraph",
        text: "This requires courage. It means sometimes saying no to features that might boost short-term metrics but harm long-term relationships. It means advocating for user interests even when they conflict with immediate business goals."
      },
      {
        type: "subheading",
        text: "A Framework for Ethical Decision-Making"
      },
      {
        type: "paragraph",
        text: "As we design, we can ask ourselves: Does this feature serve the user's expressed goals? Are we being transparent about how it works? Would we be comfortable if everyone knew about this design choice? Does it respect user autonomy and dignity?"
      },
      {
        type: "paragraph",
        text: "These questions don't always have easy answers, but they help us stay conscious of our impact and intentional about our choices. They remind us that every design decision is also an ethical decision."
      },
      {
        type: "paragraph",
        text: "The future of digital interaction depends on designers who see themselves not just as problem solvers, but as stewards of human agency in digital spaces. That's both a tremendous responsibility and an incredible opportunity to shape a more ethical digital world."
      }
    ]
  },
  // Example of how to add a new article:
  // {
  //   slug: "your-new-article",
  //   title: "Your Article Title",
  //   date: "March 20, 2024",
  //   category: "Your Category",
  //   excerpt: "Your article excerpt goes here...",
  //   image: "/path/to/your/image.jpg",
  // },
]

// Generate static params for all journal articles
export async function generateStaticParams() {
  return journalArticles.map((article) => ({
    slug: article.slug,
  }))
}

export default function JournalArticle({ params }: { params: { slug: string } }) {
  const article = journalArticles.find((article) => article.slug === params.slug)

  if (!article) {
    return <div>Article not found</div>
  }

  return <JournalArticleClient article={article} />
}
