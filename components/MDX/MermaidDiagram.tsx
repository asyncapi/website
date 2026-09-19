import DOMPurify from 'dompurify';
import { useEffect, useId, useState } from 'react';

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

// Tracks the theme Mermaid was last initialized with to skip redundant re-initialization.
let initializedMermaidTheme: MermaidTheme | null = null;

/**
 * @description Returns the Mermaid theme matching the current website theme.
 */
function getMermaidTheme(): MermaidTheme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

interface MermaidDiagramProps {
  graph: string;
}

/**
 * @description Renders a Mermaid diagram from a graph definition string.
 *
 * Mermaid is loaded via a dynamic import so it is never included in the
 * initial JS bundle — it is fetched on demand only when a diagram mounts.
 *
 * @param {MermaidDiagramProps} props - Component props.
 * @param {string} props.graph - Mermaid graph definition to render.
 */
export default function MermaidDiagram({ graph }: Readonly<MermaidDiagramProps>) {
  const [svg, setSvg] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  // Lazy initializer reads the DOM once on mount — avoids a wasted light→correct-theme re-render.
  const [theme, setTheme] = useState<MermaidTheme>(getMermaidTheme);
  const reactId = useId();
  const diagramId = `mermaid${reactId.replaceAll(':', '')}`;

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(getMermaidTheme());
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const trimmedGraph = graph.trim();
    let mounted = true;

    if (trimmedGraph) {
      setHasError(false);

      const render = async () => {
        try {
          const { default: mermaid } = await import('mermaid');

          if (initializedMermaidTheme !== theme) {
            initializedMermaidTheme = theme;
            mermaid.initialize({
              startOnLoad: false,
              theme: 'base',
              securityLevel: 'strict',
              htmlLabels: false,
              themeVariables: MERMAID_THEME_VARIABLES[theme]
            });
          }

          document.getElementById(diagramId)?.remove();

          const { svg: rendered } = await mermaid.render(diagramId, trimmedGraph);
          const sanitized = DOMPurify.sanitize(rendered, {
            USE_PROFILES: { svg: true, svgFilters: true }
          });

          if (mounted) {
            setSvg(sanitized);
          }
        } catch (e) {
          if (mounted) {
            setSvg(null);
            setHasError(true);
          }

          // eslint-disable-next-line no-console
          console.error(e);
        }
      };

      render();
    } else {
      setSvg(null);
      setHasError(false);
    }

    return () => {
      mounted = false;
    };
  }, [graph, theme, diagramId]);

  if (hasError) {
    return <p className='text-red-500 text-sm'>Unable to render the diagram.</p>;
  }

  return <div dangerouslySetInnerHTML={{ __html: svg ?? '' }} />;
}
