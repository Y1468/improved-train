import api from './api'

      //Importa variavel

class App{

    //Metodo construtor
    constructor(){

       this.repositorio=[]
       this.formulario=document.querySelector("form")
       this.lista=document.querySelector(".list-group")

       this.rEvento()

    }
    //Atributo
    rEvento(){
      //Passando o evento do formulario
      this.formulario.onsubmit=evento=>this.adRepositorio(evento)
    }

  async adRepositorio(evento){
       evento.preventDefault()
    
    let input=this.formulario.querySelector("#input").value

      if (input.length===0) {

        //Retorna a função
         return
      }

      this.apBuscando()

      try{
      //Pegando o usuario
      let response=await api.get(`/repos/${input}`)
      
       let {name,description,html_url,owner:{avatar_url}}=response.data

       this.repositorio.push({
        nome:name,
        descricao:description,
        avatar_url,
        link:html_url,
       })

       this.rTela()

     }catch(erro){
      this.lista.removeChild(document.querySelector('.list-group-item-warning'))

      let er=this.lista.querySelector('.list-group-item-danger')
      if(er !== null){
        this.lista.removeChild(er)
      }

      let li=document.createElement('li')
      li.setAttribute('class','list-group-item list-group-item-danger')
      let texto=document.createTextNode(`O repositori ${input} não existe`)
      li.appendChild(texto)
      this.lista.appendChild(li)
     }

    }
     apBuscando(){
      let li=document.createElement('li')
      li.setAttribute('class','list-group-item list-group-item-warning')
      let txtBuscando=document.createTextNode(`Aguarde buscando o repositori ...`)
      li.appendChild(txtBuscando)
      this.lista.appendChild(li)
     }
    //Renderizar a tela
    rTela(){

        this.lista.innerHTML=""

        this.repositorio.forEach(r=>{

          let li=document.createElement("li")
          li.setAttribute("class","list-group-item list-group-item-action")

          let img=document.createElement("img")
          img.setAttribute("src",r.avatar_url)
          li.appendChild(img)

          let strong=document.createElement("strong")
          let txtstrong=document.createTextNode(r.nome)
          strong.appendChild(txtstrong)
          li.appendChild(strong)

          let p=document.createElement("p")
          let txtp=document.createTextNode(r.descricao)
          p.appendChild(txtp)
          li.appendChild(p)

          let a=document.createElement("a")
          a.setAttribute("target","blank")
          a.setAttribute("href",r.link)
          let txt=document.createTextNode("Acessar")
          a.appendChild(txt)
          li.appendChild(a)

          this.lista.appendChild(li)

          this.formulario.querySelector("#input").value=""
          this.formulario.querySelector("#input").focus()

        })

    }


}

new App()

                /*
                <li class="list-group-item list-group-item-action">
                <img src="https://avatars0.githubusercontent.com/u/8083459?v=4">
                <strong>nerd fonts</strong>
                <p>Ionic font agregator, colection,and patcher</p>
                <a target="blank" href="https://github.com/ryanoasis/nerd-fonts">Acessar</a>
                </li>

                */