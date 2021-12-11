import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as io from "socket.io-client";
import { environment } from '../environments/environment'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tweetfinder';
  keyword = new FormControl('');
  loader=false
  map = new Map()
  limit=5
  currentLimit=0;
  loadMore=false;
  constructor(private http: HttpClient) { }
  ngOnInit() {
    let count=0
    this.currentLimit=this.limit
    let socket = io.connect(environment.apiUrl);
    socket.on('tweet', (param) => {
      count++
      if (count == this.limit) {
        this.loadMore=true;
      }
      if (param.status == 200) {
        this.map.set(count,param.data);
      }
      this.loader =false;
    });
  }

  keywordFinder(){
    this.loader =true
    this.map.clear();
    this.http.get(`${environment.apiUrl}/api/${this.keyword.value}`).subscribe((data: any) => {
      console.log(1,data);
    });
  }

  loadMoreTweets(){
    this.currentLimit=this.currentLimit+this.limit
  }



  // exampleTweet={
  //   "status": 200,
  //   "data": {
  //     "created_at": "Sat Dec 11 17:27:33 +0000 2021",
  //     "id": 1469720524368449500,
  //     "id_str": "1469720524368449538",
  //     "text": "Cuando @RoBarbaraA me pregunta -cuando vamos a comer afuera?\n\n-Nose no tengo un mango",
  //     "source": "<a href=\"http://twitter.com/download/android\" rel=\"nofollow\">Twitter for Android</a>",
  //     "truncated": false,
  //     "in_reply_to_status_id": null,
  //     "in_reply_to_status_id_str": null,
  //     "in_reply_to_user_id": null,
  //     "in_reply_to_user_id_str": null,
  //     "in_reply_to_screen_name": null,
  //     "user": {
  //       "id": 468681828,
  //       "id_str": "468681828",
  //       "name": "Z u r 2 🇲🇨",
  //       "screen_name": "ivann_31",
  //       "location": "Buenos Aires, Argentina",
  //       "url": "http://facebook.com/ivan10zurdo",
  //       "description": "@RiverPlate🐔❤️⚽ | @ChelseaFC 💙🦁 | #essereFerrari 🏎️ @ScuderiaFerrari 🐎\n\n Ella es mi persona R ❤ M 💙",
  //       "translator_type": "none",
  //       "protected": false,
  //       "verified": false,
  //       "followers_count": 237,
  //       "friends_count": 316,
  //       "listed_count": 3,
  //       "favourites_count": 75573,
  //       "statuses_count": 12571,
  //       "created_at": "Thu Jan 19 20:05:37 +0000 2012",
  //       "utc_offset": null,
  //       "time_zone": null,
  //       "geo_enabled": true,
  //       "lang": null,
  //       "contributors_enabled": false,
  //       "is_translator": false,
  //       "profile_background_color": "FCFCF9",
  //       "profile_background_image_url": "http://abs.twimg.com/images/themes/theme19/bg.gif",
  //       "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme19/bg.gif",
  //       "profile_background_tile": false,
  //       "profile_link_color": "F70D0D",
  //       "profile_sidebar_border_color": "EEEEEE",
  //       "profile_sidebar_fill_color": "EFEFEF",
  //       "profile_text_color": "000000",
  //       "profile_use_background_image": false,
  //       "profile_image_url": "http://pbs.twimg.com/profile_images/1463221286587416576/UZ9uJAd7_normal.jpg",
  //       "profile_image_url_https": "https://pbs.twimg.com/profile_images/1463221286587416576/UZ9uJAd7_normal.jpg",
  //       "profile_banner_url": "https://pbs.twimg.com/profile_banners/468681828/1500141330",
  //       "default_profile": false,
  //       "default_profile_image": false,
  //       "following": null,
  //       "follow_request_sent": null,
  //       "notifications": null,
  //       "withheld_in_countries": []
  //     },
  //     "geo": null,
  //     "coordinates": null,
  //     "place": null,
  //     "contributors": null,
  //     "quoted_status_id": 1469354909770272800,
  //     "quoted_status_id_str": "1469354909770272771",
  //     "quoted_status": {
  //       "created_at": "Fri Dec 10 17:14:44 +0000 2021",
  //       "id": 1469354909770272800,
  //       "id_str": "1469354909770272771",
  //       "text": "Si Messi le dice Maria Bizarrá desde hoy será Maria Bizarrá https://t.co/9cWkXmPVeM",
  //       "display_text_range": [
  //         0,
  //         59
  //       ],
  //       "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
  //       "truncated": false,
  //       "in_reply_to_status_id": null,
  //       "in_reply_to_status_id_str": null,
  //       "in_reply_to_user_id": null,
  //       "in_reply_to_user_id_str": null,
  //       "in_reply_to_screen_name": null,
  //       "user": {
  //         "id": 170912925,
  //         "id_str": "170912925",
  //         "name": "Todo Rojo - Bustista de Fabricio Bustos 🇹🇷",
  //         "screen_name": "Franco_todorojo",
  //         "location": "Avellaneda, Argentina",
  //         "url": null,
  //         "description": "Contador, messista, fan de Lali y ante todo hincha del rojo! Soldado de Bustos y Karu. Campeon de la Copa Dexter y de #lalibertadoresdelafalcioneta",
  //         "translator_type": "none",
  //         "protected": false,
  //         "verified": false,
  //         "followers_count": 2227,
  //         "friends_count": 2122,
  //         "listed_count": 2,
  //         "favourites_count": 35077,
  //         "statuses_count": 26559,
  //         "created_at": "Mon Jul 26 02:52:33 +0000 2010",
  //         "utc_offset": null,
  //         "time_zone": null,
  //         "geo_enabled": false,
  //         "lang": null,
  //         "contributors_enabled": false,
  //         "is_translator": false,
  //         "profile_background_color": "EDECE9",
  //         "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
  //         "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
  //         "profile_background_tile": false,
  //         "profile_link_color": "E81C4F",
  //         "profile_sidebar_border_color": "FFFFFF",
  //         "profile_sidebar_fill_color": "DDEEF6",
  //         "profile_text_color": "333333",
  //         "profile_use_background_image": true,
  //         "profile_image_url": "http://pbs.twimg.com/profile_images/1467973651022581761/lN__WGJx_normal.jpg",
  //         "profile_image_url_https": "https://pbs.twimg.com/profile_images/1467973651022581761/lN__WGJx_normal.jpg",
  //         "profile_banner_url": "https://pbs.twimg.com/profile_banners/170912925/1627908323",
  //         "default_profile": false,
  //         "default_profile_image": false,
  //         "following": null,
  //         "follow_request_sent": null,
  //         "notifications": null,
  //         "withheld_in_countries": []
  //       },
  //       "geo": null,
  //       "coordinates": null,
  //       "place": null,
  //       "contributors": null,
  //       "is_quote_status": false,
  //       "quote_count": 1038,
  //       "reply_count": 138,
  //       "retweet_count": 2366,
  //       "favorite_count": 21369,
  //       "entities": {
  //         "hashtags": [],
  //         "urls": [],
  //         "user_mentions": [],
  //         "symbols": [],
  //         "media": [
  //           {
  //             "id": 1469354864077688800,
  //             "id_str": "1469354864077688840",
  //             "indices": [
  //               60,
  //               83
  //             ],
  //             "additional_media_info": {
  //               "monetizable": false
  //             },
  //             "media_url": "http://pbs.twimg.com/ext_tw_video_thumb/1469354864077688840/pu/img/Hi_A3TpZWu_zygLy.jpg",
  //             "media_url_https": "https://pbs.twimg.com/ext_tw_video_thumb/1469354864077688840/pu/img/Hi_A3TpZWu_zygLy.jpg",
  //             "url": "https://t.co/9cWkXmPVeM",
  //             "display_url": "pic.twitter.com/9cWkXmPVeM",
  //             "expanded_url": "https://twitter.com/Franco_todorojo/status/1469354909770272771/video/1",
  //             "type": "photo",
  //             "sizes": {
  //               "thumb": {
  //                 "w": 150,
  //                 "h": 150,
  //                 "resize": "crop"
  //               },
  //               "small": {
  //                 "w": 383,
  //                 "h": 680,
  //                 "resize": "fit"
  //               },
  //               "large": {
  //                 "w": 576,
  //                 "h": 1024,
  //                 "resize": "fit"
  //               },
  //               "medium": {
  //                 "w": 576,
  //                 "h": 1024,
  //                 "resize": "fit"
  //               }
  //             }
  //           }
  //         ]
  //       },
  //       "extended_entities": {
  //         "media": [
  //           {
  //             "id": 1469354864077688800,
  //             "id_str": "1469354864077688840",
  //             "indices": [
  //               60,
  //               83
  //             ],
  //             "additional_media_info": {
  //               "monetizable": false
  //             },
  //             "media_url": "http://pbs.twimg.com/ext_tw_video_thumb/1469354864077688840/pu/img/Hi_A3TpZWu_zygLy.jpg",
  //             "media_url_https": "https://pbs.twimg.com/ext_tw_video_thumb/1469354864077688840/pu/img/Hi_A3TpZWu_zygLy.jpg",
  //             "url": "https://t.co/9cWkXmPVeM",
  //             "display_url": "pic.twitter.com/9cWkXmPVeM",
  //             "expanded_url": "https://twitter.com/Franco_todorojo/status/1469354909770272771/video/1",
  //             "type": "video",
  //             "video_info": {
  //               "aspect_ratio": [
  //                 9,
  //                 16
  //               ],
  //               "duration_millis": 11986,
  //               "variants": [
  //                 {
  //                   "bitrate": 2176000,
  //                   "content_type": "video/mp4",
  //                   "url": "https://video.twimg.com/ext_tw_video/1469354864077688840/pu/vid/576x1024/mBBCfOT5_ynsVAjN.mp4?tag=12"
  //                 },
  //                 {
  //                   "bitrate": 632000,
  //                   "content_type": "video/mp4",
  //                   "url": "https://video.twimg.com/ext_tw_video/1469354864077688840/pu/vid/320x568/nGuUnV45bEnxo8Id.mp4?tag=12"
  //                 },
  //                 {
  //                   "bitrate": 950000,
  //                   "content_type": "video/mp4",
  //                   "url": "https://video.twimg.com/ext_tw_video/1469354864077688840/pu/vid/480x852/05lJeukTN7Cpbgse.mp4?tag=12"
  //                 },
  //                 {
  //                   "content_type": "application/x-mpegURL",
  //                   "url": "https://video.twimg.com/ext_tw_video/1469354864077688840/pu/pl/4dCcD0sYjiYNrKjQ.m3u8?tag=12&container=fmp4"
  //                 }
  //               ]
  //             },
  //             "sizes": {
  //               "thumb": {
  //                 "w": 150,
  //                 "h": 150,
  //                 "resize": "crop"
  //               },
  //               "small": {
  //                 "w": 383,
  //                 "h": 680,
  //                 "resize": "fit"
  //               },
  //               "large": {
  //                 "w": 576,
  //                 "h": 1024,
  //                 "resize": "fit"
  //               },
  //               "medium": {
  //                 "w": 576,
  //                 "h": 1024,
  //                 "resize": "fit"
  //               }
  //             }
  //           }
  //         ]
  //       },
  //       "favorited": false,
  //       "retweeted": false,
  //       "possibly_sensitive": false,
  //       "filter_level": "low",
  //       "lang": "es"
  //     },
  //     "quoted_status_permalink": {
  //       "url": "https://t.co/gbDmCQkf8x",
  //       "expanded": "https://twitter.com/Franco_todorojo/status/1469354909770272771",
  //       "display": "twitter.com/Franco_todoroj…"
  //     },
  //     "is_quote_status": true,
  //     "quote_count": 0,
  //     "reply_count": 0,
  //     "retweet_count": 0,
  //     "favorite_count": 0,
  //     "entities": {
  //       "hashtags": [],
  //       "urls": [],
  //       "user_mentions": [
  //         {
  //           "screen_name": "RoBarbaraA",
  //           "name": "Rocio Bárbara💋",
  //           "id": 266236893,
  //           "id_str": "266236893",
  //           "indices": [
  //             7,
  //             18
  //           ]
  //         }
  //       ],
  //       "symbols": []
  //     },
  //     "favorited": false,
  //     "retweeted": false,
  //     "filter_level": "low",
  //     "lang": "es",
  //     "timestamp_ms": "1639243653753"
  //   }
  // }


}
