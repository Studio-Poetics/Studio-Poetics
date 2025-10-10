// Replace with a simple static admin page that doesn't require authentication

export default function AdminPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="mb-4">
        This is a static admin dashboard. For content updates, please edit the JSON files directly.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="border p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Content Files</h2>
          <ul className="space-y-2">
            <li>• content/designed-objects.json</li>
            <li>• content/journal.json</li>
            <li>• content/exhibitions.json</li>
            <li>• content/workshops.json</li>
          </ul>
        </div>

        <div className="border p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">How to Update</h2>
          <ol className="space-y-2 list-decimal pl-4">
            <li>Edit the JSON files in the content directory</li>
            <li>Commit and push your changes to GitHub</li>
            <li>The site will automatically rebuild and deploy</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
