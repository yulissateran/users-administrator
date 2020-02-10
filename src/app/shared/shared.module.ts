import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';



@NgModule({
  declarations: [HeaderComponent, ModalComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [HeaderComponent, ModalComponent]
})
export class SharedModule { }
