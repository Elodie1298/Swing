// import {File, FileEntry} from "@ionic-native/file";
//
// declare var stream = require('stream');
// declare var lame = require('lame');
// declare var WritableStreamBuffer = require('stream-buffers').WritableStreamBuffer;
// declare var streamifier = require('streamifier');
//
// export class SliceStream extends stream.Writable {
//   encoder = null;
//   buffer = null;
//
//   writable = true;
//
//   static new (lameConfig): SliceStream {
//     let sliceStream = new SliceStream();
//
//     stream.Writable.call(sliceStream);
//
//     sliceStream.encoder = new lame.Encoder(lameConfig);
//
//     sliceStream.buffer = new WritableStreamBuffer({
//       initialSize: (1000 * 1024),
//       incrementAmount: (150 * 1024)
//     });
//     return sliceStream;
//   }
//
//   write(buf) {
//     this.buffer.write(buf);
//   }
//
//   end(buf?) {
//     if (buf) this.buffer.write(buf);
//     this.writable = false;
//
//     var PCMBuffer = this.buffer.getContents();
//
//     streamifier.createReadStream(PCMBuffer).pipe(this.encoder);
//
//   }
// }
