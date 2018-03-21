export interface RouteInfoFromDb {
    id: number,
    name: string,
    routeDate: string,
    routeFileName: string,
    traceDate: string,
    traceFileName: string    
}

export interface Point{
    latitude: number,
    longitude: number,
    speed? : number,
    bearing? : number,
    time? : number
}

export interface RouteData {
    points: Point[]
}

export interface RouteDataFromDb{
    id: number,
    route: RouteData,
    trace: RouteData
}

export interface FileInfo{
    name: string,
    date: string,
    file: File
}