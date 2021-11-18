import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';
import { stringify } from 'querystring';
import { SearchComponent } from '../components/search/search.component';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    var thePromise = this.http.get(this.expressBaseUrl+endpoint).toPromise();
    return thePromise.then(function(response){
      return response;
    });

    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    //the http service works similarly to fetch(). It may be useful to call .toPromise() on any responses.
    //update the return to instead return a Promise with the data from the Express server
    // return Promise.resolve();
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
    let datas;
    if (category === "artist") {
      datas = this.sendRequestToExpress(`/search/${category}/${encodeURIComponent(resource)}`).then((data)=>{return data['artists']['items'].map(data=>new ArtistData(data))});
    }
    else if(category === "album"){
      datas = this.sendRequestToExpress(`/search/${
        category}/${encodeURIComponent(resource)}`).then((data)=>{return data['albums']['items'].map(data=>new AlbumData(data))});
    }
    else{
      datas = this.sendRequestToExpress(`/search/${category}/${encodeURIComponent(resource)}`).then((data)=>{return data['tracks']['items'].map(data=>new TrackData(data))});
    }
    return datas;
  }


  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    // return null;
    return this.sendRequestToExpress(`/artist/${encodeURIComponent(artistId)}`).then((data) => {
      return data;
    })
  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
    return this.sendRequestToExpress(`/artist-related-artists/${encodeURIComponent(artistId)}`).then((data) => {
      return data['artists'].map(d=> new ArtistData(d));
  })
}

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    return this.sendRequestToExpress(`/artist-top-tracks/${encodeURIComponent(artistId)}`).then((data) => {
      return data['tracks'].map(d=> new TrackData(d));
  })
}

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    return this.sendRequestToExpress(`/artist-albums/${encodeURIComponent(artistId)}`).then((data) => {
      return data['items'].map(d=> new AlbumData(d));
  })  
}

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    return this.sendRequestToExpress(`/album/${encodeURIComponent(albumId)}`).then((data) => {
      return data;
  })
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    return this.sendRequestToExpress(`/album-tracks/${encodeURIComponent(albumId)}`).then((data) => {
      // console.log("track for album", data)
      return data['items'].map(d=> new TrackData(d));
  })  
}

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.

    return this.sendRequestToExpress(`/track/${encodeURIComponent(trackId)}`).then((data) => {
        return new TrackData(data);
  })  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    return this.sendRequestToExpress(`/track-audio-features/${encodeURIComponent(trackId)}`).then((data) => {
      return TrackFeature.FeatureTypes.map(
        f => new TrackFeature(f, data[f])
      )
      // let f = data.feature;
      // let p = data.percent;
      // console.log("features for track",data)
      // return data.map(d=> new TrackFeature(f,p));
  })    }
}
