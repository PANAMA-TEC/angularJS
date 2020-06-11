import { Component, OnInit } from '@angular/core';
import { Path } from '../../config';
import { ProductosService } from '../../servicios/productos.service'

@Component({
  selector: 'app-header-promotion',
  templateUrl: './header-promotion.component.html',
  styleUrls: ['./header-promotion.component.css']
})
export class HeaderPromotionComponent implements OnInit {

	path:String = Path.url;
	top_banner:Object = null;
	preload:Boolean = false;
	
	constructor( private productService: ProductosService ) { }

	ngOnInit(): void {
		this.preload = true;
		this.productService.getData()
			.subscribe(resp => {
				//para traer la informacion de la base de dato y desplegarlo en consola
				//console.log("respuesta del sistema: ", resp[Object.keys(resp)[3]]);

				let i;
				let size = 0;

				for (i in resp){
					size++
				}
				let index = Math.floor(Math.random()*size);

				//console.log ("Index : " ,index);
				//console.log("Size: ",size);

				this.top_banner = JSON.parse(resp[Object.keys(resp)[index]].top_banner);

				//console.log(this.top_banner);
				this.preload = false;


			})

			
	}

}
