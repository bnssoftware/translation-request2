import Link from 'next/link'

export default function ComponentsPage() {
  const components = [
    {
      name: 'Buttons',
      href: '/components/buttons',
      description: 'Various button styles and states',
    },
    {
      name: 'Dialog',
      href: '/components/dialog',
      description: 'Modal dialogs and overlays',
    },
    // Add more components as they are created
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">shadcn/ui Components</h1>
      <p className="text-muted-foreground mb-8">
        Interactive examples of shadcn/ui components in action.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {components.map((component) => (
          <Link
            key={component.name}
            href={component.href}
            className="block p-6 border rounded-lg hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2">{component.name}</h3>
            <p className="text-muted-foreground">{component.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}