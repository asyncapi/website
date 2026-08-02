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

// Cache the theme Mermaid was initialized with across client-side page transitions.
let initializedMermaidTheme: MermaidTheme | null = null;

/**
 * @description Returns the Mermaid theme that matches the current website theme.
 */
function getMermaidTheme(): MermaidTheme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

interface MermaidDiagramProps {
  graph: string;
}

/**
 * @description This component renders Mermaid diagrams.
 *
 * Mermaid is loaded via a dynamic import inside the render effect so it is
 * never included in the initial JS bundle — it is fetched on demand only
 * when a page actually contains a diagram.
 *
 * @param {MermaidDiagramProps} props - The props for the MermaidDiagram component.
 * @param {string} props.graph - The Mermaid graph definition to render.
 */
export default function MermaidDiagram({ graph }: Readonly<MermaidDiagramProps>) {
  const [svg, setSvg] = useState<string | null>(null);
  const [theme, setTheme] = useState<MermaidTheme>('light');
  const reactId = useId();
  // Produce a stable, DOM-safe ID for the SVG element mermaid generates.
  const diagramId = `mermaid${reactId.replace(/:/g, '')}`;

  useEffect(() => {
    setTheme(getMermaidTheme());

    const observer = new MutationObserver(() => {
      setTheme(getMermaidTheme());
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!graph) {
      setSvg(null);

      return;
    }

    let mounted = true;

    async function render() {
      try {
        const { default: mermaid } = await import('mermaid');

        if (initializedMermaidTheme !== theme) {
          initializedMermaidTheme = theme;
          mermaid.initialize({
            startOnLoad: false,
            theme: 'base',
            securityLevel: 'strict',
            // Keep Mermaid styling fully controlled by MERMAID_THEME_VARIABLES.
            themeVariables: MERMAID_THEME_VARIABLES[theme]
          });
        }

        const { svg: rendered } = await mermaid.render(diagramId, graph.trim());

        if (mounted) {
          setSvg(rendered);
        }
      } catch (e) {
        if (mounted) {
          setSvg(null);
        }
        // eslint-disable-next-line no-console
        console.error(e);
      }
    }

    render();

    return () => {
      mounted = false;
    };
  }, [graph, theme, diagramId]);

  return <div dangerouslySetInnerHTML={{ __html: svg ?? '' }} />;
}
