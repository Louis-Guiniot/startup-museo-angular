import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { LoginService } from '../../login/services/login.service';
import { LoginAdminService } from '../services/login-admin.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {

  constructor(private router: Router, private loginAdminService: LoginAdminService, 
    private store: Store, private fb: FormBuilder, private modalService: NgbModal ) {

    //tramite service carico già la lista di articoli. da Undefined però
    this.loginAdminService.retreiveAllAdmins()
  }

  //form creazione
  formCreazioneAdmin:FormGroup
  formLoginAdmin:FormGroup

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
    this.formCreazioneAdmin.reset();
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

    this.formCreazioneAdmin = this.fb.group({
      username : ['',Validators.required],
      password : ['',Validators.required],
      roles : ['',Validators.required],
    })

    this.formLoginAdmin = this.fb.group({
      username : ['',Validators.required],
      password : ['',Validators.required]
    })

  }

  creaAdmin(){

    console.log("USERNAME-->",this.formCreazioneAdmin.value.username)
    console.log("PASSWORD-->",this.formCreazioneAdmin.value.password)
    console.log("ROLES-->",this.formCreazioneAdmin.value.roles)

    this.loginAdminService.createAdmin(
      this.formCreazioneAdmin.value.username,
      this.formCreazioneAdmin.value.password,
      this.formCreazioneAdmin.value.roles,
    )
  }

  loginAdmin(){

    console.log("USERNAME-->",this.formLoginAdmin.value.username)
    console.log("PASSWORD-->",this.formLoginAdmin.value.password)

    this.loginAdminService.loginAdmin(
      this.formLoginAdmin.value.username,
      this.formLoginAdmin.value.password,
    )
  }

}
