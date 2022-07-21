import AWS from 'aws-sdk'; 

const spaceEndPoint = new AWS.Endpoint('https://fra1.digitaloceanspaces.com')

const s3 = new AWS.S3({

    endpoint : spaceEndPoint,
    accessKeyId : 'B7POIPPYM44Y374P23KS',
    secretAccessKey : '01CMWBcNKtFgKG6XhP+q0PlajTb2yvELaJ1igo7xsyA'
})

const digitalOceanService = {


    fotoGonder(file){

        let filename = file.name;
        const params = {

            Bucket : 'mekmar-image',
            Key : 'products/' +  filename,
            Body :  file,
            ACL : 'public-read',
            ContentType : "image/" + filename.split('.')[1],
            CacheControl : "public,max-age=1,s-max-age=500,must-revalidate"
        }

        s3.upload(params,(err,data) => {

            if(err)console.log('AWS HATA : ',err)
            else console.log('OK : ', data);
        })
    },
    fotoGonderMekmarUsa(file){

        let filename = file.name;
        const params = {

            Bucket : 'mekmar-image',
            Key : 'usa-products/' +  filename,
            Body :  file,
            ACL : 'public-read',
            ContentType : "image/" + filename.split('.')[1],
            CacheControl : 'public,max-age=604800,s-max-age=500,must-revalidate'
        }

        s3.upload(params,(err,data) => {

            if(err)console.log('AWS HATA : ',err)
            else console.log('OK : ', data);
        })
    },
}

export default digitalOceanService;