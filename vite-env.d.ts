interface ImportMetaEnv {
	readonly VITE_BACKEND_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare module "*.css" {
	const content: { [className: string]: string };
	export default content;
}
