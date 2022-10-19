import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

export interface Assets {
  id: number;
  name: string;
  status: number;
  lastUpdatedDate: Date;
}

const ASSET_DATA: Assets[] = [
  { id: 1, name: 'Gate A', status: 1.0079, lastUpdatedDate: new Date('01/16/2021 1:30:59') },
  { id: 2, name: 'Barrier A', status: 2.0079, lastUpdatedDate: new Date('01/17/2021 1:10:39') },
  { id: 3, name: 'Gate B', status: 3.0079, lastUpdatedDate: new Date('01/18/2021 1:30:59') },
  { id: 4, name: 'Barrier B', status: 4.0079, lastUpdatedDate: new Date('01/19/2021 1:20:49') },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Asset Table';
  displayedColumns: string[] = ['id', 'name', 'status', 'lastUpdatedDate'];
  dataSource = new MatTableDataSource(ASSET_DATA);

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
