import { createContext } from "svelte";
import type { TagGroupSelectionMode } from "./tag-group.types.js";
import type { TagSize, TagVariant } from "../../tag/_internal/tag.types.js";

export interface TagGroupRegistration {
  getDisabled: () => boolean;
  getValue: () => string;
}

export interface TagGroupContextValue {
  readonly selectionMode: TagGroupSelectionMode;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly variant: TagVariant;
  readonly size: TagSize;
  readonly isRemovable: boolean;
  readonly labelId: string | undefined;
  readonly descriptionId: string | undefined;
  readonly errorId: string | undefined;
  readonly hasLabel: boolean;
  readonly hasDescription: boolean;
  readonly hasError: boolean;
  readonly hasList: boolean;
  readonly isSelected: (value: string) => boolean;
  readonly toggleValue: (value: string) => void;
  readonly remove: (value: string) => void;
  readonly register: (id: string, entry: TagGroupRegistration) => void;
  readonly unregister: (id: string) => void;
  readonly isActive: (id: string) => boolean;
  readonly setActiveId: (id: string | undefined) => void;
  readonly registerList: (id: string) => void;
  readonly unregisterList: (id: string) => void;
}

export interface TagGroupContextResult extends TagGroupContextValue {
  readonly exists: boolean;
}

const [getTagGroupContext, setTagGroupContext] = createContext<TagGroupContextValue>();

function tryGetTagGroupContext(): TagGroupContextValue | undefined {
  try {
    return getTagGroupContext();
  } catch {
    return undefined;
  }
}

export { setTagGroupContext };

export function useTagGroupContext(): TagGroupContextResult {
  const context = tryGetTagGroupContext();

  if (!context) {
    return {
      get selectionMode() {
        return "none" as TagGroupSelectionMode;
      },
      get disabled() {
        return false;
      },
      get invalid() {
        return false;
      },
      get variant() {
        return "default" as TagVariant;
      },
      get size() {
        return "md" as TagSize;
      },
      get isRemovable() {
        return false;
      },
      get labelId() {
        return undefined;
      },
      get descriptionId() {
        return undefined;
      },
      get errorId() {
        return undefined;
      },
      get hasLabel() {
        return false;
      },
      get hasDescription() {
        return false;
      },
      get hasError() {
        return false;
      },
      get hasList() {
        return false;
      },
      isSelected(_value: string) {
        return false;
      },
      toggleValue(_value: string) {},
      remove(_value: string) {},
      register(_id: string, _entry: TagGroupRegistration) {},
      unregister(_id: string) {},
      isActive(_id: string) {
        return false;
      },
      setActiveId(_id: string | undefined) {},
      registerList(_id: string) {},
      unregisterList(_id: string) {},
      get exists() {
        return false;
      }
    } satisfies TagGroupContextResult;
  }

  return {
    get selectionMode() {
      return context.selectionMode;
    },
    get disabled() {
      return context.disabled;
    },
    get invalid() {
      return context.invalid;
    },
    get variant() {
      return context.variant;
    },
    get size() {
      return context.size;
    },
    get isRemovable() {
      return context.isRemovable;
    },
    get labelId() {
      return context.labelId;
    },
    get descriptionId() {
      return context.descriptionId;
    },
    get errorId() {
      return context.errorId;
    },
    get hasLabel() {
      return context.hasLabel;
    },
    get hasDescription() {
      return context.hasDescription;
    },
    get hasError() {
      return context.hasError;
    },
    get hasList() {
      return context.hasList;
    },
    isSelected(value: string) {
      return context.isSelected(value);
    },
    toggleValue(value: string) {
      return context.toggleValue(value);
    },
    remove(value: string) {
      return context.remove(value);
    },
    register(id: string, entry: TagGroupRegistration) {
      return context.register(id, entry);
    },
    unregister(id: string) {
      return context.unregister(id);
    },
    isActive(id: string) {
      return context.isActive(id);
    },
    setActiveId(id: string | undefined) {
      return context.setActiveId(id);
    },
    registerList(id: string) {
      return context.registerList(id);
    },
    unregisterList(id: string) {
      return context.unregisterList(id);
    },
    get exists() {
      return true;
    }
  } satisfies TagGroupContextResult;
}
