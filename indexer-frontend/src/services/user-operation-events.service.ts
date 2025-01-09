import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserOperationEvent, UserOperationEventQuery } from '../../../types';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getOperationEvents(query?: UserOperationEventQuery): Promise<UserOperationEvent[]> {
    let params = new HttpParams();
    
    if (query) {
      if (query.operationHash) {
        params = params.set('operationHash', query.operationHash);
      }
      if (query.sender) {
        params = params.set('sender', query.sender);
      }
      if (query.paymaster) {
        params = params.set('paymaster', query.paymaster);
      }
      if (query.fromBlock !== undefined) {
        params = params.set('fromBlock', query.fromBlock.toString());
      }
      if (query.toBlock !== undefined) {
        params = params.set('toBlock', query.toBlock.toString());
      }
      if (query.success !== undefined) {
        params = params.set('success', query.success.toString());
      }
    }

    return firstValueFrom(
      this.http.get<UserOperationEvent[]>(`${this.apiUrl}/user-operation-events`, { params })
    );
  }
} 
