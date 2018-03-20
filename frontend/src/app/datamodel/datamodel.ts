export interface RouteInfoFromDb {
    id: number,
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

export interface RouteData {
    points: Point[]
}

export interface RouteDataFromDb{
    id: number,
    data: RouteData
}