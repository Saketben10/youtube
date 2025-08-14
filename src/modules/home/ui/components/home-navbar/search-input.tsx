import { SearchIcon } from "lucide-react";

export const SearchInput = () => {
  return (
    // TODO: add search functionality
    <form className="flex w-fulll max-w-[600px]">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="search"
          className="w-full pl-4 pr-12 rounded-l-full border focus:outline-none focus:border-blue-500"
        />
        {/* TODO: add remove search button */}
      </div>
      <button
        type="submit"
        className="px-5  bg-gray-100 border-l-0 rounded-r-full hover:bg-gray-200 disabled
        :opacity-50 disabled:cursor-not-allowed"
      >
        <SearchIcon className="size-5" />
      </button>
    </form>
  );
};
