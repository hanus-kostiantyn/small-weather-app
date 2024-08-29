export default function Search({ search, setSearch, handleSearch }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch();
    };

    return (
        <div className="search-engine">
            <form onSubmit={handleSubmit}>
                <input
                    required
                    type="text"
                    placeholder="Enter City Name"
                    name="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
        </div>
    );
}
