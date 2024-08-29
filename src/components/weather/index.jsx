import { useEffect, useState } from "react";
import Search from "../search";

export default function Weather() {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState("");

    async function fetchWeatherData(param) {
        setLoading(true);
        setError("");

        try {
            const apiKey = process.env.REACT_APP_API_KEY;
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${param}&units=metric&appid=${apiKey}`
            );
            if (!res.ok) {
                throw new Error(`Failed to fetch data: ${res.statusText}`);
            }
            const data = await res.json();
            setWeatherData(data);
        } catch (e) {
            setError(`Some error occurred: ${e.message}. Please try again.`);
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    function handleSearch() {
        fetchWeatherData(search);
    }

    function getCurrentDate() {
        return new Date().toLocaleDateString("en-us", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    }

    useEffect(() => {
        fetchWeatherData("munich");
    }, []);

    const renderWeatherInfo = () => (
        <>
            <div className="city-name">
                <h2>
                    {weatherData?.name},{" "}
                    <span>{weatherData?.sys?.country}</span>
                </h2>
            </div>
            <div className="date">
                <span>{getCurrentDate()}</span>
            </div>
            <div className="temp">{weatherData?.main?.temp.toFixed(1)}°C</div>
            <p className="description">
                {weatherData?.weather[0]?.description}
            </p>
            <div className="weather-info">
                <div className="column">
                    <div>
                        <p className="wind">{weatherData?.wind?.speed} m/s</p>
                        <p>Wind Speed</p>
                    </div>
                </div>
                <div className="column">
                    <div>
                        <p className="humidity">
                            {weatherData?.main?.humidity}%
                        </p>
                        <p>Humidity</p>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <>
            <Search
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
            />
            {loading && <h1>Loading...</h1>}
            {error && <h1>{error}</h1>}
            {weatherData && !loading && !error && renderWeatherInfo()}
        </>
    );
}
