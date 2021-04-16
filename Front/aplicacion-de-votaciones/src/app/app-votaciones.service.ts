import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { loginData } from "./usuario";
import { Evento } from "./eventos";
import { Nominado } from "./nominado"
 

@Injectable({
  providedIn: 'root'
})
export class AppVotacionesService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  backendHost: string = "http://localhost:3000"; 
  
  private loginUrl = "/login";
  private eventosUrl = "/eventos";
  private nominadosUrl ="/eventos/:evento"

  constructor(private http: HttpClient, private router: Router) { }

  login(usuario: loginData) : Observable <any>{

    let url = this.backendHost+this.loginUrl
    return this.http.post<any>(url,usuario,this.httpOptions).pipe(tap(() => {}, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status == 401) {
          alert("Usuario no encontrado")
        }
        else {
          alert(err.statusText)
        }
      }
      else {
        console.log(err)
        alert("Error desconocido")
      }
    }))
  }

  getEventos(token: string): Observable<Evento[]> {
    let params = new HttpParams()
    params = params.set("user",token)

    let url = this.backendHost+this.eventosUrl;

    return this.http.get<Evento[]>(url,{params}).pipe(tap(() => {}, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status == 401) {
          alert("Usuario no auntenticado")
          this.router.navigate(["/login"])
        }
        else {
          alert(err.statusText)
        }
      }
      else {
        console.log(err)
        alert("Error desconocido")
      }
    }))
  }

  getNominados(token: string, evento: number): Observable<Nominado[]> {
    let params = new HttpParams()
    params = params.set("user",token)

    let url = this.backendHost+this.nominadosUrl;
    url = url.replace(":evento",String(evento))

    return this.http.get<Nominado[]>(url,{params}).pipe(tap(() => {}, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status == 401) {
          alert("Usuario no auntenticado")
          this.router.navigate(["/login"])
        }
        else {
          alert(err.statusText)
        }
      }
      else {
        console.log(err)
        alert("Error desconocido")
      }
    }))
  }
}