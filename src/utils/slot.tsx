import React from 'react';

type AnyProps = Record<string, unknown>;

/** Merge slot props with child props. className concatenates; style merges; event handlers chain. */
function mergeProps(slotProps: AnyProps, childProps: AnyProps): AnyProps {
  const merged: AnyProps = { ...slotProps };

  for (const key in childProps) {
    const sv = slotProps[key];
    const cv = childProps[key];

    if (key === 'className') {
      merged.className = [sv, cv].filter(Boolean).join(' ') || undefined;
    } else if (key === 'style') {
      merged.style = { ...(sv as object | undefined), ...(cv as object | undefined) };
    } else if (typeof sv === 'function' && typeof cv === 'function') {
      merged[key] = (...args: unknown[]) => {
        (sv as (...a: unknown[]) => void)(...args);
        (cv as (...a: unknown[]) => void)(...args);
      };
    } else {
      // Child props take precedence for everything else
      merged[key] = cv !== undefined ? cv : sv;
    }
  }

  return merged;
}

function mergeRefs<T>(
  refs: Array<React.Ref<T> | undefined | null>,
): React.RefCallback<T> {
  return (node) => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    }
  };
}

export interface SlotProps {
  children?: React.ReactNode;
  [key: string]: unknown;
}

/**
 * Slot merges its own props onto its single child element instead of rendering a wrapper.
 * Used to implement the `asChild` pattern:
 *
 * ```tsx
 * const Button = ({ asChild, ...props }) => {
 *   const Comp = asChild ? Slot : 'button';
 *   return <Comp className="kiln-button" {...props} />;
 * };
 *
 * // Usage — renders <a> styled as a button, no wrapper div:
 * <Button asChild><a href="/home">Home</a></Button>
 * ```
 */
const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, ...slotProps }, forwardedRef) => {
    if (!React.isValidElement(children)) {
      return children as React.ReactElement | null;
    }

    const child = children as React.ReactElement<AnyProps> & {
      ref?: React.Ref<unknown>;
    };

    const mergedProps = mergeProps(slotProps, child.props);

    const childRef = child.ref;
    const ref =
      forwardedRef && childRef
        ? mergeRefs([forwardedRef, childRef as React.Ref<HTMLElement>])
        : forwardedRef ?? (childRef as React.Ref<HTMLElement> | undefined);

    return React.cloneElement(child, { ...mergedProps, ref });
  },
);

Slot.displayName = 'Slot';
export { Slot };
