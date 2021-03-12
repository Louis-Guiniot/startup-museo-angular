import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectArticoli } from 'src/app/redux/redux-articolo';
import { Articolo } from 'src/app/core/model/model-data/articolo.interface';
import { ArticoliService } from '../services/articoli.service';
import { NgbModal, ModalDismissReasons, NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { PreferitiService } from '../../preferiti/services/preferiti.service';

@Component({
  selector: 'app-articoli',
  templateUrl: './articoli.component.html',
  styleUrls: ['./articoli.component.scss']
})
export class ArticoliComponent implements OnInit {

  constructor(private router: Router, private articoliService: ArticoliService, 
              private store: Store, private fb: FormBuilder, private modalService: NgbModal,
              private preferitiService: PreferitiService ) {
    
    //tramite service carico già la lista di articoli. da Undefined però
    this.articoliService.retreiveAllArticoli()
  }

  //form creazione
  formCreazioneArticolo:FormGroup

  //modale
  closeResult = ''
  idItemInArrivoString:string
  idItemArrivoNumber:number

  //per caricamento file immagine
  url: string | ArrayBuffer;

  statusClass = 'non-preferito'

  open(content,idItemPassed?:string) {

    console.log("id item --> ",idItemPassed)

    //associo id passato a variabile stringa per comunicazione con db e a variabile numero per if in hmtl
    this.idItemInArrivoString = idItemPassed
    this.idItemArrivoNumber=Number.parseInt(idItemPassed)
    
    this.modalService.open(content, { size: 'xl'}).result.then((result) => {
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

  ngOnInit(): void {
    this.formCreazioneArticolo = this.fb.group({
      modello: ['', Validators.required],
      marca: ['', Validators.required],
      descrizione: ['', Validators.required],
      nazionalita: ['', Validators.required],
      ram: ['', Validators.required],
      processore: ['', Validators.required],
      schedaVideo: ['', Validators.required],
      schedaMadre: ['', Validators.required],
      annoProduzioneInizio: ['', Validators.required],
      annoProduzioneFine: ['', Validators.required],
      //foto: ['', Validators.required],
    })
  }

  //tramite redux prendo lista articoli presenti su db. su html accedo tramite for di lista_articoli
  get lista_articoli(): Observable<Articolo[]> {
    return this.store.pipe(select(selectArticoli))
  }

  creaArticolo(){
    console.log(this.formCreazioneArticolo.value.modello)
    console.log(this.formCreazioneArticolo.value.marca)
    console.log(this.formCreazioneArticolo.value.descrizione)
    console.log(this.formCreazioneArticolo.value.nazionalita)
    console.log(this.formCreazioneArticolo.value.ram)
    console.log(this.formCreazioneArticolo.value.processore)
    console.log(this.formCreazioneArticolo.value.schedaMadre)
    console.log(this.formCreazioneArticolo.value.schedaVideo)
    console.log(this.formCreazioneArticolo.value.annoProduzioneInizio)
    console.log(this.formCreazioneArticolo.value.annoProduzioneFine)
  //  console.log(this.formCreazioneArticolo.value.foto)

    this.articoliService.createArticolo(      
      this.formCreazioneArticolo.value.modello,
      this.formCreazioneArticolo.value.marca,
      this.formCreazioneArticolo.value.descrizione,
      this.formCreazioneArticolo.value.nazionalita,
      this.formCreazioneArticolo.value.ram,
      this.formCreazioneArticolo.value.processore,
      this.formCreazioneArticolo.value.schedaMadre,
      this.formCreazioneArticolo.value.schedaVideo,
      this.formCreazioneArticolo.value.annoProduzioneInizio,
      this.formCreazioneArticolo.value.annoProduzioneFine,
      this.url)

  }

  aggiornaArticolo(){
    console.log(this.formCreazioneArticolo.value.modello)
    console.log(this.formCreazioneArticolo.value.marca)
    console.log(this.formCreazioneArticolo.value.descrizione)
    console.log(this.formCreazioneArticolo.value.nazionalita)
    console.log(this.formCreazioneArticolo.value.ram)
    console.log(this.formCreazioneArticolo.value.processore)
    console.log(this.formCreazioneArticolo.value.schedaMadre)
    console.log(this.formCreazioneArticolo.value.schedaVideo)
    console.log(this.formCreazioneArticolo.value.annoProduzioneInizio)
    console.log(this.formCreazioneArticolo.value.annoProduzioneFine)
   // console.log(this.formCreazioneArticolo.value.foto)

    //chiamo metodo service per mandare richiesta update articolo
    this.articoliService.updateArticolo(
      this.idItemInArrivoString,      
      this.formCreazioneArticolo.value.modello,
      this.formCreazioneArticolo.value.marca,
      this.formCreazioneArticolo.value.descrizione,
      this.formCreazioneArticolo.value.nazionalita,
      this.formCreazioneArticolo.value.ram,
      this.formCreazioneArticolo.value.processore,
      this.formCreazioneArticolo.value.schedaMadre,
      this.formCreazioneArticolo.value.schedaVideo,
      this.formCreazioneArticolo.value.annoProduzioneInizio,
      this.formCreazioneArticolo.value.annoProduzioneFine,
      this.url)
  }

  eliminazione(){
    console.log("id item da eliminare --> ", this.idItemInArrivoString)
    this.articoliService.deleteArticolo(this.idItemInArrivoString)
  }

  setPreferito(){
    this.statusClass = 'preferito'
  }

  changeColor = [false];

  // addToPrefer(){
  //   this.preferitiService.addToPreferiti()
  // }
  
}
