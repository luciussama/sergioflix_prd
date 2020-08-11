import config from '../config';

// Esse "embed" está fazendo via Json a ligação de vídeos por categorias através da chave do banco de dados
const url = `${config.urlRetorno}/videos`;

function create(video){

    return fetch(`${url}?_embed=videos`, {
        method: 'POST',
        headers: {
                'Content-type': 'application/json',
        },
        body: JSON.stringify(video),
    })
    .then(async (retorno) => {
        if(retorno.ok){
            return await retorno.json();
        } else{
            console.log(retorno.error.message);
        }

    })
}

export default{
    create,
}