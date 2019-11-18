import { Component, OnInit, ViewChild } from '@angular/core';

import { Ngglobal } from '../ngglobal';
import { TestService } from '../test.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-list-result',
  templateUrl: './list-result.component.html',
  styleUrls: ['./list-result.component.scss']
})
export class ListResultComponent implements OnInit {
  data : Ngglobal[];
  error  = '';
  success = '';
  dataSource : MatTableDataSource<Ngglobal>;
  isLoadingResults = true;

  //colonnes a afficher dans le tableau material datatable
  displayedColumns = ["id_ngGlobal","login_status", "lastname", "firstname","mail", "phone"];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private testService:TestService){

  }

  //Lancé a l'affichage du composant
  ngOnInit(){
    this.getTests();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //récupère la liste complète
  getTests(): void{
    this.testService.getAll().subscribe(
      (res: Ngglobal[]) => {
        this.data = res;
        this.isLoadingResults = false;
        this.dataSource = new MatTableDataSource<Ngglobal>(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource);
      },
      (err) => {
        this.error = err;
      }
    );
  }
}
