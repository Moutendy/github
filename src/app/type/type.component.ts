import { Component, OnInit } from '@angular/core';
import {TypeService} from "../serviceType/type.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {

  typesAppliance :Object |any;
  typesApplianceid:any;
  modal:boolean=false;
  constructor(public servicetypeservice:TypeService) { }

  ngOnInit(): void
  {
    this.getTypeC();
  }
//afficher les types d'appliances
  getTypeC()
  {
    this.servicetypeservice.ServiceGetType().subscribe(data=>{

      this.typesAppliance=data;
      console.log(this.typesAppliance);
    },error => {
      console.log(error);})
  }

//ajouter les types d'appliances
  postType(libelle:any)
  {

    this.servicetypeservice.ServiceostType(libelle.value).pipe(take(1)).subscribe();
    libelle.reset();
    setTimeout(()=>{this.getTypeC()}, 50);


  }

  //Afficher des types d'appliances
  miseAjour(typeA: any)
  {
    console.log(typeA);
    this.typesApplianceid=typeA;
    console.log(this.typesApplianceid);
    this.modal=true;
  }

//mise a jour des types d'appliances
  getid(_id:any,_libelle:any)
  {

    this.servicetypeservice.identifVu(_id,_libelle).pipe(take(1)).subscribe();
    console.log(_libelle);
    this.modal=false;

  }

  //suppression de type d'appliance
  suppression(idtype:any)
  {

    this.servicetypeservice.supprimertype(idtype).pipe(take(1)).subscribe();
    setTimeout(()=>{this.getTypeC()}, 50);
  }

}
