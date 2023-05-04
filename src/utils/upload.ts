import { diskStorage } from 'multer';
import { extname, resolve } from 'path';
import { v4 } from 'uuid';

export const upload = {
  storage: diskStorage({
    destination: resolve(process.cwd(), 'src', 'uploads'),
    filename: (req, file, cb) => {
      const fileNomi = `${v4()}${extname(file.originalname)}`;
      file.originalname = fileNomi;
      return cb(null, fileNomi);
    },
  }),
};
