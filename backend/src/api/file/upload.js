const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const config = require('../../../config')();
const PermissionChecker = require('../../services/iam/permissionChecker');
const cloudinary = require('cloudinary').v2;

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);

  if (fs.existsSync(dirname)) {
    return true;
  }

  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

const request = (
  folder,
  validations = {
    entity: null,
    maxFileSize: null,
    folderIncludesAuthenticationUid: false,
  },
) => (req, res) => {
  if (!req.currentUser) {
    res.sendStatus(403);
    return;
  }

  if (
    validations.entity &&
    !new PermissionChecker({
      language: null,
      currentUser: req.currentUser,
    }).hasStorageFolder(validations.entity)
  ) {
    res.sendStatus(403);
    return;
  }

  if (validations.folderIncludesAuthenticationUid) {
    folder = folder.replace(
      ':userId',
      req.currentUser.authenticationUid,
    );
    if (
      !req.currentUser.authenticationUid ||
      !folder.includes(req.currentUser.authenticationUid)
    ) {
      res.sendStatus(403);
      return;
    }
  }

  const form = new formidable.IncomingForm();
  form.uploadDir = config.uploadDir;

  if (validations && validations.maxFileSize) {
    form.maxFileSize = validations.maxFileSize;
  }

  form.parse(req, function(err, fields, files) {
    const filename = String(fields.filename);
    const fileTempUrl = files.file.path;

    if (!filename) {
      fs.unlinkSync(fileTempUrl);
      res.sendStatus(500);
      return;
    }

    const privateUrl = path.join(
      form.uploadDir,
      folder,
      filename,
    );
    ensureDirectoryExistence(privateUrl);
    fs.renameSync(fileTempUrl, privateUrl);
    res.sendStatus(200);
  });

  form.on('error', function(err) {
    res.status(500).send(err);
  });
};

const requestCloudinary = (
  folder,
  validations = {
    entity: null,
    maxFileSize: null,
    folderIncludesAuthenticationUid: false,
  },
) => (req, res) => {
  if (!req.currentUser) {
    res.sendStatus(403);
    return;
  }
  let uploads = {};

  if (
    validations.entity &&
    !new PermissionChecker({
      language: null,
      currentUser: req.currentUser,
    }).hasStorageFolder(validations.entity)
  ) {
    res.sendStatus(403);
    return;
  }

  if (validations.folderIncludesAuthenticationUid) {
    folder = folder.replace(
      ':userId',
      req.currentUser.authenticationUid,
    );
    if (
      !req.currentUser.authenticationUid ||
      !folder.includes(req.currentUser.authenticationUid)
    ) {
      res.sendStatus(403);
      return;
    }
  }

  const form = new formidable.IncomingForm();
  // form.uploadDir = config.uploadDir;

  if (validations && validations.maxFileSize) {
    form.maxFileSize = validations.maxFileSize;
  }

  form.parse(req, function(err, fields, files) {
    const filename = String(fields.filename);
    const fileTempUrl = files.file.path;

    if (!filename) {
      fs.unlinkSync(fileTempUrl);
      res.sendStatus(500);
      return;
    }

    cloudinary.uploader
      .upload(fileTempUrl, { folder: 'category' })
      .then(function(image) {
        res.status(200).send({
          id: image.public_id,
          name: filename,
          new: true,
          privateUrl: image.secure_url,
          publicUrl: image.secure_url,
        });
      })
      .catch(function(err) {
        if (err) {
          console.warn(err);
        }
        res.sendStatus(409);
      });
  });

  form.on('error', function(err) {
    res.status(500).send(err);
  });
};

const mapAllUploadRequests = (
  prefix,
  app,
  databaseMiddleware,
  authMiddleware,
) => {
  app.post(
    prefix + '/upload/user/avatars/iam',
    databaseMiddleware,
    authMiddleware,
    request('user/avatars/iam', {
      entity: 'user',
      maxFileSize: 10 * 1024 * 1024,
      folderIncludesAuthenticationUid: false,
    }),
  );

  app.post(
    prefix + '/upload/user/avatars/profile/:userId',
    databaseMiddleware,
    authMiddleware,
    request('user/avatars/profile/:userId', {
      entity: null,
      maxFileSize: 10 * 1024 * 1024,
      folderIncludesAuthenticationUid: true,
    }),
  );

  app.post(
    prefix + '/upload/category/featuredImage',
    databaseMiddleware,
    authMiddleware,
    requestCloudinary('category/featuredImage', {
      entity: 'category',
      maxFileSize: undefined,
      folderIncludesAuthenticationUid: false,
    }),
  );
};

exports.mapAllUploadRequests = mapAllUploadRequests;
