import type {Request, Response} from 'express';
import type { ViteDevServer } from 'vite'
import fs from "fs";
import path from "path";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-var-requires
const {render} = require('../../client/dist/server/server-render.cjs');

export async function ssrController (vite: ViteDevServer, req: Request, res: Response): Promise<void> {
    const url = req.originalUrl

    // 1. Read index.html
    let template = fs.readFileSync(
        path.resolve(__dirname, '../../client/dist', 'index.html'),
        'utf-8',
    );

    // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
    //    also applies HTML transforms from Vite plugins, e.g. global preambles
    //    from @vitejs/plugin-react
    template = await vite.transformIndexHtml(url, template)

    const rootHtml = await render(url);

    // 5. Inject the app-rendered HTML into the template.
    const html = template.replace(`<!--ssr-content-->`, rootHtml)

    // 6. Send the rendered HTML back.
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
}