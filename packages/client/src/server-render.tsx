import {setupStore} from "./store/store";
import React, {StrictMode} from "react";
import {Provider} from "react-redux";
import {StaticRouter} from "react-router-dom/server";
import App from "./pages/App";
import {renderToString} from "react-dom/server";

const store = setupStore()

function Root({
    url
}: {
    url: string,
}) {
    return (
        <StrictMode>
            <StaticRouter location={url}>
                <Provider store={store}>
                    <App />
                </Provider>
            </StaticRouter>
        </StrictMode>
    )
}

export async function render (url: string): Promise<string> {
    return renderToString(React.createElement(Root, {
        url,
    }, null));
}