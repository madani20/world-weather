import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  // Gère les erreurs de l'API
  handlerError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error was occured!'

    if(error.error instanceof ErrorEvent) {
      //Erreur côté client ou réseau
      errorMessage = `Client-side error: ${error.error.message}`
    }else {
      //Erreur côté serveur
      errorMessage = `Server-side error: Code ${error.status}, Message: ${error.message}`
    }

    //Log l'erreur dans la console (pour les dév)
    console.error(errorMessage)

    //Retourne un message d'erreur lisible
    return throwError( () => new Error(errorMessage))

  }
}
