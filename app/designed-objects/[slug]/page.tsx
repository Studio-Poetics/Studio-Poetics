import { getDesignedObjectBySlug, getAllDesignedObjects } from "@/lib/data"
import { notFound } from "next/navigation"

export default async function DesignedObjectPage({ params }: { params: { slug: string } }) {
  const object = await getDesignedObjectBySlug(params.slug)

  if (!object) {
    notFound()
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">{object.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {object.image && (
            <img src={object.image || "/placeholder.svg"} alt={object.title} className="w-full h-auto rounded-lg" />
          )}
        </div>
        <div>
          <p className="text-lg mb-4">{object.description}</p>
          {object.longDescription && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">About</h2>
              <p>{object.longDescription}</p>
            </div>
          )}
          {object.details && object.details.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Details</h2>
              <ul className="list-disc pl-5">
                {object.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {object.images && object.images.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {object.images.map((image, index) => (
              <img
                key={index}
                src={image || "/placeholder.svg"}
                alt={`${object.title} - Image ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export async function generateStaticParams() {
  // This function is needed for static site generation
  // It should return an array of objects with the slug property
  const objects = await getAllDesignedObjects()
  return objects.map((object) => ({
    slug: object.slug,
  }))
}
