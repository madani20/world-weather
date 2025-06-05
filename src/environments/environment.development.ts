
export const environment = {
    isProduction: false,
    apis: {
        urlLocalHistory: 'http://localhost:3000/cities/',
        urlSearchByKeywordApiWeatherstack: `http://api.weatherstack.com/current?access_key={Add your key here}=`,
        urlToBackup: 'http://localhost:3000/cities/',
        urlSearchWeathers: 'http://localhost:3000/cities?name_like=',
        urlSearchWeathersByKeyword: 'http://localhost:3000/cities?name='
    }
};
