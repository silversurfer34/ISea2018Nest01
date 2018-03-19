export interface RouteFromDb {
    name: string,
    date: string,
    fileName: string,
    type: string
}

export interface Point{
    latitude: number,
    longitude: number,
    speed? : number,
    course? : number,
    time? : number
}

export interface RouteFromStorage {
    points: Point[]
}
