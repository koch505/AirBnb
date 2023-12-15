import countries from "world-countries";

const formattedCounties = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    lating: country.latlng,
    region: country.region
}));

const useCounties = () => {
    const getAll = () => formattedCounties;

    const getByValue = (value: string) => {
        return formattedCounties.find(item => item.value === value);
    }
}

export default useCounties;