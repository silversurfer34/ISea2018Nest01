export interface FileInfo{
    name: string,
    date: string,
    file: File
}

export interface Point{
    latitude: number,
    longitude: number,
    name?: string,
    speed? : number,
    bearing? : number,
    GMT_TIME? : number
}

export interface BoatTrajectoriesFromDb {
    name: string,
    routeDate: string,
    traceDate: string,
    route: Point[],
    trace: Point[],
}


