import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect-articolo',
  templateUrl: './redirect-articolo.component.html',
  styleUrls: ['./redirect-articolo.component.scss']
})
export class RedirectArticoloComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
    this.router.navigateByUrl("articoli")
  }

}
