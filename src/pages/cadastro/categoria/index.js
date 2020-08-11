import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from './../../../components/Button/index';
import useForm from '../../../hooks/useForm';
import categoriasRepository from '../../../repositories/categorias';



function CadastroCategoria() {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '',
  }
  const [categorias, setCategorias] = useState([]);
  const historico = useHistory();
  
// o Javascript faz o binding com os valores de "useForm" através do retorno
const {handleChange, values, clearForm} = useForm(valoresIniciais);

  // Especial para capturar a lista de categorias
  useEffect(() => {
    categoriasRepository
    .getTodasCategorias()
    .then((retornoCategorias) => {
      setCategorias(retornoCategorias);
    });
  }, []);
  
  // useEffect(() => {
  //   const URL = window.location.href.includes('localhost')
  //     ? 'http://localhost:8080/categorias'
  //     : 'https://serfioflix-prd.herokuapp.com/categorias'; 
  //     fetch(URL)
  //      .then(async (retorno) =>{
  //       if(retorno.ok) {
  //         const resposta = await retorno.json();
  //         setCategorias(resposta);
  //         return; 
  //       }
  //       throw new Error('Não foi possível pegar os dados');
  //      })
  //     }, 
  //   []
  // );

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        {values.nome}
      </h1>

      {/* videosRepository.create({
            titulo: values.titulo,
            url: values.url,
            categoriaId: categoriaEscolhida.id,
          })
          .then((retorno) => {
            if(retorno.ok)
            history.push('/');
          });
           */}
      <form onSubmit={function handleSubmit(infosDoEvento) {
          infosDoEvento.preventDefault();
          categoriasRepository.create({
           titulo: values.titulo,
           descricao: values.descricao,
           color: values.cor,
         })
         .then((retorno) => {
           if(retorno.ok){
            historico.push('/');
           } 
         })
      }}>

        <FormField
          label="Título da Categoria"
          type="text"
          name="titulo"
          value={values.titulo}
          onChange={handleChange}
        />

        <FormField
          label="Descrição:"
          type="textarea"
          name="descricao"
          value={values.descricao}
          onChange={handleChange}
        />

        <FormField
          label="Cor"
          type="color"
          name="cor"
          value={values.cor}
          onChange={handleChange}
        />
        
        <Button>
          Cadastrar
        </Button>
      </form>
     
      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  )
}

export default CadastroCategoria;