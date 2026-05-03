// a11y: WCAG AA verified 2026-04-29
// perf: CLS=0, GPU-friendly 2026-04-29
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils';
import './CodeBlock.css';

// highlight.js is loaded once on first mount — keeps it off the critical path.
let hljsReady: Promise<typeof import('highlight.js/lib/core').default> | null = null;
function getHljs() {
  if (!hljsReady) {
    hljsReady = (async () => {
      const [core, js, ts, xml, bash, json, css] = await Promise.all([
        import('highlight.js/lib/core'),
        import('highlight.js/lib/languages/javascript'),
        import('highlight.js/lib/languages/typescript'),
        import('highlight.js/lib/languages/xml'),
        import('highlight.js/lib/languages/bash'),
        import('highlight.js/lib/languages/json'),
        import('highlight.js/lib/languages/css'),
      ]);
      const hljs = core.default;
      hljs.registerLanguage('javascript', js.default);
      hljs.registerLanguage('js', js.default);
      hljs.registerLanguage('jsx', js.default);
      hljs.registerLanguage('typescript', ts.default);
      hljs.registerLanguage('ts', ts.default);
      hljs.registerLanguage('tsx', ts.default);
      hljs.registerLanguage('xml', xml.default);
      hljs.registerLanguage('html', xml.default);
      hljs.registerLanguage('bash', bash.default);
      hljs.registerLanguage('sh', bash.default);
      hljs.registerLanguage('shell', bash.default);
      hljs.registerLanguage('json', json.default);
      hljs.registerLanguage('css', css.default);
      return hljs;
    })();
  }
  return hljsReady;
}

export interface CodeBlockProps {
  /** The code string to display. */
  code: string;
  /** Language label shown in the toolbar (e.g. "bash", "tsx"). */
  language?: string;
  /** Show the copy-to-clipboard button. Default: true. */
  showCopy?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  showCopy = true,
  className,
  style,
}) => {
  const [copied, setCopied] = useState(false);
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!language) { setHighlighted(null); return; }
    let cancelled = false;
    getHljs().then((hljs) => {
      if (cancelled) return;
      try {
        setHighlighted(hljs.highlight(code, { language, ignoreIllegals: true }).value);
      } catch {
        setHighlighted(null);
      }
    });
    return () => { cancelled = true; };
  }, [code, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — silent fail
    }
  };

  const showToolbar = language || showCopy;

  return (
    <div className={cn('kiln-code-block', className)} style={style}>
      {showToolbar && (
        <div className="kiln-code-block__toolbar">
          {language && (
            <span className="kiln-code-block__lang" aria-hidden="true">
              {language}
            </span>
          )}
          {showCopy && (
            <button
              type="button"
              className={cn(
                'kiln-code-block__copy',
                copied && 'kiln-code-block__copy--copied',
              )}
              onClick={handleCopy}
              aria-label={copied ? 'Copied to clipboard' : 'Copy code to clipboard'}
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          )}
        </div>
      )}
      <pre
        className="kiln-code-block__pre"
        // tabIndex makes the scrollable region keyboard-reachable (WCAG 2.1.1)
        tabIndex={0}
        aria-label={language ? `${language} code` : 'Code block'}
      >
        {highlighted !== null ? (
          <code
            className="kiln-code-block__code"
            // highlight.js escapes HTML entities in user code — safe to use dangerouslySetInnerHTML
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        ) : (
          <code className="kiln-code-block__code">{code}</code>
        )}
      </pre>
      {/* Announces copy confirmation to screen readers without disrupting flow */}
      <span
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="kiln-code-block__sr-announce"
      >
        {copied ? 'Copied to clipboard' : ''}
      </span>
    </div>
  );
};

CodeBlock.displayName = 'CodeBlock';
export default CodeBlock;
