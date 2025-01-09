import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { UserOperationEvent, UserOperationEventQuery } from '../../../types';
import { EventsService } from '../services/user-operation-events.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [DatePipe, FormsModule],
  providers: [EventsService],
  standalone: true,
})
export class AppComponent implements OnInit, OnDestroy {
  operationEvents: UserOperationEvent[] = [];
  lastUpdated: Date = new Date();
  private refreshSubscription?: Subscription;

  queryParams: UserOperationEventQuery = {
    operationHash: '',
    sender: '',
    paymaster: '',
    success: undefined
  };

  successOptions = [
    { value: undefined, label: 'All' },
    { value: 1, label: 'Success' },
    { value: 0, label: 'Failed' }
  ];

  constructor(private eventsService: EventsService) {}

  ngOnInit() {
    this.fetchOperationEvents();
    
    // Set up interval for periodic fetching only when no filters are applied
    this.refreshSubscription = interval(3000).subscribe(() => {
      if (!this.hasActiveFilters()) {
        this.fetchOperationEvents();
      }
    });
  }

  ngOnDestroy() {
    // Clean up subscription when component is destroyed
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  hasActiveFilters(): boolean {
    return Object.values(this.queryParams).some(value => 
      value !== undefined && value !== '' && value !== null
    );
  }

  applyFilters() {
    // Create a clean query object without empty values
    const query: UserOperationEventQuery = {};
    
    if (this.queryParams.operationHash) {
      query.operationHash = this.queryParams.operationHash;
    }
    if (this.queryParams.sender) {
      query.sender = this.queryParams.sender;
    }
    if (this.queryParams.paymaster) {
      query.paymaster = this.queryParams.paymaster;
    }
    if (this.queryParams.success !== undefined) {
      query.success = this.queryParams.success;
    }

    this.fetchOperationEvents(query);
  }

  clearFilters() {
    this.queryParams = {
      operationHash: '',
      sender: '',
      paymaster: '',
      success: undefined
    };
    this.fetchOperationEvents();
  }

  fetchOperationEvents(query?: UserOperationEventQuery) {
    this.eventsService.getOperationEvents(query)
      .then((events) => {
        this.operationEvents = events;
        this.lastUpdated = new Date();
      });
  }
} 