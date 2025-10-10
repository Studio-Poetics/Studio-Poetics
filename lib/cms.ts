import fs from "fs"
import path from "path"
import matter from "gray-matter"

const contentDirectory = path.join(process.cwd(), "content")

/**
 * Get all designed objects from the CMS content files
 */
export function getAllDesignedObjects() {
  const objectsDirectory = path.join(contentDirectory, "designed-objects")
  const filenames = fs.readdirSync(objectsDirectory)

  return filenames.map((filename) => {
    const filePath = path.join(objectsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data } = matter(fileContents)

    return {
      ...data,
      slug: data.slug || filename.replace(/\.md$/, ""),
    }
  })
}

/**
 * Get a specific designed object by slug
 */
export function getDesignedObjectBySlug(slug: string) {
  const objectsDirectory = path.join(contentDirectory, "designed-objects")
  const filenames = fs.readdirSync(objectsDirectory)

  const filename = filenames.find((file) => {
    const filePath = path.join(objectsDirectory, file)
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data } = matter(fileContents)
    return data.slug === slug || file.replace(/\.md$/, "") === slug
  })

  if (!filename) return null

  const filePath = path.join(objectsDirectory, filename)
  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContents)

  return {
    ...data,
    content,
    slug: data.slug || filename.replace(/\.md$/, ""),
  }
}
