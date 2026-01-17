import Link from 'next/link'

interface FeatureCardProps {
  title: string
  description: string
  href: string
  icon?: React.ReactNode
}

export default function FeatureCard({ title, description, href, icon }: FeatureCardProps) {
  return (
    <Link href={href}>
      <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
        {icon && <div className="mb-4">{icon}</div>}
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  )
}
