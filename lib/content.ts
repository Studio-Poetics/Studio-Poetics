import fs from 'fs'
import path from 'path'

interface Frontmatter {
  title: string
  date: string
  author: string
  image?: string
  excerpt: string
  tags?: string[]
  [key: string]: any
}

interface Content {
  frontmatter: Frontmatter
  content: string
  slug: string
}

/**
 * Parse frontmatter from a text file
 */
function parseFrontmatter(content: string): { frontmatter: Frontmatter; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)

  if (!match) {
    throw new Error('Invalid content format: missing frontmatter')
  }

  const frontmatterStr = match[1]
  const contentStr = match[2]

  // Parse frontmatter
  const frontmatter: Frontmatter = frontmatterStr.split('\n').reduce((acc, line) => {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length) {
      const value = valueParts.join(':').trim()
      // Handle arrays (like tags)
      if (key.trim() === 'tags') {
        // Handle tags specifically
        if (value.startsWith('[') && value.endsWith(']')) {
          acc[key.trim()] = JSON.parse(value)
        } else {
          // If tags is not an array, split by comma and trim each tag
          acc[key.trim()] = value.split(',').map(tag => tag.trim())
        }
      } else if (value.startsWith('[') && value.endsWith(']')) {
        acc[key.trim()] = JSON.parse(value)
      } else {
        acc[key.trim()] = value
      }
    }
    return acc
  }, {} as Frontmatter)

  return { frontmatter, content: contentStr.trim() }
}

/**
 * Get all content files from a directory
 */
export async function getAllContent(directory: string): Promise<Content[]> {
  const contentDir = path.join(process.cwd(), 'content', directory)
  const files = fs.readdirSync(contentDir)
  
  return files
    .filter(file => file.endsWith('.txt'))
    .map(file => {
      const filePath = path.join(contentDir, file)
      const content = fs.readFileSync(filePath, 'utf-8')
      const { frontmatter, content: contentText } = parseFrontmatter(content)
      const slug = file.replace('.txt', '')
      
      return {
        frontmatter,
        content: contentText,
        slug
      }
    })
}

/**
 * Get a specific content file by slug
 */
export async function getContentBySlug(directory: string, slug: string): Promise<Content | null> {
  const filePath = path.join(process.cwd(), 'content', directory, `${slug}.txt`)
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const { frontmatter, content: contentText } = parseFrontmatter(content)
    
    return {
      frontmatter,
      content: contentText,
      slug
    }
  } catch (error) {
    return null
  }
} 