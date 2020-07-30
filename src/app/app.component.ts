// import * as CryptoJS from 'crypto-js';
import { Component, /*AfterViewInit,*/ ViewChild, OnInit, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements /*AfterViewInit,*/ OnInit {
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }
  
  title = 'lumia';
  user:string;
  user_pass:string;
  player:string;
  campaign:string;
  check_Pass:string;

  //Conexion
  servidor:string  ="http://localhost:8080/"; 
  url:string;
  lumiaWS:string    ="Lumia-Server/";

  //Interface view
  mainLoginClass:string;
  signLoginClass:string;
  marcajeClass:string="hide";
  errorClass:string="hide";
  errorMsx:string;
  
  //Child view
  @ViewChild('error_viewable') errorEl: ElementRef;

  //Child Variables
  mainSignIn={};

  //Child Data
  receiveMainSignIn($event) {

    // if(this.mainSignIn['envio']=="hmarcaje"){

    // }

    ///console.log("recibiendo");
    this.mainSignIn= $event;
    ///console.log(this.mainLoginData);
    ///console.log(this.mainLoginData['user_pass']);
    this.user         =this.mainSignIn['user'];
    this.player       =this.mainSignIn['player'];
    this.campaign     =this.mainSignIn['campaign'];
    ///console.log(this.cd_empresa);
    this.errorClass="hide";

    this.validateUser()

    }

    validateUser(){ //REV
      // WS Connection
  
      this.url = this.servidor+this.lumiaWS+"LoginServices/validateUser";
  
      var json =JSON.stringify(  {
        "user": this.user,
        "pass": this.user_pass,
        // "encrypt": true
      });
  
      console.log("json validateUser "); 
      //console.log("json validateUser "+json); 
  
      const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })} 
  
      this.http.post(this.url,json,options).subscribe(
  
        data  => {
          ///console.log("POST validateUser ", this.url, data);
  
          ///console.log("checkErrors: ", data["error"] );
          //Check errors
          if(data["error"] || !data || JSON.stringify(data)=="{}"){
            ///console.log("inside error");
  
            if( JSON.stringify(data)!="{}" && data["error"].includes("Error con los datos") ){ //String(data["error"]).includes("Usuario sin operario asignado")
              ///console.log("no operator assigned");
  
            
              return;
            } else {
              console.log("validation error");
  
              if(JSON.stringify(data)=="{}" || data["error"]=="[object Object]") {
                this.showError("Error accediendo al servidor");
                return;
              }
              this.showError(data["error"]);
  
              return;
            }
          } else 
  
          //GetData
          if(data["user_ok"] && data["user_ok"]==true){
            // this.nombre_empresa=data["nombre_empresa"]; pagina user
          } else if (data["error"]) {
            this.showError( data["error"] );
  
            /*try {
              var criptPass =CryptoJS.SHA256(data["contrasenha_operario"]).toString() ;
                //CryptoJS.AES.encrypt(JSON.stringify(this.mainForm.controls.user_pass.value), criptPass).toString();
            } catch (e) {
              console.log(e);
            }
            console.log("cript ", criptPass);
        
            this.check_opPass=criptPass;*/
  
            //REV - codificar en servidor
            //Encrypt
            // var val = data["contrasenha_operario"];; //assign password to a variable
            // var rkEncryptionKey = CryptoJS.enc.Base64.parse('u/Gu5posvwDsXUnV5Zaq4g==');
            // var rkEncryptionIv = CryptoJS.enc.Base64.parse('5D9r9ZVzEYYgha93/aUK2w==');
            // var utf8Stringified = CryptoJS.enc.Utf8.parse(val);
            // var encrypted = CryptoJS.AES.encrypt(utf8Stringified.toString(), rkEncryptionKey, 
            // {mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: rkEncryptionIv});
            // this.check_Pass = encrypted.ciphertext.toString(CryptoJS.enc.Base64);  
  
            //this.check_opPass=data["contrasenha_operario"];
  
            return;
          }
  
          return;
        },
  
        error  => {
          ///console.log("Error conectando ", error);
          
          this.showError("Error accediendo al servidor");
  
          return;
        });
    
      return true;
    }
  
    showError( error:string ){
      this.errorMsx=error;
      this.errorClass="ok";
      /*var error_viewable: HTMLElement;
      error_viewable.scrollIntoView();*/
      this.errorEl.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      //this.errorEl.nativeElement.scrollIntoViewIfNeeded();
  }


  }