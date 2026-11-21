// Constants shared by more than one layer of Tag and TagGroup.
//
// - This module imports nothing, so it can never take part in an import cycle.
// - It holds only what two or more layers share. A constant used by a single file stays in that file.
// - Imports between the two components go one way: tag may import values from tag-group, but
//   tag-group only imports types from tag. That is why the tag slot name is declared here.

/** The `data-slot` of the Tag row. The tag attributes layer writes it; the selectors below read it. */
export const TAG_SLOT = "tag";

/** The `data-slot` of the TagGroup.List element. The attributes layer writes it. */
export const TAG_GROUP_LIST_SLOT = "tag-group-list";

// Built from the slot names the attributes layers write, so renaming a slot cannot silently break
// the roving focus or the removal.

/** The enabled tags of a list. A disabled tag is not focusable. */
export const TAG_SELECTOR = `[data-slot="${TAG_SLOT}"]:not([data-disabled])`;

/** The list that contains the tags. */
export const LIST_SELECTOR = `[data-slot="${TAG_GROUP_LIST_SLOT}"]`;
