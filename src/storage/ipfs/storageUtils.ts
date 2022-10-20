import AWS from 'aws-sdk';
import { Account } from '../../interfaces/account.interface';
import { Episode } from '../../interfaces/episode.interface';
import { Podcast } from '../../interfaces/podcast.interface';
import { StorageRequest } from '../../interfaces/storage.request.interface';
import { _str } from '../../utils/toStr';
import * as dotenv from 'dotenv';

dotenv.config()

const accessKeyId = process.env.FILEBASE_ACCESS_KEY_ID!
const secretAccessKey = process.env.FILEBASE_SECRET_ACCESS_KEY!
const fbEndpoint = process.env.FILEBASE_ENDPOINT!
const fbRegion = process.env.FILEBASE_REGION!
const fbSignatureVersion = process.env.FILEBASE_SIGNATURE_VERSION!
const fbBucket = process.env.FILEBASE_BUCKET!
// console.log(accessKeyId, secretAccessKey, fbEndpoint, fbRegion, fbSignatureVersion, fbBucket)
const s3 = new AWS.S3({
    endpoint: fbEndpoint,
    region: 'us-east-1',
    signatureVersion: fbSignatureVersion,
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
  })

export const addDocToIpfs = async(stRequest: StorageRequest) => {
    const { docName, doc, docType, author, cid } = stRequest
    // call putObject request on s3
    const params = {
        Bucket: fbBucket,
        Key: docName,
        Body: JSON.stringify(doc),
        Metadata: { slug: _str(doc.slug), type: _str(docType) }
    }

    console.log('params: ', params)

    const request = s3.putObject(params)
    let newCid = ''
    request.on('httpHeaders', (statusCode, headers) => {
        newCid = headers['x-amz-meta-cid']
    })
    const response = await request.promise()
    const isDuplicate = newCid === cid
    return {
        cid: newCid,
        isDuplicate: isDuplicate  
    }
}

// addDocToIpfs({ docName: 'doc-001', doc: { title: 'pod001'}, docType: 'podcast' }).then(_ => console.log(_))