import { deleteArticolo } from 'src/app/redux/redux-articolo/redux-articolo.actions';
import { Store, select } from '@ngrx/store';
import { PreferitiService } from './../services/preferiti.service';
import { Component, OnInit } from '@angular/core';
import { selectPreferiti } from 'src/app/redux/redux-preferito';

@Component({
  selector: 'app-preferiti',
  templateUrl: './preferiti.component.html',
  styleUrls: ['./preferiti.component.scss']
})
export class PreferitiComponent implements OnInit {

  constructor(private preferitiService : PreferitiService, private store :  Store) { 
    this.preferitiService.getAllPreferiti()
  }

  arrayPreferiti = []

  ngOnInit(): void {
    this.store.pipe(select(selectPreferiti)).subscribe((preferiti =>{
      this.arrayPreferiti = preferiti
    }))
  }

  trashArray = []
  contentEditable
  toggleEditable(event,id:number) {

    if ( event.target.checked ) {
        this.contentEditable = true;
        console.log("aggiunto")
        this.trashArray.push({
          idPreferito:id
        })
    }else{
      console.log("tolto item : " + id)
      this.contentEditable = false;
    
      const itemIndex = this.trashArray.findIndex(item=>{
        return (item.id == id)
      })
      this.trashArray.splice(itemIndex,1)
    }
   console.log("checked : "+this.contentEditable)
   console.log("trash array: "+JSON.stringify(this.trashArray))
  }

  deleteArticoli(){
    this.trashArray.forEach(item => {
      this.preferitiService.deleteArticolo(item.idPreferito)
      console.log("eliminato id : "+ item.idPreferito)
    })
  }

}
