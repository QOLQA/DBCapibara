import { Button } from "@/components/ui/button";
import type { Route } from "./+types/ModalsView";
import { Plus, User } from "lucide-react";
import { Link } from "react-router";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export async function loader() {
	const url = `${backendUrl}/solutions`;

	const response = await fetch(url, {
		method: "GET",
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.detail);
	}

	return data;
}

const ModalsView = ({ loaderData }: Route.ComponentProps) => {
	return (
		<>
			<header className="bg-secondary-gray pt-[27px] pb-16">
				<div className="max-w-[1330px] mx-auto flex justify-between items-start">
					<div>Logo</div>
					<div className="flex gap-[68px]">
						<Button className="text-white font-weight-900 cursor-pointer bg-black">
							<Plus /> Nuevo Modelo
						</Button>
						<Button className="rounded-full" size="icon">
							<User />
						</Button>
					</div>
				</div>
			</header>
			<main className="bg-secondary-gray pb-[144px]">
				<div className="max-w-[1330px] mx-auto">
					<h1 className="text-center text-white text-h2">Tus modelos</h1>
					<hr className="mt-[33px] mb-10 border-gray-400" />
					<ul className="models grid grid-cols-3 gap-10">
						{loaderData.map((model) => (
							<Model {...model} key={model._id} />
						))}
					</ul>
				</div>
			</main>
		</>
	);
};

export default ModalsView;

interface ModelProps {
	name: string;
	submodels: unknown;
	queries: unknown;
	_id: string;
}

const Model = ({ _id, name, queries, submodels }: ModelProps) => {
	return (
		<li className="model">
			<Link to={`/models/${_id}/canva`} className="focus:rounded-2xl">
				<div className="model__thumbnail">
					<img
						src="https://via.assets.so/img.jpg?w=400&h=198&tc=gray&bg=#171717"
						alt="Thumbnail placeholder"
						className="model__thumbnail-img"
					/>
				</div>
				<div className="model__info">
					<p className="text-white text-h3">{name}</p>
					<p className="text-lighter-gray text-p">Editado el 24 / 10 / 24</p>
				</div>
			</Link>
		</li>
	);
};
