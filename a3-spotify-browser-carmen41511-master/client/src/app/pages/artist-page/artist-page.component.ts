import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { ResourceData } from 'src/app/data/resource-data';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css']
})
export class ArtistPageComponent implements OnInit {
	artistId:string;
	artist:ArtistData;
	relatedArtists:ArtistData[];
	topTracks:TrackData[];
	albums:AlbumData[];

  constructor(private route: ActivatedRoute, private spotifyservice: SpotifyService) { }

  ngOnInit() {
  	this.artistId = this.route.snapshot.paramMap.get('id');
    //TODO: Inject the spotifyService and use it to get the artist data, related artists, top tracks for the artist, and the artist's albums

    // get the artist data
    this.spotifyservice.getArtist(this.artistId)
    .then(a => {
      // console.log("get aritist", a)
      this.artistId = a.id;
      this.artist = a;
    });
    // get related artists
    this.spotifyservice.getRelatedArtists(this.artistId).then(a =>{
      this.relatedArtists = a
      // console.log("related", this.relatedArtists)
    })
    // get the top tracks for the artist
    this.spotifyservice.getTopTracksForArtist(this.artistId).then(a =>{
      this.topTracks = a
      // console.log("top track", this.topTracks)

    })
    // get the artist's albums
    this.spotifyservice.getAlbumsForArtist(this.artistId).then(a =>{
      this.albums = a
      console.log("get album for artist",this.albums)
    })
  }
}