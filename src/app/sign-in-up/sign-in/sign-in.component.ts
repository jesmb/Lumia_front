import { Component, ViewChild, OnInit, ElementRef, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {

  signinupForm: FormGroup;
  signup_mode:string="hide";

  @Output() messageEvent = new EventEmitter<object>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges) {

  }


  ngOnInit(): void {

    this.signinupForm = this.formBuilder.group({
      user_name:'',
      user_pass:'',
      player_name:'',
      notes: ''
      //name: ['', [Validators.required, Validators.minLength(3)]],
      //addresses: this.fb.array([this.buildAddress()])
    })

  }
  
  //Botones
  SignInbt(){
    /*this.cd_operator=String(this.loginForm.get(this.cd_operator));
    this.operator_pass=String(this.loginForm.get(this.operator_pass));*/

    if(!this.signinupForm.controls.user_name.value || !this.signinupForm.controls.user_pass.value){
      //error
      var errorMsg={
        "envio": "error",
        "errorMsg": "Debe cubrir todos los campos",
      };
  
      ///console.log(errorMsg);
  
      this.messageEvent.emit(errorMsg);
      return;
      
    }

    if(!this.signinupForm.controls.envio.value){
      this.signinupForm.controls.envio.setValue("checkPass");
      ///console.log("Reset formData", this.loginDelForm.controls.envio.value);
    }

    //Encrypt
    // var val = this.signinupForm.controls.operator_pass.value; //assign password to a variable
    // var rkEncryptionKey = CryptoJS.enc.Base64.parse('u/Gu5posvwDsXUnV5Zaq4g==');
    // var rkEncryptionIv = CryptoJS.enc.Base64.parse('5D9r9ZVzEYYgha93/aUK2w==');
    // var utf8Stringified = CryptoJS.enc.Utf8.parse(val);
    // var encrypted = CryptoJS.AES.encrypt(utf8Stringified.toString(), rkEncryptionKey, 
    // {mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: rkEncryptionIv});
    // var encryptPass = encrypted.ciphertext.toString(CryptoJS.enc.Base64);  
    
    var json =(  {
      "user": this.signinupForm.controls.user.value,
      "pass": this.signinupForm.controls.pass.value,
      // "pass": encryptPass,
      // "encrypt": true,
      "envio":'checkPass', 
    });

    ///console.log(JSON.stringify(json));
    ///console.log( this.loginDelForm.value );
    this.messageEvent.emit(json);

    //this.messageEvent.emit(this.loginDelForm.value);
    return;
  }
  

}
