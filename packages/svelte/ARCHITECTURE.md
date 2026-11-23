# Component architecture

`Tag` and `TagGroup` are the reference for how a component of this package is built. Several
components are older and do not follow it yet: see [Known deviations](#known-deviations).

## Anatomy

A component is a folder under `src/components/<name>/`:

```
<name>/
  <Name>.svelte        the root
  compound/*.svelte    the parts (TagGroup.List, Tag.RemoveButton)
  index.ts             the public entry point
  _internal/           everything else
```

- The `.svelte` files only connect pieces: they read props, build the state, call the `get*Attributes`
  functions and the handler factories, and spread the result with `mergeProps`.
- `index.ts` builds the compound with `Object.assign(Root, { Part })` and exports the public types.
  It has no `export default`.
- The classes are resolved in the `<script module>` of each `.svelte` with `@shizen-ui/styles`
  (`resolveSlotClasses`, or `memoizeSlotClasses` when the slot has variants). They do not go through
  the state or the context.
- The state is the context. `TagState` and `TagGroupState` are passed as they are to
  `setTagContext` and `setTagGroupContext`. There is no `*.setup.svelte.ts` layer.

| File in `_internal/` | Responsibility                                                                         |
| -------------------- | -------------------------------------------------------------------------------------- |
| `*.types.ts`         | The public props and the types they name. No runtime code.                             |
| `*.constants.ts`     | What more than one layer shares (slot names, selectors). Imports nothing.              |
| `*.context.ts`       | The context interfaces by role, the frozen no-op, `createOptionalContext`.             |
| `*.state.svelte.ts`  | The reactive state and its commands. Works with ids and values, never with the DOM.    |
| `*.attributes.ts`    | Pure functions from state to the attributes of an element (`get*Attributes`).          |
| `*.handlers.ts`      | Factories of event handlers: they turn an event into a command of the state.           |
| `*.queries.ts`       | The queries to the DOM (`querySelector`, `closest`). Called by `.svelte` and handlers. |
| `*.warnings.ts`      | The development warnings (`setup*Warnings`).                                           |
| `index.ts`           | The barrel of `_internal/`. Only what other files of the package import.               |

Not every component needs every file: `tag-group.queries.ts` exists because the group asks the DOM
something, and a component with nothing to ask has no `queries`.

## Rules

1. **The state decides.** Every command of the state guards itself: if it is not allowed, it does
   nothing.
2. **A handler only translates** an event into a command. It reads the state for two things: to
   decide `preventDefault`, and to decide whether a callback of the consumer runs. It never asks
   "can I?" to protect a command.
3. **Each condition is validated once, in the state that owns the data.** The Tag validates what is
   its own (disabled, removable). The group validates its mode. The primitives of `lib` validate
   their own invariants, because they are reused.
4. **The state knows neither the DOM nor the CSS.** The queries live in `*.queries.ts`. One
   documented exception: the group state configures `FocusRestoration` with the selectors of the
   list and of its tags, and hands it the element of the tag that is removed. `lib` does the query.
5. **Dependencies go one way.** `tag` may import from `tag-group`. `tag-group` imports nothing from
   `tag`, not even types (`TagGroupVariant` and `TagGroupSize` are derived from the same styles).
   `lib` does not import from `components`, and `lib/utils` does not import from `lib/runes`.
6. **Contexts** are created with `createOptionalContext` and a frozen no-op without behavior: inert
   values and empty functions, and `exists: false`. The interface is split by role
   (`TagGroupItemApi` for the tag, `TagGroupListApi` for the list).
7. **Classes** are the component's own, resolved in its `<script module>`.
8. **Names.**
   - Booleans are `is*`, `can*` or `has*`, functions that return a boolean included.
   - Values are asked with `get*`.
   - Commands are named with a verb.
   - In the options of a function, `{ state }` is the own state and `{ <owner>Ctx }` the context of
     another component.
   - The getter of the own element is `getElement` in the APIs of Tag and TagGroup. The ones in `lib`
     keep their names (`getContainer`).

Where each check of `TagGroup` lives, and why:

| Check                           | Where                                          | Why                                                                                           |
| ------------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Selection mode on a click       | `TagGroupState.select`                         | The group owns the mode: `extend` is honored only in `multiple`.                              |
| Selection mode on a range       | `SelectionState.extendTo`                      | An invariant of the primitive: it acts only in `multiple`, whoever calls it.                  |
| Tag can be selected             | `TagState.select` (`isInteractive`)            | The tag owns being disabled.                                                                  |
| `disabled` in the click handler | `handleClick` in `tag.handlers.ts`             | Not a guard of `select`, which guards itself: the consumer's `onclick` must not run either.   |
| `canRemove` in the key handler  | `handleKeyDown` in `tag.handlers.ts`           | Decides if the key is the tag's, to cancel the browser's default. `remove` guards itself too. |
| Removal of a tag                | `TagState.remove`, then `TagGroupState.remove` | The tag validates `canRemove`; the group only orders and runs the removals.                   |

## `lib`

- `lib/runes/` holds a file if it creates reactive state or effects: runes, `SvelteSet` and
  `SvelteMap`, `$effect`, a lifecycle. Otherwise it goes in `lib/utils/`, even if it uses `tick`.
- The extension `.svelte.ts` is used if and only if the file uses the syntax of runes, because the
  compiler requires it. That is why `content-slots-state.ts` is in `runes/` without it, and
  `focus-restoration.ts` is in `utils/`.
- `lib` does not import from `components`, and `utils` does not import from `runes`.
- Internal imports carry `.js`, in `src/index.ts` as well.

## `mergeProps`

`mergeProps(internal, rest, options?)` puts the component's own props over the consumer's.

- A defined internal value always wins.
- The `data-*` keys the component declares always win, even when their value is `undefined` (the
  attribute is then not rendered). They are the state and styling API of every component, and the
  selectors of the CSS and of the queries depend on them: a consumer's `data-selected` must never
  change what the component says about itself.
- `options.owned` lists other keys that win the same way. Use it only for a key whose value can be
  `undefined`: `TAG_ROW_OWNED_KEYS` (the row inside a group, whose `tabindex` is `undefined` when it
  is disabled) and `TAG_GROUP_LIST_OWNED_KEYS`.
- Any other internal key that is `undefined` is skipped, so it never wipes out a consumer's value
  (`aria-*`, and `role` and `tabindex` outside a group).
- `class` is joined and the DOM event handlers are composed, the internal one first.

## Warnings

- They exist only in development, through `warnIf` (reactive) or `devWarn`.
- They never decide what renders. That is `const shouldRender = ctx.exists` in the component.
- They live in `*.warnings.ts` and are emitted by the component that owns the problem: the warning
  about a list without a name is `TagGroup.List`'s.

## Known deviations

The rest of the package predates these rules. They are not migrated by decision, one component at a
time and only when it is touched:

- Hand-made contexts in `lib/contexts` and in several components. The standard is
  `createOptionalContext`.
- `assertContext`, with 21 uses, mixes the warning with the decision to render. The standard is
  `warnIf` plus `ctx.exists`.
- The `*.setup.svelte.ts` layers (alert, checkbox, radio, switch, their groups, and others).
- The `export default { ... }` in the `index.ts` of the other components.
- `scripts/add-component.ts` still generates a single `.svelte`, not the anatomy above.
