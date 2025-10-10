/**
 * Get all designed objects from the JSON data file
 */
export async function getAllDesignedObjects() {
  const data = await import('../content/designed-objects.json')
  return data.objects
}

/**
 * Get a specific designed object by slug
 */
export async function getDesignedObjectBySlug(slug: string) {
  const objects = await getAllDesignedObjects()
  return objects.find((object) => object.slug === slug) || null
}

/**
 * Get all journal entries from the JSON data file
 */
export async function getAllJournalEntries() {
  try {
    const data = await import('../content/journal.json')
    return data.entries || []
  } catch (error) {
    console.error("Error reading journal entries:", error)
    return []
  }
}

/**
 * Get a specific journal entry by slug
 */
export async function getJournalEntryBySlug(slug: string) {
  const entries = await getAllJournalEntries()
  return entries.find((entry) => entry.slug === slug) || null
}

// Add other data fetching functions as needed, all using dynamic imports
