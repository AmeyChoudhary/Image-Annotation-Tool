import * as Minio from 'minio';

// const minioClient = new Minio.Client({
//     endPoint: 'play.min.io',
//     port: 9000,
//     useSSL: true,
//     accessKey: 'Q3AM3UQ867SPQQA43P2F',
//     secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG'
// });

// const minioClient = new Minio.Client({
//     endPoint: '10.8.0.31',
//     port: 9001,
//     useSSL: true,
//     accessKey: 'ArYqRuf0NA6gZU5sGJql',
//     secretKey: 'W1ma2i1RzXjaTbqJkSiSM7KRMtM1D28VZLuqpIWK'
// });

var minioClient = new Minio.Client({
    endPoint: '10.8.0.31',
    port: 9000,
    useSSL: false,
    accessKey: 'WzM0t4CtfRYLW6x6',
    secretKey: 'RUSePhuOg9QIVicMxrn0zpzBRHST7xF2'
});

// ArYqRuf0NA6gZU5sGJql
// W1ma2i1RzXjaTbqJkSiSM7KRMtM1D28VZLuqpIWK

export {
    minioClient
}