"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic<{
  spec: Record<string, any>;
}>(() => import('swagger-ui-react').then((module) => module.default), { ssr: false });

export default function ApiDoc() {
  const [spec, setSpec] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    async function fetchSpec() {
      const response = await fetch('/api/swagger');
      const data = await response.json();
      setSpec(data);
    }

    fetchSpec();
  }, []);

  if (!spec) {
    return <div>Loading...</div>;
  }

  return <SwaggerUI spec={spec} />;
}

