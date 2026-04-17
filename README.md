This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## SSR Handling

This project integrates a Tiptap-based rich text editor which requires browser-specific APIs (like `window` and `document`). To avoid Server-Side Rendering (SSR) issues and hydration mismatches, we've implemented a "double-layer" fix:

### 1. Dynamic Import with No SSR (Prevents Server Crashes)
In `src/app/page.tsx`, the `RichTextEditor` is loaded using Next.js `dynamic` with the `ssr: false` option. 
*   **Reason:** Tiptap and its dependencies often reference `window` or `document` as soon as they are imported. Without this, the server would crash with a `ReferenceError: window is not defined`.

### 2. Tiptap Configuration Patch (Prevents Hydration Mismatch)
A patch is applied to the `@vishal4500/rich-text-editor` package (via `patch-package`) to set `immediatelyRender: false` in the Tiptap editor configuration. 
*   **Reason:** Even when loaded only on the client, Tiptap's default behavior is to render its internal HTML structure immediately upon instantiation. If Tiptap modifies the DOM before React finishes "syncing" the server-provided HTML with client-side state, a **Hydration Mismatch** error occurs. Setting this to `false` ensures the editor waits until the React component is fully mounted.

### 3. Suppress Hydration Warning
In `src/app/layout.tsx`, the `suppressHydrationWarning` attribute is used on the `<body>` (or relevant wrapper).
*   **Reason:** Since we "hide" the editor from the server (via `ssr: false`), the initial server-sent HTML differs from the first client-side frame. This attribute silences the unavoidable UI warnings during this transition.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
