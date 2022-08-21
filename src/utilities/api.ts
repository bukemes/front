function get(url: string) {
    console.log('GET: ', url);
}

function post(url: string) {
    console.log('POST: ', url);
}

function put(url: string) {
    console.log('PUT: ', url);
}

function del(url: string) {
    console.log('DELETE: ', url);
}

function authenticate(url: string) {
    console.log('AUTHENTICATE: ', url);
}

function authorize(url: string) {
    console.log('AUTHORIZE: ', url);
}

export { get, post, put, del, authenticate, authorize }; 