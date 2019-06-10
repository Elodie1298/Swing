import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Util} from "../Util";
import {File} from "@ionic-native/file";
import * as crypto from 'crypto-js';

declare var Buffer: any;

@Injectable()
export class MetadataProvider {
  // private headers = new HttpHeaders({
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Methods': 'GET, POST',
  //   'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
  //
  // });

  constructor(public http: HttpClient,
              private file: File) {}

  acrIdentify(path: string) {
    let fileName = path.split('/')[path.split('/').length-1];
    let directory = path.substring(0, path.length-fileName.length);

    this.file.readAsArrayBuffer("file://" + directory, fileName)
      .then((arrayBuffer: ArrayBuffer) => {
        let data = new Buffer(arrayBuffer);
        let timestamp = (new Date()).getTime()/1000;

        let stringToSign = [
          'POST',
          Util.acrOptions.endpoint,
          Util.acrOptions.accessKey,
          Util.acrOptions.data_type,
          Util.acrOptions.signature_version,
          timestamp
        ].join('\n');

        let signature = crypto.HmacSHA1(new Buffer(stringToSign, 'utf-8'), Util.acrOptions.accessSecret);
        console.log(signature);

        console.log('sample', data.toString('utf-8'));
        console.log('sample_bytes', data.length);
        console.log(signature.toString());
        console.log(timestamp.toString());

        let formData = {
          sample: data,
          access_key: Util.acrOptions.accessKey,
          data_type: Util.acrOptions.data_type,
          signature_version: Util.acrOptions.signature_version,
          signature: signature,
          sample_bytes: data.length,
          timestamp: timestamp
        };

        console.log(formData);


        //TODO : get this request done
        let url = "http://"+Util.acrOptions.host+Util.acrOptions.endpoint;
        // let url = "http://localhost:8100/apiACR";
        console.log(url);
        return this.http.post(url, formData)
          .toPromise()
          .catch(error => {
            console.log(error);
            console.error(error.status);
            console.error(error.error); // Error message as string
            console.error(error.headers);
          })
      })
      .then(data => console.log(data))
      .catch(e => console.log(e));
  }
}
