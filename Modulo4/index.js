//Atividade 1

function checaIdade(idade) {
     
    return new Promise(function(resolve,reject){
       setTimeout(function(){idade>18?resolve("Maior que 18"):reject("Menor que 18")},2000);
    });        

}


checaIdade(5)
    .then(function(response) {
        console.log(response);
    })
    .catch(function(error) {
        console.log(error);
    });

//Atividade 2 e 3
var sectionEl = document.querySelectorAll(".atividade")[0];
sectionEl.innerHTML = "<h3>Digite um nome de usuário do Git Hub para fazer uma busca</h3>";
var inputEl = document.createElement("input");
inputEl.setAttribute("Placeholder","digite um usuário");
inputEl.style.marginTop ="10px";
sectionEl.appendChild(inputEl);
var buttonEl = document.createElement("button");
buttonEl.textContent = "Buscar";
sectionEl.appendChild(buttonEl);

buttonEl.onclick = function(){
    let nome = inputEl.value;
    var inputUser = document.createElement("input");
    var buttonUser = document.createElement("button");
    inputUser.setAttribute("name",nome);
    buttonUser.textContent = "Adicionar";
    var divEl = document.createElement("div");
    divEl.style.marginTop = "10px";
    divEl.style.width = "70%";
    divEl.style.margin = "auto";
    divEl.appendChild(inputUser);
    divEl.appendChild(buttonUser);
    sectionEl.appendChild(divEl);
    inputUser.value = inputEl.value;
    inputEl.value = "";

    buttonUser.onclick = function(){
        var sectionEl2 = document.querySelectorAll(".atividade")[1];
        var ulEl = document.createElement("ul");
        var usuario = document.createElement("h3");
        



       
        let liEl = document.createElement('li');
        liEl.textContent = "Carregando...";
        ulEl.appendChild(liEl);
       
        divEl.appendChild(ulEl); 
        sectionEl2.appendChild(divEl);


        setTimeout(function(){
            axios.get('https://api.github.com/users/'+inputUser.value+'/repos')
            
            .then(function(response){
    
                usuario.textContent = "Repositórios do: " + inputUser.value;
    
                for(let i = 0;i<response.data.length;i++){
                    let liEl = document.createElement('li');
                    liEl.textContent = response.data[i].name;
                    divEl.appendChild(usuario); 
                    ulEl.appendChild(liEl);
                    divEl.appendChild(ulEl); 
                    sectionEl2.appendChild(divEl);

                        removeLoad();
                   
                    
                }                
            })
            .catch(function(error){
                let h3El = document.createElement("h3");
                h3El.textContent = "Error usuario não existe";
                divEl.appendChild(h3El);
                sectionEl2.appendChild(divEl);
                removeLoad();
                
                              
            });
        },2000)

        var buttonClear = document.createElement("button");
        buttonClear.textContent = "Remover";
        sectionEl2.appendChild(buttonClear);
        buttonClear.onclick = ()=>{divEl.remove(), buttonClear.remove()}

        inputUser.remove();
        buttonUser.remove();
        
        function removeLoad(){
            liEl.remove();
        }
        
        
    }
}





