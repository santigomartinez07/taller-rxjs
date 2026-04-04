import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  username: string = '';

  @Output() search = new EventEmitter<string>();

  onSubmit(searchForm: any): void {
    if (searchForm.valid && this.username.trim() !== '') {
      this.search.emit(this.username.trim());
    }
  }
}
