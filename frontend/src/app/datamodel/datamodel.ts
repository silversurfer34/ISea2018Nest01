export interface RouteInfoFromDb {
    id: number,
    name: string,
    plannedDate: string,
    plannedFileName: string,
    doneDate: string,
    doneFileName: string    
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
    plannedRoute: RouteData,
    doneRoute: RouteData
}