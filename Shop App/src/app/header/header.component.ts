import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userID: number | null = null;
  searchname: string = '';
  constructor(
    private auth: AuthService,
    private shopService: ShopService
  ) { }

  ngOnInit(): void {
    // Async
    this.auth.getUserId().subscribe({
      next: (nextUserId) => {
        this.userID = nextUserId;
      },
      complete: () => {
        console.log("Observable Died");
      }
    });
  }

  // onSearching(e: Event): void {
  //   this.shopService.setSearchKeyword((e.target as HTMLInputElement).value)
  // }

  onSearching(): void {
    this.shopService.setSearchKeyword(this.searchname)
  }

}
