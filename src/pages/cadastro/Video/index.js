import React, {useState, useEffect} from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import useForm from './../../../hooks/useForm';
import FormField from './../../../components/FormField/index';
import Button from './../../../components/Button/index';
import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';
import Popup from 'react-popup';
import CadastroCategoria from './../categoria/index';

function CadastroVideo() {
  
  const [categorias, setCategoria] = useState([]);
  
  // Ao carregar os hooks do useform, inicia com os objetos em estado inicial.
  const {handleChange, values} = useForm({
    titulo: '',
    url: '',
    categoria: '',
  });

  //Captura o histórico de navegação do usuário
  const history = useHistory();

  const tituloCategorias = categorias.map(({titulo}) => titulo);

  // Especial para capturar a lista de categorias
  useEffect(() => {
    categoriasRepository
    .getTodasCategorias()
    .then((retornoCategorias) => {
      setCategoria(retornoCategorias);
    });
  }, []);

    const RedirectToCategoria = () => ( <Redirect to={CadastroCategoria} />);
  return (
    <PageDefault>
      <h1>Cadastro de Video</h1>
      
      <form onSubmit={(event) =>{
        event.preventDefault();
        
        const categoriaEscolhida = categorias.find((categoria) => {
          return categoria.titulo === values.categoria;
        });
        if(categoriaEscolhida === undefined){
          alert('Categoria não cadastra. Por favor, cadastre uma categoria.');
          RedirectToCategoria();
        } else{
          videosRepository.create({
            titulo: values.titulo,
            url: values.url,
            categoriaId: categoriaEscolhida.id,
          })
          .then((retorno) => {
            if(retorno.ok)
            history.push('/');
          });
          
        }
        
      }}>
      <FormField
          label="Título do vídeo"
          type="text"
          name="titulo"
          value={values.titulo}
          onChange={handleChange}
        />

      <FormField
          label="Endereço url do vídeo"
          type="text"
          name="url"
          value={values.url}
          onChange={handleChange}
        />

      <FormField
          label="Categoria"
          type="text"
          name="categoria"
          value={values.categoria}
          onChange={handleChange}
          suggestions={tituloCategorias}
        />


         <Button type="submit">
          Cadastrar
        </Button>

      </form>

      <Link to="/cadastro/categoria">
        Cadastrar Categoria
      </Link>
    </PageDefault>
  )
}

export default CadastroVideo; 