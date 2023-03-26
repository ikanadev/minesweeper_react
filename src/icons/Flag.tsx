import { SVGProps } from "react";

export function Flag(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 500 500"
			width="124"
			height="124"
			{...props}
		>
			<path
				fill="#f0f4ff"
				d="M187 34v447a5 5 0 0 0 5 5h29a5 5 0 0 0 5-5V34a20 20 0 1 0-39 0Z"
			/>
			<path fill="#c0d8ff" d="M206 14v458h20V34a20 20 0 0 0-20-20Z" />
			<path
				fill="#e53434"
				d="M449 212a5 5 0 0 1-5 7H221V61h223a5 5 0 0 1 5 7l-31 70a5 5 0 0 0 0 4Z"
			/>
			<path
				fill="#ffcc71"
				d="M191 434h31a52 52 0 0 1 52 52H139a52 52 0 0 1 52-52Z"
			/>
			<path
				fill="#f75454"
				d="M444 219H221v-79h197a5 5 0 0 0 0 2l31 70a5 5 0 0 1-5 7Z"
			/>
			<path
				fill="#202326"
				d="m423 140 31-70a10 10 0 0 0-10-14H231V34a25 25 0 0 0-7-17c-16-16-42-5-42 17v396a57 57 0 0 0-48 56 5 5 0 0 0 5 5h135a5 5 0 0 0 5-5 57 57 0 0 0-48-56V224h213a10 10 0 0 0 10-14ZM206 19a15 15 0 0 1 15 15v395h-29V34a15 15 0 0 1 14-15Zm62 462H144a47 47 0 0 1 47-42h31a47 47 0 0 1 46 42Zm-37-267V66h213l-30 70a10 10 0 0 0 0 8l30 70Z"
			/>
		</svg>
	);
}
