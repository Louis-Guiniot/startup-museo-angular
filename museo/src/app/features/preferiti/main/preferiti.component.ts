import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { selectPreferiti } from 'src/app/redux/redux-preferito';
import { PreferitiService } from './../services/preferiti.service';

@Component({
  selector: 'app-preferiti',
  templateUrl: './preferiti.component.html',
  styleUrls: ['./preferiti.component.scss']
})
export class PreferitiComponent implements OnInit {

  constructor(private preferitiService: PreferitiService, private store: Store) {
    this.preferitiService.getAllPreferiti()
  }

  arrayPreferiti = []
  arrayArticoliFiltrati = []

  ngOnInit(): void {
    this.store.pipe(select(selectPreferiti)).subscribe((preferiti => {
      this.arrayPreferiti = preferiti
    }))
  }

  evento = '' //dichiaro variabile evento per gestire visualizzazione in html
  @ViewChild('input') input: ElementRef; //prendo il valore di input da html
  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged(),
        tap((event: KeyboardEvent) => {

          //attribuisco ad evento il valore della input
          this.evento = this.input.nativeElement.value
          // console.log(this.evento)
        })
      )
      .subscribe(
        //   value =>{
        //   this.filtra(this.evento) //chiamo la funzione filtra passandogli il termine cercato
        // }
      );
  }

  trashArray = []
  contentEditable
  toggleEditable(event, id: number) {

    if (event.target.checked) {
      this.contentEditable = true;
      console.log("aggiunto")
      this.trashArray.push({
        idPreferito: id
      })
    } else {
      console.log("tolto item : " + id)
      this.contentEditable = false;

      const itemIndex = this.trashArray.findIndex(item => {
        return (item.id == id)
      })
      this.trashArray.splice(itemIndex, 1)
    }
    console.log("checked : " + this.contentEditable)
    console.log("trash array: " + JSON.stringify(this.trashArray))
  }

  deleteArticoli() {
    this.trashArray.forEach(item => {
      this.preferitiService.deletePreferito(item.idPreferito)
      console.log("eliminato id : " + item.idPreferito)
    })
  }

  termine = ''
  isVuoto = false
  filtra(event: any) {
    this.arrayArticoliFiltrati = []
    this.termine = event
    this.arrayPreferiti.forEach(articolo => {
      if ((articolo.marca).includes(this.termine) ||
        (String(articolo.id)).includes(this.termine) ||
        // (articolo.modello).includes(this.termine) ||
        (articolo.schedaMadre).includes(this.termine) ||
        (articolo.schedaVideo).includes(this.termine) ||
        (articolo.stato).includes(this.termine) ||
        (articolo.nazionalita).includes(this.termine) ||
        (articolo.descrizione).includes(this.termine) ||
        (articolo.ram).includes(this.termine) ||
        (articolo.processore).includes(this.termine) ||
        (articolo.annoProduzioneInizio).includes(this.termine) ||
        (articolo.annoProduzioneFine).includes(this.termine) ||
        (String(articolo.numeroSerie)).includes(this.termine)
      ) {
        this.arrayArticoliFiltrati.push(articolo)
      }
    })


    if (this.arrayArticoliFiltrati.length == 0) {
      this.isVuoto = true
    }
    console.log(this.isVuoto)
    console.log(this.arrayArticoliFiltrati)
    console.log(this.termine)
    console.log("event " + event)
    this.termine = event
  }

}
