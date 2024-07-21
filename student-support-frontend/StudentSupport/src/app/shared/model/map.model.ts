export interface Address {
address: {
    house_number: string,
    road: string,
    quarter: string,
    city: string,
    municipality: string,
    postcode: string,
    country: string,
}
}
export interface Coordinates {
    lat: number;
    lon: number;
}

export interface Elevation {
    latitude: number,
    longitude: number,
    elevation: number,
}
