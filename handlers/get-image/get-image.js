import {assert} from 'joi';
import schemas from '../utils/validate-request';
import {getImage} from '../utils/s3';

const ImageRetrieveHandler = async (req, res, next) => {
  try {
    assert(req.query, schemas.GetSchema);
    const key = req.query.imageKey;
    const imageUrl = await getImage(key);
    return res.status(200).json({
      message: 'successfully retrieved imaged url',
      data: {
        imageUrl,
      },
    });
  } catch (e) {
    throw e;
  }
};

export default {
  ImageRetrieveHandler,
};
