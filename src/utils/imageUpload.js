/**
 * Uploads an image to the tsimg cloud service.
 *
 * @export
 * @param {string | File} file A URL as a string or a `File` object that should be uploaded.
 * @param {object} options either object or referenceId (deprecated)
 * @param {string} options.referenceId
 * @param {string} options.personId A person is that should be associated with the uploaded image.
 * @param {string} options.siteId A site id that should be associated with the uploaded image.
 * @param {string} [options.url='https://api.tsimg.cloud/image']
 * @param {string} _personId A person is that should be associated with the uploaded image. (deprecated, use options instead)
 * @param {string} _siteId A site id that should be associated with the uploaded image. (deprecated, use options instead)
 * @param {string} [_url='https://api.tsimg.cloud/image'] (deprecated, use options instead)
 * @return {Promise<object>} The response data for the image upload.
 */
export default async function imageUpload(
    file,
    options,
    _personId,
    _siteId,
    _url = 'https://api.tsimg.cloud/image'
) {
    const headers = new Headers({ Accept: 'application/json' });

    let referenceId;
    let personId;
    let siteId;
    let url;
    if (typeof options === 'object') {
        ({ referenceId, personId, siteId, url = 'https://api.tsimg.cloud/image' } = options);
    } else {
        referenceId = options;
        personId = _personId;
        siteId = _siteId;
        url = _url;
    }

    if (referenceId) headers.set('X-Reference-Id', referenceId);
    if (personId) headers.set('X-Person-Id', personId);
    if (siteId) headers.set('X-Site-Id', siteId);

    if (chayns.env.user.isAuthenticated) {
        headers.set(
            'Authorization',
            `bearer ${chayns.env.user.tobitAccessToken}`
        );
    }

    /** @type {string | ArrayBuffer} */
    let body;

    if (typeof file === 'string') {
        headers.set('Content-Type', 'application/json');
        body = JSON.stringify({ url: file });
    } else {
        headers.set('Content-Type', 'image/*');
        body = await getFileArrayBuffer(file);
    }

    const response = await fetch(url, { method: 'POST', body, headers });

    if (response.ok) {
        return response.json();
    }

    throw new Error(
        `Uploading the image failed with status code ${response.status}.`
    );
}

/**
 * Returns the array buffer for an input file.
 *
 * @param {File} file The input `File` object.
 * @return {Promise<string | ArrayBuffer>}
 */
function getFileArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) {
                resolve(e.target.result);
            } else {
                reject(Error('Could not get array buffer.'));
            }
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}
