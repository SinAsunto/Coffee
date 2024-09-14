const path = require('path');
const { v4: uuidv4 } = require('uuid');



const helperUploadFile = ( files, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '' ) => {
    return new Promise((resolve, reject) => {
        const { file } = files;
    
        const name = file.name.split('.');
        const extension = name[name.length - 1];
        
        // Validate extension
        if (!validExtensions.includes(extension)) {
            return reject(`The extension ${extension} is not allowed. Valid extensions are: ${validExtensions}`);
        }
        
        // Generate random name
        const fileName = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', folder, fileName);

        // Move file to the path
        file.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }

            resolve(fileName);
        });
    });
}

module.exports = {
    helperUploadFile
}