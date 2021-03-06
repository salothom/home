import { Component, OnInit, Input } from '@angular/core';
import * as musicJson from './music.json';
import * as bookJson from './books.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../app.component.css']
})
export class HomeComponent implements OnInit {

  // @Input() button: Button;

  constructor() { }
  mainShow = "About";

  //music
  showContent: boolean = true;//"1950s": "113",  removing this for now?
  musicList = musicJson.albums;
  filteredMusicList = musicJson.albums;
  filterBy = [];

  //books
  bookList = bookJson.books;
  genreList = ["Spy Fiction", "Non-Fiction", "Science Fiction", "Novel", "Short Stories", "Economics", "True Crime", "Fantasy"];
  filteredList = bookJson.books;
  filterByBooks = [];
  totalScored: number;
  toggleMobile: boolean = false;

  ngOnInit() {
    this.countReviewed();
  }

  countReviewed() {
    this.totalScored = this.musicList.filter(function (value) { return value.score }).length;
  }

  mobileMenu() {
    console.log("sdk");
    if (this.toggleMobile) {
      document.getElementById("mobileNav").style.width = "0%";
      document.getElementById("greyMobileNav").style.width = "0%";

      this.toggleMobile = false;
    } else {
      document.getElementById("greyMobileNav").style.width = "100%";
      document.getElementById("mobileNav").style.width = "50%";
      this.toggleMobile = true;
    }


  }
  setWidth(pages){
    console.log("page", pages);

    return 50;
  }

  keySearch(event: any) {

    // console.log(this.musicList);
    let keyLength = event.target.value.length;
    let wordSearch = event.target.value.toLowerCase()

    this.filteredMusicList = this.musicList.filter(d =>
      d.genre.substring(0, keyLength).toLowerCase() === wordSearch ||
      d.score.toString().substring(0, keyLength).toLowerCase() === wordSearch ||
      d.score.toString().substring(0, keyLength).toLowerCase()+"/7" === wordSearch ||

      d.year.toString().substring(0, keyLength).toLowerCase() === wordSearch ||
      d.band.substring(0, keyLength).toLowerCase() === wordSearch ||
      d.album.substring(0, keyLength).toLowerCase() === wordSearch);

  }


  filterGenre(genrePicked) {
    if (genrePicked === "clear") {
      this.filterByBooks = [];
    } else {
      if (this.filterByBooks.indexOf(genrePicked, 0) > -1) {
        this.filterByBooks.splice(this.filterByBooks.indexOf(genrePicked, 0), 1);
      } else {
        this.filterByBooks.push(genrePicked);
      }
    }
    if (this.filterByBooks.length < 1) {
      this.filteredList = this.bookList;
    } else {
      this.filteredList = this.bookList.filter(d => {
        for (let gen of d.genre) {
          if (this.filterByBooks.indexOf(gen) >= 0) {
            return true;
          }
        }
      });

    }

  }

  getColor(genre) {
    if (this.filterBy.indexOf(genre, 0) > -1) {
      return "4px solid lightslategray";
    } else {
      return "4px solid white";
    }
  }


  updateView(view) {
    this.mainShow = view;
    this.mobileMenu();
  }

}
