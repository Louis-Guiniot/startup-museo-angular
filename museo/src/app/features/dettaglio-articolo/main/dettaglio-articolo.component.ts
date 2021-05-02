import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Articolo } from 'src/app/core/model/model-data/articolo.interface';
import { selectArticoli } from 'src/app/redux/redux-articolo';
import { ArticoliService } from './../../articoli/services/articoli.service';

@Component({
  selector: 'app-dettaglio-articolo',
  templateUrl: './dettaglio-articolo.component.html',
  styleUrls: ['./dettaglio-articolo.component.scss']
})
export class DettaglioArticoloComponent implements OnInit {

  constructor(private router: Router, private store: Store, private articoliService: ArticoliService,
    public route: ActivatedRoute) {
    //tramite service carico già la lista di articoli. da Undefined però
    this.articoliService.retreiveAllArticoli()
  }


  idItem
  location
  arrayArticoli = []
  item: Articolo

  ngOnInit() {
    this.idItem = Number(this.route.snapshot.paramMap.get('id')); //get id parameter
    this.location = Number(this.route.snapshot.paramMap.get('location')); //get id parameter

    console.log("id selezionato : " + this.idItem)

    this.store.pipe(select(selectArticoli)).subscribe((articoli) => {

      this.arrayArticoli = articoli

      console.log(this.arrayArticoli)

      this.arrayArticoli.forEach(item => {
        if (item.id == this.idItem) {
          this.item = item
          console.log(this.item)
          console.log("trovato" + this.item.modello)
        }
      })

    })

  }

  //tramite redux prendo lista articoli presenti su db. su html accedo tramite for di lista_articoli
  // get lista_articoli(): Observable<Articolo[]> {
  //   return this.store.pipe(select(selectArticoli))
  // }

  goHome() {
    this.router.navigateByUrl("articoli")

  }

  goList() {
    if (this.location == 0) {
      this.router.navigateByUrl("articoli")

    } else {
      this.router.navigateByUrl("articoli/preferiti")

    }
  }
}
