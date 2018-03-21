
import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { retry } from 'rxjs/operator/retry';
import { Position } from '../model/position';
import 'rxjs/add/operator/map'


@Injectable()
export class PositionService {

    @Output() positionsUpdated: EventEmitter<any> = new EventEmitter();

    positions: Position[];

    constructor(private http: HttpClient) {
    }

    getPositions(): Observable<Position[]> {
        return this.http.get('./assets/trace.json')
            .map((result: any) => {
                var positions = result.map((object: Position) => {
                    let position = new Position(object);
                    return position;
                } ) ;
                console.log(positions);
                this.positions = positions;
                this.positionsUpdated.emit();
                return positions;
            });
    };

    getPositionsList(): Position[] {
        return this.positions
    }

    getPositionsUpdatedSignal() {
        return this.positionsUpdated
    }
}
