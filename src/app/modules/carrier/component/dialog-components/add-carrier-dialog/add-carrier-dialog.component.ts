import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetUserByRefreshTokenResponseDtoModel } from 'src/app/modules/user/models/response/get-user-by-refresh-token-response-dto-model';
import { UserService } from 'src/app/modules/user/services/user.service';
import { CreateCarrierRequestDto } from '../../../models/create-carrier-request-dto';
import { CarrierService } from '../../../services/carrier.service';
import { ToastrService } from 'ngx-toastr';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-add-carrier-dialog',
  templateUrl: './add-carrier-dialog.component.html',
  styleUrls: ['./add-carrier-dialog.component.css']
})
export class AddCarrierDialogComponent implements OnInit {
  carrierForm!: FormGroup;
  getUserFromAuthByDtoModel!: GetUserByRefreshTokenResponseDtoModel;

  constructor(private formBuilder: FormBuilder,private userService:UserService,private carrierService:CarrierService,private toastrService:ToastrService,private dialogRef:DialogRef) { }

  ngOnInit(): void {
    this.getUserFromAuthByDto();
    this.createForm();
  }

  createForm() {
    this.carrierForm = this.formBuilder.group({
      identityNumber: ["", Validators.required],
      firstName: ["", Validators.required],
      middleName: [""],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", Validators.required],
      birthDate: [new Date(), Validators.required]
    });
  }

  createCarrier() {
    if (this.carrierForm.valid) {
      const formValue = this.carrierForm.value;
  
      // Date nesnesini 'yyyy-MM-dd' formatına çevir
      const formattedBirthDate = this.formatDate(formValue.birthDate);
  
      const newCarrier: CreateCarrierRequestDto = {
        ...formValue,
        birthDate: formattedBirthDate,
        createdById: this.getUserFromAuthByDtoModel.userId,
      };
  
      this.carrierService.createCarrier(newCarrier).subscribe({
        next:(response) => {
          this.toastrService.success(response.message);
          this.dialogRef.close();
        },
        error: (error) => {
          this.toastrService.error(error.error);
          this.dialogRef.close();
          console.log(error)
          }
      });
    } else {
      console.log("Form is not valid.");
    }
  }
  
  private formatDate(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  

  getUserFromAuthByDto() {
    this.userService.getUserFromAuthByDto().subscribe((response) => {
      this.getUserFromAuthByDtoModel = response.data;
    }); 
  }
  
}
