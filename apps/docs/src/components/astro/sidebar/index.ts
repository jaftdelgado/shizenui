// Astro port of the Fluid Functionalism sidebar
// (https://www.fluidfunctionalism.com/docs/sidebar, MIT © mickadesign).
// Styles: src/styles/sidebar.css. Behaviour: ./sidebar-client.ts.
// The nav inside <Sidebar /> is plain markup tagged with data-sidebar
// attributes (see DocsSidebar.astro); only the parts with structure or
// behaviour are components.
export { default as SidebarProvider } from "./SidebarProvider.astro";
export { default as Sidebar } from "./Sidebar.astro";
export { default as SidebarInset } from "./SidebarInset.astro";
export { default as SidebarTrigger } from "./SidebarTrigger.astro";
