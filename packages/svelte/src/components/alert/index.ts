import Root from "./Alert.svelte";
import Actions from "./compound/Actions.svelte";
import Content from "./compound/Content.svelte";
import Description from "./compound/Description.svelte";
import Indicator from "./compound/Indicator.svelte";
import Title from "./compound/Title.svelte";

export type {
  AlertActionsProps,
  AlertColor,
  AlertContentProps,
  AlertDescriptionProps,
  AlertIndicatorProps,
  AlertProps,
  AlertSize,
  AlertTitleProps
} from "./_internal/index.js";

export const Alert = Object.assign(Root, { Actions, Content, Description, Indicator, Title });
export default { Alert };
