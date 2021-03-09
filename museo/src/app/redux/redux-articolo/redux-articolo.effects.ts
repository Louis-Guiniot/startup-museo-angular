import { Action } from "@ngrx/store";
import { createArticolo, deleteArticolo, initArticoli, retreiveAllArticoli, updateArticolo } from "./redux-articolo.actions";
import { Response } from 'src/core/model/response.interface';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { switchMap, map, tap } from "rxjs/operators";
import { HttpCommunicationsService } from "src/core/http/http-communications.service";


@Injectable()
export class ArticoloEffects {
    retreiveAllArticles() {
        throw new Error("Method not implemented.");
    }

    constructor(private actions$: Actions, private http: HttpCommunicationsService, private router: Router) { }

    retreiveAllArticoli(): Observable<Response> {
        return this.http.retrieveGetCall<Response>("articolo/findAll");
    }

    
    createArticolo(
        modello:string,
        marca:string,
        descrizione:string,
        nazionalita:string,
        ram:string,
        processore:string,
        schedaMadre:string,
        schedaVideo:string,
        annoProduzioneInizio:string,
        annoProduzioneFine:string,
        foto:string
    ): Observable<Response>{
        return this.http.retrievePostCall<Response>('articolo/create',{
            modello, marca, descrizione, nazionalita, 
            ram, processore, schedaMadre, schedaVideo, 
            annoProduzioneInizio, annoProduzioneFine, foto});
    }

    findUpdateArticolo(
        id:string,
        modello:string,
        marca:string,
        descrizione:string,
        nazionalita:string,
        ram:string,
        processore:string,
        schedaMadre:string,
        schedaVideo:string,
        annoProduzioneInizio:string,
        annoProduzioneFine:string,
        foto:string
    ){
        return this.http.retrievePostCall<Response>('articolo/update',{id, modello, marca, descrizione, nazionalita, 
            ram, processore, schedaMadre, schedaVideo, 
            annoProduzioneInizio, annoProduzioneFine, foto});
    }

    deleteArticolo(id: string): Observable<Response>{
        console.log(this.http.retrievePostCall<Response>('articolo/delete',{id}));
        return this.http.retrievePostCall<Response>('articolo/delete',{id});
    }

    findUpdateArticolo$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(updateArticolo),
        switchMap((action) => this.findUpdateArticolo(
            action.id,
            action.modello,
            action.marca,
            action.descrizione,
            action.nazionalita,
            action.ram,
            action.processore,
            action.schedaMadre,
            action.schedaVideo,
            action.annoProduzioneInizio,
            action.annoProduzioneFine,
            action.foto).pipe(
            map((response) => initArticoli({ response }))
            ,tap(()=>this.router.navigateByUrl('/redirectArticolo'))
        ))
    ));

    deleteArticolo$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(deleteArticolo),
        switchMap((action) => this.deleteArticolo(
            action.id).pipe(
            map((response) => initArticoli({ response }))
            ,tap(()=>this.router.navigateByUrl('/redirectArticolo'))
        ))
    ));

    getAllArticoli$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(retreiveAllArticoli),
        switchMap(() => this.retreiveAllArticoli().pipe(
            map((response) => initArticoli({ response }))
        ))
    ));

    createArticolo$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(createArticolo),
        switchMap((action) => this.createArticolo(
            action.modello,
            action.marca,
            action.descrizione,
            action.nazionalita,
            action.ram,
            action.processore,
            action.schedaMadre,
            action.schedaVideo,
            action.annoProduzioneInizio,
            action.annoProduzioneFine,
            action.foto).pipe(
            map((response) => initArticoli({ response }))
            ,tap(()=>this.router.navigateByUrl('/redirectArticolo'))
        ))
    ));
}

