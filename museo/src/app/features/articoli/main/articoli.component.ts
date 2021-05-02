import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { selectArticoli } from 'src/app/redux/redux-articolo';
import { PreferitiService } from '../../preferiti/services/preferiti.service';
import { ArticoliService } from '../services/articoli.service';

@Component({
  selector: 'app-articoli',
  templateUrl: './articoli.component.html',
  styleUrls: ['./articoli.component.scss']
})
export class ArticoliComponent implements OnInit {

  constructor(private router: Router, private articoliService: ArticoliService,
    private store: Store, private fb: FormBuilder, private modalService: NgbModal,
    private preferitiService: PreferitiService) {

    //tramite service carico già la lista di articoli. da Undefined però
    this.articoliService.retreiveAllArticoli()
  }

  //form creazione
  formCreazioneArticolo: FormGroup

  //modale
  closeResult = ''
  idItemInArrivoString: string
  idItemArrivoNumber: number

  //per caricamento file immagine
  url: string | ArrayBuffer;

  statusClass = 'non-preferito'

  open(content, idItemPassed?: string) {

    console.log("id item --> ", idItemPassed)

    //associo id passato a variabile stringa per comunicazione con db e a variabile numero per if in hmtl
    this.idItemInArrivoString = idItemPassed
    this.idItemArrivoNumber = Number.parseInt(idItemPassed)

    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.formCreazioneArticolo.reset();
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a BACKDROP';
    } else {
      return `with: ${reason}`;
    }
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }

  termFormRicerca: FormGroup
  term
  arrayArticoli = []
  arrayArticoliFiltrati = []

  ngOnInit(): void {

    this.store.pipe(select(selectArticoli)).subscribe((articoli) => {

      this.arrayArticoli = articoli
      console.log(this.arrayArticoli)

    })

    this.termFormRicerca = this.fb.group({
      term: ['', Validators.required]
    })

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
      .subscribe(value => {
        this.filtra(this.evento) //chiamo la funzione filtra passandogli il termine cercato
      });
  }

  trashArray = []
  contentEditable

  toggleEditable(event, id: number) {

    if (event.target.checked) {
      this.contentEditable = true;
      console.log("aggiunto")
      this.trashArray.push({
        idArticolo: id
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

  //per ogni articolo presente del trashArray lo elimino singolarmente
  deleteArticoli() {
    this.trashArray.forEach(item => {
      this.articoliService.deleteArticolo(item.idArticolo)
      console.log("eliminato id : " + item.idArticolo)
    })
  }

  //aggiungo ai preferiti l'articolo
  addToPreferiti(idArticoloPassato: number) {
    this.preferitiService.addToPreferiti(1, idArticoloPassato)
    console.log(sessionStorage.getItem("errore-preferito"))
  }

  termine = ''
  isVuoto: Boolean
  filtra(event: any) {
    this.isVuoto = false
    this.arrayArticoliFiltrati = []
    this.termine = event

    this.arrayArticoli.forEach(articolo => {
      if ((articolo.marca).includes(this.termine) ||
        (String(articolo.id)).includes(this.termine) ||
        (articolo.modello).includes(this.termine) ||
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


    if (this.arrayArticoliFiltrati.length === 0) {
      this.isVuoto = true
    }
    console.log(this.isVuoto)
    console.log(this.arrayArticoliFiltrati)
    console.log(this.termine)
    console.log("event " + event)
    this.termine = event
  }




}
