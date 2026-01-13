import { ProjectDetailClient } from './client';

// Generate static params for export
export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ];
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  return <ProjectDetailClient />;
}
