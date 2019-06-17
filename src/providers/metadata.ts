import { Injectable } from '@angular/core';
import {File} from "@ionic-native/file";
import {Track} from "../model/Track";
import * as metadata from 'music-metadata';

declare var Buffer: any;


@Injectable()
export class MetadataProvider {
  // private headers = new HttpHeaders({
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Methods': 'GET, POST',
  //   'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
  //
  // });

  constructor(private file: File) {}

  getMetadata(track: Track): void {
    this.musicMetadata(track.file);
    // this.acrIdentify(track.file);
  }

  musicMetadata(file: string): Promise<any> {
    let fileName = file.split('/')[file.split('/').length-1];
    let directory = file.substring(0, file.length-fileName.length);
    return this.file.readAsArrayBuffer("file://" + directory, fileName)
      .then((arrayBuffer: ArrayBuffer) => {
        return metadata.parseBuffer(new Buffer(arrayBuffer))
      })
  }

  // acrIdentify(path: string): void {
  //   let fileName = path.split('/')[path.split('/').length-1];
  //   let directory = path.substring(0, path.length-fileName.length);
  //
  //   //TODO: check proxy config
  //   this.file.readAsArrayBuffer("file://" + directory, fileName)
  //     .then((arrayBuffer: ArrayBuffer) => {
  //       let data = new Buffer(arrayBuffer);
  //       let limit = (data.length>10000)?10000:data.length;
  //       data = data.slice(0, limit);
  //       let timestamp = (new Date()).getTime()/1000;
  //
  //       let stringToSign = [
  //         'POST',
  //         Util.acrOptions.endpoint,
  //         Util.acrOptions.accessKey,
  //         Util.acrOptions.data_type,
  //         Util.acrOptions.signature_version,
  //         timestamp
  //       ].join('\n');
  //
  //       let signature = crypto.HmacSHA1(new Buffer(stringToSign, 'utf-8'), Util.acrOptions.accessSecret);
  //       console.log(signature);
  //
  //       console.log('sample', data.toString('binary'));
  //       console.log('sample', data.toString('ascii'));
  //       console.log('sample_bytes', data.length);
  //       console.log(timestamp.toString());
  //
  //       let formData = {
  //         sample: data,
  //         access_key: Util.acrOptions.accessKey,
  //         data_type: Util.acrOptions.data_type,
  //         signature_version: Util.acrOptions.signature_version,
  //         signature: signature,
  //         sample_bytes: data.length,
  //         timestamp: timestamp
  //       };
  //
  //       console.log(formData);
  //
  //
  //       //TODO : get this request done
  //       // let url = "http://"+Util.acrOptions.host+Util.acrOptions.endpoint;
  //       let url = "http://localhost:8100/apiACR";
  //       console.log(url);
  //       return this.http.post(url, formData)
  //         .toPromise()
  //         .then(d => console.log(d))
  //         .catch(error => {
  //           console.log(error);
  //           console.error(error.status);
  //           console.error(error.error); // Error message as string
  //           console.error(error.headers);
  //         })
  //     })
  //     // .then(data => console.log(data))
  //     .catch(e => console.log(e));
  // }
}
