const urlRetorno = window.location.href.includes('localhost')
? 'http://localhost:8080'
: 'https://serfioflix-prd.herokuapp.com';

export default {
    urlRetorno,
};