import { useState, useCallback } from 'react';

export interface UseAccordionOptions {
  allowMultiple?: boolean;
  defaultOpenId?: string | null;
}

export interface UseAccordionReturn {
  openIds: Set<string>;
  isOpen: (id: string) => boolean;
  toggle: (id: string) => void;
  open: (id: string) => void;
  close: (id: string) => void;
}

/**
 * Hook providing smooth state management for industrial collapsible drawer accordions.
 *
 * @param options - Configuration for multi-panel expansion and initial open item.
 * @returns Set of active item IDs and toggle methods.
 */
export const useAccordion = (options: UseAccordionOptions = {}): UseAccordionReturn => {
  const { allowMultiple = false, defaultOpenId = null } = options;

  const [openIds, setOpenIds] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    if (defaultOpenId) initial.add(defaultOpenId);
    return initial;
  });

  const isOpen = useCallback((id: string) => openIds.has(id), [openIds]);

  const toggle = useCallback(
    (id: string) => {
      setOpenIds((prev) => {
        const next = new Set(allowMultiple ? prev : []);
        if (prev.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    },
    [allowMultiple]
  );

  const open = useCallback(
    (id: string) => {
      setOpenIds((prev) => {
        const next = new Set(allowMultiple ? prev : []);
        next.add(id);
        return next;
      });
    },
    [allowMultiple]
  );

  const close = useCallback((id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  return { openIds, isOpen, toggle, open, close };
};
