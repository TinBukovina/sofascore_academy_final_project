import React from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const playerId = resolvedParams.id;

  return <div>page</div>;
}
