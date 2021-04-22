import { ArticoliService } from './../../articoli/services/articoli.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crea-articolo',
  templateUrl: './crea-articolo.component.html',
  styleUrls: ['./crea-articolo.component.scss']
})
export class CreaArticoloComponent implements OnInit {

  constructor(
    private router : Router,
    private fb : FormBuilder,
    private articoliService : ArticoliService
  ) { }

  formCreazioneArticolo : FormGroup
  //per caricamento file immagine
  url: string | ArrayBuffer;

  ngOnInit() {

    this.formCreazioneArticolo = this.fb.group({
      modello: ['', Validators.required],
      numeroSerie: ['', Validators.required],
      marca: ['', Validators.required],
      descrizione: ['', Validators.required],
      nazionalita: ['', Validators.required],
      ram: ['', Validators.required],
      processore: ['', Validators.required],
      schedaVideo: ['', Validators.required],
      schedaMadre: ['', Validators.required],
      annoProduzioneInizio: ['', Validators.required],
      annoProduzioneFine: ['', Validators.required],
      stato: ['', Validators.required],
      //foto: ['', Validators.required],
    })
  }

  goList(){
    this.router.navigateByUrl("articoli")
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
    console.log(this.formCreazioneArticolo.value.stato)
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
      this.url,
      this.formCreazioneArticolo.value.stato)

  }


  annulla(){
    this.formCreazioneArticolo.reset()
  }

}
