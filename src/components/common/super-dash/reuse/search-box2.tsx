const SearchBox2 = () => {
  return (
    <div>
      <div className="px-4 ">
        <div className="h-11 flex items-center bg-white  rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search by vendor name or service title"
            className="w-full px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none"
          />

          <button className="bg-sky-500  text-white p-4 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBox2;
