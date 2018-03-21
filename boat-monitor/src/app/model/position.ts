export class Position {
    _id: string;
    latitude: number;
    longitude: number;
    date: string;

    constructor(obj?: Position)
    {
        this._id = obj && obj._id || undefined;
        this.latitude = obj && obj.latitude || undefined;
        this.longitude = obj && obj.longitude || undefined;
        this.date = obj && obj.date || undefined;
    }
   
}