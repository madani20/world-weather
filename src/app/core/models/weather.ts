export interface Weather {
    id: string
    date: Date
    country: string, //location.country
    name: string, //location.name
    region: string, //location.region
    localtime: string //location.localtime
    lat: string, //location.lat
    lon: string, //location.lon
    timezoneId: string // fuseau hoaraire
    observationTime: string, //current.observation_time
    temperature: number, //current.temperature
    windSpeed: number, //current.wind_speed
    windDegree: number //current.wind_degree
    windDir: string,
    pressure: number,
    precip: number,
    humidity: number,
    cloudcover: number,
    feelslike: number,
    uvIndex: number,
    visibility: number,
    isDay: string,
    weatherIcons: string,
    weatherDescriptions: string
}
export type weathers = Weather[]