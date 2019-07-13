import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-media-details',
  templateUrl: './media-details.component.html',
  styleUrls: ['./media-details.component.css']
})
export class MediaDetailsComponent implements OnInit {
  mediaId;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(x => this.mediaId = x.get('detailsId'))
  }

}
