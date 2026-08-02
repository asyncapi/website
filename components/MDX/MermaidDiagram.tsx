'use client';

import mermaid from 'mermaid';
import React, { useEffect, useState } from 'react';

type MermaidTheme = 'light' | 'dark';

const MERMAID_THEME_VARIABLES: Record<MermaidTheme, Record<string, string>> = {
  light: {
    primaryColor: '#EDFAFF',
    primaryBorderColor: '#47BCEE',
    secondaryColor: '#F4EFFC',
    secondaryBorderColor: '#875AE2',
    fontFamily: 'Inter, sans-serif',
    fontSize: '18px',
    primaryTextColor: '#242929',
    tertiaryColor: '#F7F9FA',
    tertiaryBorderColor: '#BFC6C7',
    lineColor: '#BFC6C7',
    mainBkg: '#EDFAFF',
    secondBkg: '#F4EFFC',
    tertiaryBkg: '#F7F9FA',
    clusterBkg: '#F7F9FA',
    clusterBorder: '#BFC6C7',
    edgeLabelBackground: '#FFFFFF'
  },
  dark: {
    primaryColor: '#1E293B',
    primaryBorderColor: '#38BDF8',
    secondaryColor: '#2E2459',
    secondaryBorderColor: '#A87EFC',
    fontFamily: 'Inter, sans-serif',
    fontSize: '18px',
    primaryTextColor: '#F8FAFC',
    tertiaryColor: '#121825',
    tertiaryBorderColor: '#475569',
    lineColor: '#94A3B8',
    mainBkg: '#1E293B',
    secondBkg: '#2E2459',
    tertiaryBkg: '#121825',
    clusterBkg: '#121825',
    clusterBorder: '#475569',
    edgeLabelBackground: '#1E293B'
  }
};

// Cache the theme Mermaid was initialized with across client-side page transitions.
let initializedMermaidTheme: MermaidTheme | null = null;

/**
 * @description Returns the Mermaid theme that matches the current website theme.
 */
function getMermaidTheme(): MermaidTheme {
  if (typeof document === 'undefined') {
    return 'light';
  }

  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

/**
 * @description Initializes the Mermaid library for the selected theme.
 */
function initializeMermaid(theme: MermaidTheme) {
  if (initializedMermaidTheme === theme) {
    return;
  }

  initializedMermaidTheme = theme;
  mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    // Keep Mermaid styling fully controlled by MERMAID_THEME_VARIABLES.
    themeCSS: '',
    themeVariables: MERMAID_THEME_VARIABLES[theme]
  });
}

let currentId = 0;

/**
 * @description Generates a unique identifier.
 * @returns {string} - A unique identifier.
 */
const uuid = (): string => `mermaid-${(currentId++).toString()}`;

interface MermaidDiagramProps {
  graph: string;
}

/**
 * @description This component renders Mermaid diagrams.
 * Extracted from MDX.tsx to enable lazy-loading via next/dynamic,
 * removing ~1.5 MB of Mermaid from the initial JavaScript bundle
 * on pages that don't contain diagrams.
 *
 * @param {MermaidDiagramProps} props - The props for the MermaidDiagram component.
 * @param {string} props.graph - The Mermaid graph to render.
 */
function MermaidDiagram({ graph }: Readonly<MermaidDiagramProps>) {
  const [svg, setSvg] = useState<string | null>(null);
  const [theme, setTheme] = useState<MermaidTheme>('light');

  useEffect(() => {
    setTheme(getMermaidTheme());

    const observer = new MutationObserver(() => {
      setTheme(getMermaidTheme());
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  /**
   * @description Renders the Mermaid diagram.
   */
  useEffect(() => {
    let mounted = true;

    if (graph) {
      try {
        initializeMermaid(theme);
        mermaid.mermaidAPI.render(uuid(), graph.trim(), (svgGraph) => {
          if (mounted) {
            setSvg(svgGraph);
          }
        });
      } catch (e) {
        if (mounted) {
          setSvg(null);
        }
        // eslint-disable-next-line no-console
        console.error(e);
      }
    } else {
      setSvg(null);
    }

    return () => {
      mounted = false;
    };
  }, [graph, theme]);

  return <div dangerouslySetInnerHTML={{ __html: svg || '' }} />;
}

// Named export mirrors the original inline component name in MDX.tsx.
// Default export required by next/dynamic.
export { MermaidDiagram };
export default MermaidDiagram;
