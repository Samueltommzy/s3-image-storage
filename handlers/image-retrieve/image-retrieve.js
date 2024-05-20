import {assert} from 'joi';
import fetch from 'node-fetch';

import schemas from '../utils/validate-request';
import {storeImage} from '../utils/s3';

const ImageRetrieveHandler = async (req, res, next) => {
  console.log({req: req.body});
  try {
    assert(req.body, schemas.GetSchema);
    const imageData = await fetch(req.body.imageUrl);

    if (!imageData.ok) {
      return res.status(imageData.status).json({
        message: `Unable to fetch ${req.body.imageUrl}`,
      });
    }
    const imageBuffer = await imageData.buffer();
    const key = await storeImage(imageBuffer, req.body.imageUrl);

    return res.status(200).json({
      message: 'successfully stored imaged',
      data: {
        imageKey: key,
      },
    });
  } catch (e) {
    console.log({e});
    throw e;
  }
};

export default {
  ImageRetrieveHandler,
};
