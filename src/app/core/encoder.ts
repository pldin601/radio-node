import * as stream from "stream";
import * as ffmpeg from "fluent-ffmpeg";

import { createTransformWithConnectors } from '../utils/stream-utils';
import { DECODER_FORMAT, DECODER_CHANNELS, DECODER_FREQUENCY } from './decoder';

export const ENC_OUTPUT_FORMAT = 'mp3';
export const ENC_CHANNELS = 2;
export const ENC_BITRATE = '256k';
export const ENC_FILTER = 'compand=0 0:1 1:-90/-900 -70/-70 -21/-21 0/-15:0.01:12:0:0';

export const createEncoder = (): stream.Transform => {
  const { input, output, transform } = createTransformWithConnectors();

  ffmpeg(input)
    .inputOptions([
      `-ac ${DECODER_CHANNELS}`,
      `-ar ${DECODER_FREQUENCY}`,
    ])
    .inputFormat(DECODER_FORMAT)
    .audioBitrate(ENC_BITRATE)
    .audioChannels(ENC_CHANNELS)
    .outputFormat(ENC_OUTPUT_FORMAT)
    .audioFilter(ENC_FILTER)
    .on('error', error => transform.emit('error', error))
    .pipe(output, { end: true });

  return transform;
};

export default { createEncoder };
