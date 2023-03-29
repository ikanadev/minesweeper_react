import React from "react";
import ReactDOM from "react-dom/client";
import App from "~/App";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

import "dayjs/locale/es";
import "dayjs/locale/en";

import "./index.css";

dayjs.extend(localizedFormat);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
