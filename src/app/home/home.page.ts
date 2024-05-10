import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  

  constructor() {}

  ngOnInit(): void {
    Camera.requestPermissions();  
  }

  imagenParaMostrar:string="";
  photo: Photo | undefined;
  imagenTomada:any; 
  
  async getPicture() {
    this.imagenTomada = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
      source:CameraSource.Camera,
      saveToGallery: true
    });
    
    if(this.imagenTomada){
			this.imagenParaMostrar = this.imagenTomada.webPath
    }
  }

  async openGallery() {
    try {
      const galleryPhoto = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos
      });

      if (galleryPhoto && galleryPhoto.webPath) {
        this.photo = galleryPhoto;
        this.imagenParaMostrar = galleryPhoto.webPath;
      } else {
        console.error("No se seleccionó ninguna imagen de la galería.");
      }
    } catch (e) {
      console.error("Error al abrir la galería de imágenes:", e);
    }
  }
}
