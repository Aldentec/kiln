// a11y: WCAG AA verified 2026-04-29
// perf: CLS=0, GPU-friendly 2026-04-29
import React, { useState, useRef, useMemo } from 'react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
import css from 'highlight.js/lib/languages/css';
import { cn } from '../../utils';
import './CodeBlock.css';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('jsx', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('tsx', typescript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('sh', bash);
hljs.registerLanguage('shell', bash);
hljs.registerLanguage('json', json);
hljs.registerLanguage('css', css);

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
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const highlighted = useMemo(() => {
    if (!language) return null;
    try {
      return hljs.highlight(code, { language, ignoreIllegals: true }).value;
    } catch {
      return null;
    }
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
