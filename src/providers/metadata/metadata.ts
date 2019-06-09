import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Util} from "../Util";

declare var crypto: any;
declare var Buffer: any;
declare var fs: any;

@Injectable()
export class MetadataProvider {

  constructor(public http: HttpClient) {}

  acrIdentify(file: string) {
    fs.readFile(file, d => {
        console.log(d);
        let data = new Buffer(d);
        let timestamp = (new Date()).getTime()/1000;

        let stringToSign = [
          'POST',
          Util.acrOptions.endpoint,
          Util.acrOptions.accessKey,
          Util.acrOptions.data_type,
          Util.acrOptions.signature_version,
          timestamp
        ].join('\n');

        let signature = crypto.createHmac('sha1', Util.acrOptions.accessSecret)
          .update(new Buffer(stringToSign, 'utf-8'))
          .digest().toString('base64');

        let formData = {
          sample: data,
          access_key: Util.acrOptions.accessKey,
          data_type: Util.acrOptions.data_type,
          signature_version: Util.acrOptions.signature_version,
          signature: signature,
          sample_bytes: data.length,
          timestamp: timestamp
        };

        this.http.post("http://"+Util.acrOptions.host+Util.acrOptions.endpoint, formData, {})
          .toPromise()
          .then(data => console.log(data))
          .catch(e => console.log(e));
      })
  }

}
