import {HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { ApiResponse } from './interface/api-response';
import { Page } from './interface/page';
import { UserService } from './service/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent implements OnInit {
  //definindo um estado para a aplicação 
  usersState$: Observable<{appState: string, appData?: ApiResponse<Page>, error?: HttpErrorResponse}>; //devido as configuraç~ies no tsconfig alteradas ele n reclama mais
  responseSubject = new BehaviorSubject<ApiResponse<Page>>(null);
  private currentPageSubject  = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();

  //Aqui utiliza o serviço criado em user.service
  constructor(private userService: UserService){ }
    
    ngOnInit(): void {
      this.usersState$ = this.userService.users$().pipe(
        map((response: ApiResponse<Page>) => {

          this.responseSubject.next(response);
          this.currentPageSubject.next(response.data.page.number);
          
          console.log(response);
          return ({ appState: 'APP_LOADED', appData:response});
        }
      ), 
      startWith({ appState: 'APP_LOADING'}),
      catchError((error: HttpErrorResponse) => of({ appState: 'APP_ERROR', error}))
    )
   }


   goToPage(name?: string, pageNumber: number = 0) : void {
    this.usersState$ = this.userService.users$(name, pageNumber).pipe(
      map((response: ApiResponse<Page>) => {

        this.responseSubject.next(response);
        this.currentPageSubject.next(pageNumber);

        console.log(response);
        return ({ appState: 'APP_LOADED', appData:response});
      }
    ), 
    startWith({ appState: 'APP_LOADED', appData: this.responseSubject.value}),
    catchError((error: HttpErrorResponse) => of({ appState: 'APP_ERROR', error}))
  )
 }

 //Função que passa ou volta a página 
 goToNextOrPreviousPage(direction?: string, name?: string):void{
  this.goToPage(name, direction == 'foward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1 )
 }
}



