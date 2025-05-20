import { useState, type FC, type FormEvent } from "react";
import { assets } from "../../assets/assets";

const Search: FC = () => {
	const [searchQuesry, setSearchQuery] = useState<string>("");
	const handleSearch = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
	};

	const onSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	return (
		<form
			className="flex justify-center items-center mx-auto mt-2 max-w-xl w-full px-4"
			onSubmit={handleSearch}
		>
			<div className="flex items-center w-full border border-gray-300 rounded-lg overflow-hidden">
				<div className="flex items-center">
					<img
						src={assets.search_icon}
						alt="search"
						className="md:w-15 w-20 px-3"
					/>
				</div>
				<input
					type="text"
					placeholder="Search for courses"
					className="w-full outline-none text-gray-500/80"
					onChange={onSearchQueryChange}
					value={searchQuesry}
				/>
				<button
					type="submit"
					className="bg-purple-800 text-white px-5 py-2 my-0.5 mr-1 rounded-md hover:bg-purple-900 transition duration-300 cursor-pointer"
				>
					Search
				</button>
			</div>
		</form>
	);
};

export default Search;
