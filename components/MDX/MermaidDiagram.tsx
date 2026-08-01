'use client';

import { useEffect, useRef } from 'react';
import mermaidAPI from 'mermaid';
import type { CSSProperties } from 'react';

interface MermaidDiagramProps {
  chart: string;
  id?: string;
  style?: CSSProperties;
  className?: string;
}

// Security: sanitize diagram content for safe rendering
const sanitizeDiagram = (code: string): string => {
  // Strip <script> tags and event handlers to prevent XSS
  return code
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/\bon\w+\s*=/gi, 'data-blocked=');
};

const getMermaidThemeVariables = (isDark: boolean) => ({
  darkMode: isDark,
  theme: isDark ? 'dark' : 'default',
  themeVariables: isDark
    ? {
        primaryColor: '#4a9eff',
        primaryTextColor: '#f0f0f0',
        primaryBorderColor: '#555',
        lineColor: '#aaa',
        secondaryColor: '#2d2d2d',
        tertiaryColor: '#1a1a1a',
      }
    : {
        primaryColor: '#2b6cb0',
        primaryTextColor: '#333',
        primaryBorderColor: '#ccc',
        lineColor: '#666',
        secondaryColor: '#f5f5f5',
        tertiaryColor: '#e8e8e8',
      },
});

export default function MermaidDiagram({
  chart,
  id = 'mermaid-diagram',
  style,
  className,
}: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const renderedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || renderedRef.current) return;

    const isDark =
      typeof window !== 'undefined' &&
      document.documentElement.getAttribute('data-theme') === 'dark';

    const renderDiagram = async () => {
      try {
        const sanitized = sanitizeDiagram(chart);
        const svg = await mermaidAPI.render(`${id}-svg`, sanitized);
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
          renderedRef.current = true;
        }
      } catch (error) {
        if (containerRef.current) {
          containerRef.current.innerHTML = `<pre style="color:red;padding:1rem;border:1px solid red;border-radius:4px;">Mermaid render error: ${error instanceof Error ? error.message : String(error)}</pre>`;
        }
      }
    };

    // Initialize mermaid once
    const initAndRender = async () => {
      mermaidAPI.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        ...getMermaidThemeVariables(isDark),
      });
      await renderDiagram();
    };

    initAndRender();

    // Observe theme changes for light/dark switching
    const observer = new MutationObserver(() => {
      const newIsDark =
        document.documentElement.getAttribute('data-theme') === 'dark';
      mermaidAPI.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        ...getMermaidThemeVariables(newIsDark),
      });
      renderedRef.current = false;
      renderDiagram();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, [chart, id]);

  return (
    <div
      ref={containerRef}
      id={id}
      style={style}
      className={className}
      aria-label="Mermaid diagram"
    />
  );
}
