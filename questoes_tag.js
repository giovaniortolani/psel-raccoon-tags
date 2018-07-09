/* Processo Seletivo Tags 2018 - Raccoon */
/* Giovani Ortolani Barbosa */


/******* Questão 1 *******/

// Função 1

// Versão 1
function checkAvailability(prod) {
    return prod.available === true;
}

function getProductId(prod) {
    return prod.id
}

// Utiliza funções como parâmetros de filter e map, as quais podem ser reutilizadas posteriormente
function funcao1() {
    return window.productList
            // retorna todos os produtos que estão disponíveis de productList
            .filter(checkAvailability)
            // retorna o id de todos os produtos que foram retornados por filter
            .map(getProductId);
}

// Versão 2
// Código mais enxuto, utiliza apenas arrow functions dentro de filter e map
function funcao1() {
    return window.productList
            // retorna todos os produtos que estão disponíveis de productList
            .filter((prod) => { return prod.available === true })
            // retorna o id de todos os produtos que foram retornados por filter
            .map((prod) => { return prod.id });
}

// Versão 3
// Utilizando reduce com o mesmo funcionamento do par filter e map das versões anteriores
function funcao1() {
    return window.productList.reduce((idList, prod) => {
        // caso produto esteja disponível, coloca o id na lista de prod disponíveis
        if(prod.available === true) {
            idList.push(prod.id);
        }
        return idList;
    }, []);
}


// Função 2

// Versão 1
function checkCategory(prod) {
    // Pesquisa por expressão regular com a query "smartphone" ignorando case sensitivity
    let query = /smartphone/i;
    return query.test(prod.category);   // retorna true se encontrar
}

function getProductId(prod) {
    return prod.id
}

// Utiliza funções como parâmetros de filter e map, as quais podem ser reutilizadas posteriormente
function funcao2() {
    return window.productList
            // retorna todos os produtos que possuem smartphone na propriedade categoria
            .filter(checkCategory)
            // retorna o id de todos os produtos que foram retornados por filter
            .map(getProductId);
}

// Versão 2
// Também é possível receber outra categoria de produtos para busca.
// Código mais enxuto, utilizando o método includes de strings (é case sensitive) e arrow functions
function funcao2(query = "smartphone") {
    return window.productList
            // retorna todos os produtos que possuem smartphone na propriedade categoria
            .filter((prod) => { return prod.category.includes(query) })
            // retorna o id de todos os produtos que foram retornados por filter
            .map((prod) => { return prod.id });
}

// Versão 3
// Também é possível receber outra categoria de busca como regex.
// Código mais enxuto e mais robusto que os anteriores, pois utiliza regex como busca pela categoria
function funcao2(query = /smartphone/i) {
    return window.productList
            // retorna todos os produtos que possuem smartphone na propriedade categoria
            .filter((prod) => { return query.test(prod.category) })
            // retorna o id de todos os produtos que foram retornados por filter
            .map((prod) => { return prod.id });
}


// Função 3

// Passar document.querySelectorAll("div.product") como parâmetro
function funcao3() {
    // transforma em array (ES6) para poder usar filter e map (mais legível que spread operator)
    let products = Array.from(document.querySelectorAll("div.product[available='true']")); 

    // a cada produto, pega o valor do atributo data-id e coloca-o em um array
    return products.map((prod) => { return prod.attributes["data-id"].value });
}


// Função 4

// Versão 1 - transformando NodeList em Array (com método do ES6)
// Passar document.querySelectorAll("div.product") como parâmetro
// Implementado com reduce e utilizando uma variável para guardar a lista com os objetos a serem retornados
function funcao4() {
    // retorna uma NodeList transformada em Array com a seleção todas as divs da classe product
    let products = Array.from(document.querySelectorAll("div.product")); 

    // para cada produto, cria um objeto com seu id e a url da imagem e os adiciona numa lista
    return products.reduce((prodList, prod) => {
        prodList.push({
            // recupera o id
            id: prod.attributes["data-id"].value,
            // seleciona o primeiro elemento imagem dentro da div product e pega sua url
            imageUrl: prod.querySelector("img").src
        });
        return prodList;
    }, []);
}

// Versão 2 - transformando NodeList em Array (com método do ES6)
// Passar document.querySelectorAll("div.product") como parâmetro
// Implementado apenas com map e sem variável para armazenar a lista com os objetos a serem retornados
function funcao4() {
    // retorna uma NodeList transformada em Array com a seleção todas as divs da classe product
    let products = Array.from(document.querySelectorAll("div.product")); 

    // para cada produto, cria um objeto com seu id e a url da imagem e os adiciona numa lista
    return products.map((prod) => { 
        return {
            // recupera o id
            id: prod.attributes["data-id"].value, 
            // seleciona o primeiro elemento imagem dentro da div product e pega sua url
            imageUrl: prod.querySelector("img").src
        } 
    });
}

// Versão 3 - transformando NodeList em Array (com método do ES6)
// Passar document.querySelectorAll("div.product") como parâmetro.
// Método feito pensando em contornar o cenário caso haja mais de uma imagem dentro da div
// e essa imagem não contenha a url desejada.
// Extrai o id do atributo data-id e constrói um seletor buscando a imagem que possua como 
// atributo src o valor "/img/data-id_447_1.jpg"
// Pode ser ruim caso o nome das imagens mude.
function funcao4() {
    let products = Array.from(document.querySelectorAll("div.product")); 

    return products.reduce((prodList, prod) => {
        let id = "img/" + prod.attributes["data-id"].value + "_447_1.jpg";
        let prodImg = prod.querySelector("img[src='" + id + "']");
        prodList.push({
            // recupera o id
            id: prod.attributes["data-id"].value,
            // atribui a url da imagem selecionada cujo id em seu atributo src é igual ao id do produto
            imageUrl: prodImg.src
        });
        return prodList;
    }, []);
}



/******* Questão 2 *******/

// Versão 1
// Utilizando o método find de array
function question2() {
    // produtos do DOM
    let productsDOM = document.querySelectorAll("div.product");

    // para cada produto do DOM procura na variável productsList o produto cujo id seja igual
    for(prodDOM of productsDOM) {
        // find() retorna a primeira ocorrência do array cujo id seja igual ao do produto no DOM
        let prodItem = window.productList.find((prod) => {
            return prod.id === prodDOM.attributes["data-id"].value;
        });
        // Coloca o conteúdo dentro da tag h2 como uma nova propriedade do objeto
        prodItem.name = prodDOM.querySelector("h2").textContent;
    }
}

// Versão 2
// Utilizando filter e map
function question2() {
    let productsDOM = document.querySelectorAll("div.product");

    for(prodDOM of productsDOM) {
        window.productList
        .filter((prod) => {
            return prod.id === prodDOM.attributes["data-id"].value;
        })
        .map((prod) => {
            // coloca o conteúdo dentro da tag h2 como uma nova propriedade do objeto
            prod.name = prodDOM.querySelector("h2").textContent;
        });
    }
}



/******* Questão 3 *******/

function question3() {
    let productsDOM = document.querySelectorAll("div.product");

    // Irá conter um produto de productList 
    let prodItem;

    // Padrão da Regex para capturar o formato de preço utilizado nos produtos
    // Ex: 1024,99 ; 111.111.111,23 ; 11.233,99
    const patt = /\d{1,4}(\.\d{3})*,\d{2}/;
    let priceFromRegex, priceToRegex;

    // para cada produto do DOM procura na variável productsList o produto cujo id seja igual
    for(prodDOM of productsDOM) {
        // find retorna a primeira ocorrência do array cujo id seja igual ao do produto no DOM
        prodItem = window.productList.find((prodList) => {
            return prodList.id === prodDOM.attributes["data-id"].value;
        });

        // coloca o conteúdo o nome que está dentro da tag h2 como uma nova propriedade do objeto    
        prodItem.name = prodDOM.querySelector("h2").textContent;
        // coloca a url que está na propriedade src da tag img   
        prodItem.imageUrl = prodDOM.querySelector("img").src;

        // seleciona as tags span dentro da div do produto,
        // procura pelo padrão regex dos preços e
        // retorna o preço caso tenha dado match no padrão
        priceFromRegex = patt.exec(prodDOM.querySelectorAll("span")[0].textContent);
        priceToRegex = patt.exec(prodDOM.querySelectorAll("span")[1].textContent);

        // Utilização do operador ternário para incluir os preços no objeto.
        // Caso tenha conseguido extrair, remove os caracteres "." e substituiu "," por "." para
        // poder converter em Number.
        // Do contrário, atribui null à variável (caso do penúltimo produto que não possui preço)
        prodItem.priceFrom = priceFromRegex ? Number(priceFromRegex[0].replace(".", "").replace(",", ".")) : null;
        prodItem.priceTo = priceToRegex ? Number(priceToRegex[0].replace(".", "").replace(",", ".")) : null;
    }
}



/******* Questão Bônus *******/

// Duas abordagens podem ser escolhidas, HTML Storage ou Cookies.
// Foi escolhida a API Storage provida pelo HTML5, pois as informações não trafegam entre o cliente
// e servidor, consegue armazenar uma maior quantidade de dados e possui uma sintaxe de uso
// mais simples do que Cookies.
// Tal funcionalidade permite o armazenamento de dados localmente no browser 
// do usuário sem data de expiração (localStorage) ou durante a sessão (sessionStorage).
// No caso, acredita-se que é interessante armazenar os dados apenas enquanto o usuário
// estiver com a aba da aplicação aberta, por isso o uso do sessionStorage.

// Esta função poderia também executar no momento do clique no botão verde.
// Executar em index.html passando como parâmetro:
// variável window.productList
function storeProducts() {
    // "productsStorage" é a key a ser armazenada
    // para poder armazenar o vetor de objectos é necessário que estejam em string
    sessionStorage.setItem("productsStorage", JSON.stringify(window.productList));
}

// Esta função poderia ser executada quando a página page2.html fosse carregada
// e seu retorno atribuído à uma nova variável window.productList, por exemplo.
// Executar em page2.html para recuperar a variável productList da página index.html
function getProducts() {
    // "productsStorage" é a key para recuperar o que foi armazenado
    // converte a representação em string dos objetos para JSON novamente
    return JSON.parse(sessionStorage.getItem("productsStorage"));
}