import type { Action } from "svelte/action";

export const clickOutside: Action<
	HTMLElement,
	undefined,
	{ onclickoutside: () => void; }
> = (node) => {
	const handleClick = (event: MouseEvent) => {
		if (node && !node.contains(event.target as Node) && !event.defaultPrevented) {
			node.dispatchEvent(new CustomEvent("clickoutside"))
		}
	}

	$effect(() => {
		document.addEventListener("click", handleClick, true)

		return () => {
			document.removeEventListener("click", handleClick, true)
		}
	})
}
