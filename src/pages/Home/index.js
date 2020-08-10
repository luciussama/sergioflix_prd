import React, {useEffect, useState} from 'react';
import loading from '../../assets/img/download.jpg'
import Carousel from '../../components/Carousel';
import categoriasRepository from '../../repositories/categorias.js';
import PageDefault from '../../components/PageDefault';
import BannerMain from './../../components/BannerMain/index';

function Home() {
  
  const [dadosIniciais, setDadosIniciais] = useState([]);

  useEffect(() => {
    categoriasRepository.getTodasCategoriasComVideos()
    .then((retorno) => {
      setDadosIniciais(retorno);
    })
    .catch((err) =>{
      console.log(err.message);
    });
  }, []);

  return (
    <PageDefault paddingAll={0}>
     {dadosIniciais.length === 0 && (<div><img src={loading} alt="Pooping dog" width="500" height="600"/><b>Cargando...</b></div>)}

      {dadosIniciais.map((categoria, indice) => {
        if(indice === 0){
          return(
            <div key={categoria.id}>
              <BannerMain
                videoTitle={dadosIniciais[3].videos[1].titulo}
                url={dadosIniciais[3].videos[1].url}
                videoDescription="O que é Front-end? Trabalhando na área os termos HTML, CSS e JavaScript fazem parte da rotina das desenvolvedoras e desenvolvedores. Mas o que eles fazem, afinal? Descubra com a Vanessa!"
              />
              
              <Carousel
                ignoreFirstVideo
                category={dadosIniciais[0]}
              />
            </div>
          );
        }
        return(
          <Carousel
            key={categoria.id}
            category={categoria}
          />
        );
      }
    )}
    </PageDefault>
    // <div style={{ background: '#141414' }}>
    //   <Menu />

    //   <BannerMain
    //     videoTitle={dadosIniciais.categorias[2].videos[0].titulo}
    //     url={dadosIniciais.categorias[2].videos[0].url}
    //     videoDescription="O que é Front-end? Trabalhando na área os termos HTML, CSS e JavaScript fazem parte da rotina das desenvolvedoras e desenvolvedores. Mas o que eles fazem, afinal? Descubra com a Vanessa!"
    //   />
      
      
    //   <Carousel
    //     ignoreFirstVideo
    //     category={dadosIniciais.categorias[0]}
    //   />

      

    //   <Carousel
    //     category={dadosIniciais.categorias[2]}
    //   />

    //   <Carousel
    //     category={dadosIniciais.categorias[3]}
    //   />

    //   <Carousel
    //     category={dadosIniciais.categorias[4]}
    //   />

    //   <Carousel
    //     category={dadosIniciais.categorias[5]}
    //   />

    //   <Carousel
    //     category={dadosIniciais.categorias[6]}
    //   />

    //   <Carousel
    //     category={dadosIniciais.categorias[7]}
    //   />

    //   <Footer />
    // </div>
  );
}

export default Home;
