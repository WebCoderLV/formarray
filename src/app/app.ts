import { Component, signal } from '@angular/core';
import { FormArray } from './form-array/form-array';

@Component({
  selector: 'app-root',
  imports: [FormArray],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('formarray');
}
