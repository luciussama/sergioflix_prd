import config from '../config';

// Esse "embed" está fazendo via Json a ligação de vídeos por categorias através da chave do banco de dados
const url = `${config.urlRetorno}/categorias`;
function getTodasCategoriasComVideos(){
    return fetch(`${url}?_embed=videos`)
    .then(async (retorno) => {
        if(retorno.ok){
            return await retorno.json();
        }
    })
}

export default{
    getTodasCategoriasComVideos,
}