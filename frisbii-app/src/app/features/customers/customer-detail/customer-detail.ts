import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  templateUrl: './customer-detail.html',
  styleUrl: './customer-detail.scss',
})
export class CustomerDetailComponent {
  private route = inject(ActivatedRoute);

  readonly handle = toSignal(this.route.paramMap.pipe(map((params) => params.get('handle'))));
}
