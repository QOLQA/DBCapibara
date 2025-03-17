import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "./redux/store";
import Router from "./router";

createRoot(document.body).render(
	<StrictMode>
		<Provider store={store}>
			<Router />
		</Provider>
	</StrictMode>,
);
