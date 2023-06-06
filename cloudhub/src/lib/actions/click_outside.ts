// rome-ignore lint: why i no know the correct type
export function clickOutside(node: HTMLElement): any {
	const handleClick = (event: MouseEvent) => {
		if (
			node &&
			!node.contains(event.target as Node) &&
			!event.defaultPrevented
		) {
			node.dispatchEvent(new CustomEvent("clickOutside"));
		}
	};

	document.addEventListener("click", handleClick, true);

	return {
		destroy() {
			document.removeEventListener("click", handleClick, true);
		},
		on: {
			clickOutside: handleClick,
		},
	};
}
