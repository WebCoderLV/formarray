import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-array',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './form-array.html',
  styleUrl: './form-array.css',
})
export class FormArray {
  fb = inject(FormBuilder);

  // Funkcija, kas izveido tukšu FormGroup
  private createItemFormGroup() {
    return this.fb.group({
      name: [''],
      quantity: [0],
    });
  }

  // Definējam Formas masīvu
  itemsArray = this.fb.array([this.createItemFormGroup()]);

  // No masīva izveidojam formu
  reactiveForm = this.fb.group({
    items: this.itemsArray,
  });

  // Signāls, kurā ir visu kontroļu masīvs un kuru izmantosim view
  // View tiek atkārtoti renderēts, ja signāls tiek izmainīts
  itemControls = signal(this.itemsArray.controls);

  addItem() {
    // Pievieno tukšu kontroļu rindu
    this.itemsArray.push(this.createItemFormGroup());
    // Atjaunina signālu
    this.itemControls.set([...this.itemsArray.controls]);
  }

  removeItem(index: number) {
    // Noņem kontroļu rindu pēc indeksa
    this.itemsArray.removeAt(index);
    // Atjaunina signālu
    this.itemControls.set([...this.itemsArray.controls]);
  }

  onSubmit() {
    console.log(this.reactiveForm.value);
  }
}
