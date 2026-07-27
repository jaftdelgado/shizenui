import Root from "./InputGroup.svelte";
import Prefix from "./compound/Prefix.svelte";
import Suffix from "./compound/Suffix.svelte";
import Input from "./compound/Input.svelte";
import TextArea from "./compound/TextArea.svelte";

export type {
  InputGroupProps,
  InputGroupVariant,
  InputGroupKind,
  InputGroupPrefixProps,
  InputGroupSuffixProps,
  InputGroupInputProps,
  InputGroupTextAreaProps
} from "./_internal/index.js";

export const InputGroup = Object.assign(Root, {
  Prefix,
  Suffix,
  Input,
  TextArea
});

export default {
  InputGroup
};
