import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService, 
    private store: Store, private fb: FormBuilder, private modalService: NgbModal ) {

    //tramite service carico già la lista di articoli. da Undefined però
    this.loginService.retreiveAllUtenti()
  }

  //form creazione
  formCreazioneUtente:FormGroup
  formLoginUtente:FormGroup

  //modale
  closeResult = ''
  idUtenteInArrivoString:string
  idUtenteArrivoNumber:number

  open(content,idUtentePassed?:string) {

  console.log("id item --> ",idUtentePassed)

  //associo id passato a variabile stringa per comunicazione con db e a variabile numero per if in hmtl
  this.idUtenteInArrivoString = idUtentePassed
  this.idUtenteArrivoNumber=Number.parseInt(idUtentePassed)

  this.modalService.open(content, { size: 'xl'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    this.formCreazioneUtente.reset();
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

  ngOnInit(): void {

    this.formCreazioneUtente = this.fb.group({
      username : ['',Validators.required],
      password : ['',Validators.required],
      nome : ['',Validators.required],
      cognome : ['',Validators.required],
      dataNascitata : ['',Validators.required],
      sesso : ['',Validators.required],
      email : ['',Validators.required]
    })

    this.formLoginUtente = this.fb.group({
      username : ['',Validators.required],
      password : ['',Validators.required]
    })

  }

  creaUtente(){

    console.log("USERNAME-->",this.formCreazioneUtente.value.username)
    console.log("PASSWORD-->",this.formCreazioneUtente.value.password)
    console.log("NOME-->",this.formCreazioneUtente.value.nome)
    console.log("COGNOME-->",this.formCreazioneUtente.value.cognome)
    console.log("DATA NASCITA-->",this.formCreazioneUtente.value.dataNascitata)
    console.log("SESSO-->",this.formCreazioneUtente.value.sesso)
    console.log("EMAIL-->",this.formCreazioneUtente.value.email)

    this.loginService.createUtente(
      this.formCreazioneUtente.value.username,
      this.formCreazioneUtente.value.password,
      this.formCreazioneUtente.value.nome,
      this.formCreazioneUtente.value.cognome,
      this.formCreazioneUtente.value.dataNascitata,
      this.formCreazioneUtente.value.sesso,
      this.formCreazioneUtente.value.email
    )
  }

  loginUtente(){

    console.log("USERNAME-->",this.formLoginUtente.value.username)
    console.log("PASSWORD-->",this.formLoginUtente.value.password)

    this.loginService.loginUtente(
      this.formLoginUtente.value.username,
      this.formLoginUtente.value.password,
    )
  }

}
