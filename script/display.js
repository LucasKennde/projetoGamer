const display = document.querySelector('.container')
const displayModal = document.querySelector('.modal')

const jobs = [
    {
        id: 1,
        title: 'Mercenary',
        description: 'Kill people for money',
        Image: './assets/jobs/assassin.png'
    },
    {
        id: 2,
        title: 'Teacher',
        description: 'Kill people for money',
        Image: './assets/jobs/teacher.png'
    },
    {
        id: 3,
        title: 'Lord',
        description: 'Kill people for money',
        Image: './assets/jobs/lord.png'
    },
    {
        id: 4,
        title: 'Sniper',
        description: 'Kill people for money',
        Image: './assets/jobs/sniper.png'
    },
    {
        id: 5,
        title: 'Wizzard',
        description: 'Kill people for money',
        Image: './assets/jobs/wizzard.png'
    },
]

const users = JSON.parse(localStorage.getItem('usuarios')) ||[];
let logado = JSON.parse(localStorage.getItem('logado')) || [];
let char = JSON.parse(localStorage.getItem('chars')) || [];
let charData = {}

function displayLogin() {

    display.innerHTML = `
    <div class="display">
                <div class="headerForm">
                    <span>Login</span>
                </div>
                <div class="contentForm">
                        <label for="username"> Usuario: </label>
                        <input type="text" name="username" id="username" placeholder="Enter your username">
                        <label for="password"> Senha: </label> 
                        <input type="password" name="password" id="password" placeholder="Enter your Password">
                        
                </div>
                <div class="footerForm">
                    <button onclick='handleLogin()'>Logar</button>
                    <button onclick='displayCadastro()'>Cadastre-se</button>
                </div>
    </div>
    
    `;
}

function displayCadastro() {

    display.innerHTML = `
    <div class="display">
                <div class="headerForm">
                    <span>Cadastro</span>
                </div>
                <div class="contentForm">
                        <label for="username"> Usuario: </label>
                        <input type="text" name="username" id="CADusername" placeholder="Enter your username">
                        <label for="password"> Senha: </label> 
                        <input type="password" name="password" id="CADpassword" placeholder="Enter your Password">
                        <label for="confPassword"> Confirme a senha: </label> 
                        <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm your Password">
                        
                </div>
                <div class="footerForm">
                    <button onclick='cadastrarUser()'>Cadastrar</button>
                    <button onclick='displayLogin()'>Voltar</button>
                </div>
    </div>
    
    `;
}
function displayLabel() {

    display.innerHTML = `
    <div class="display">
                <div class="headerForm">
                    <span>Label</span>
                </div>
                <div class="contentForm">
                    <div class = 'labelForm'>
                    </div>

                        
                </div>
                <div class="footerForm">
                    <button onclick='modalON("Parabéns, você logou, mas o nosso sistema só vai até aqui!")'>Logar</button>
                    <button onclick='logout()'>Sair</button>
                </div>
    </div>
    
    `;
    const contentForm = document.querySelector('.labelForm')
    

    const usuario = char.filter(user => user.usuario === logado[0].username)
    console.log(usuario.length)
    if(usuario.length===0){
        for (let x = 0; x < 3; x++) {
            contentForm.innerHTML += `<div class='char' onclick='displayCadatroChar()'></div>`
        }
        return
    }

    for (let x = 0; x < usuario.length; x++) {
       contentForm.innerHTML += `<div class='char charCriado'><img src='${usuario[x].Image}'></div>`
    }
    for (let x = 0; x < 3 - usuario.length; x++) {
        contentForm.innerHTML += `<div class='char' onclick='displayCadatroChar()'></div>`
    }
    
    
}


let primaryIndex = 0;
let maxStatus = 30
function displayCadatroChar() {
    display.innerHTML = `
    <div class="display">
                <div class="headerForm">
                    <span>Criar Char</span>
                </div>
                <div class="contentForm">
                    <h2 id='titleChar'>${jobs[primaryIndex].title}</h2>
                    <div class = 'cadChar'>
                     <div id='selectJobs'>
                     <button onclick='charIMAGE(-1)'><</button>
                     <span id='charJOBS'><img src='${jobs[primaryIndex].Image}'></span>
                     <button onclick='charIMAGE(+1)'>></button>
                     </div>
                     <div id='selectStatus'>
                     <h2>Status: ${maxStatus}</h2>
                     <div id='statusRange'>
                     <div id='labelRange'>
                     <span id='spanstr'>str: 0</span>
                     <span id='spanagi'>agi: 0</span>
                     <span id='spanvit'>vit: 0</span>
                     <span id='spanint'>int: 0</span>
                     <span id='spandex'>dex: 0</span>
                     <span id='spanluk'>luk: 0</span>
                     </div>
                     <div id='rangeBar'>
                    
                    
                    
                    <span>
                    <button onclick='contagemStatus("str", -1)'><</button>
                    <input type="range" value ='0' id="str" name="str" min="0" max=${maxStatus} />
                    <button onclick='contagemStatus("str", +1)'>></button>
                    </span>
                    <span>
                    <button onclick='contagemStatus("agi", -1)'><</button>
                    <input type="range" value ='0' id="agi" name="agi" min="0" max=${maxStatus} />
                    <button onclick='contagemStatus("agi", +1)'>></button>
                    </span>
                    <span>
                    <button onclick='contagemStatus("vit", -1)'><</button>
                    <input type="range" value ='0' id="vit" name="vit" min="0" max=${maxStatus} />
                    <button onclick='contagemStatus("vit", +1)'>></button>
                    </span>
                    <span>
                    <button onclick='contagemStatus("int", -1)'><</button>
                    <input type="range" value ='0' id="int" name="int" min="0" max=${maxStatus} />
                    <button onclick='contagemStatus("int", +1)'>></button>
                    </span>
                    <span>
                    <button onclick='contagemStatus("dex", -1)'><</button>
                    <input type="range" value ='0' id="dex" name="dex" min="0" max=${maxStatus} />
                    <button onclick='contagemStatus("dex", +1)'>></button>
                    </span>
                    <span>
                    <button onclick='contagemStatus("luk", -1)'><</button>
                    <input type="range" value ='0' id="luk" name="luk" min="0" max=${maxStatus} />
                    <button onclick='contagemStatus("luk", +1)'>></button>
                    </span>
                    
                     </div>
                     
                     </div>
                     </div>
                        
                    </div>

                        
                </div>
                <div class="footerForm">
                    <button onclick='cadastrarChar()'>Cadastrar</button>
                    <button onclick='displayLabel()'>Voltar</button>
                </div>
    </div> 
    
    `;
    

}
function contagemStatus(atributo, valor) {
    const elem = document.getElementById(atributo);
    const newValue = parseInt(elem.value) + valor;

    if (newValue >= parseInt(elem.min) && newValue <= parseInt(elem.max) && (maxStatus - valor) >= 0) {
        elem.value = newValue;
        maxStatus -= valor;
        document.querySelector('#selectStatus h2').innerText = `Status: ${maxStatus}`;
        document.getElementById('span'+atributo).innerHTML = `${atributo}: ${elem.value}`
    }
}

function charIMAGE(value) {
    primaryIndex += value;

    if (primaryIndex < 0) {
        primaryIndex = jobs.length - 1;
    } else if (primaryIndex >= jobs.length) {
        primaryIndex = 0;
    }

    const titleChar = document.querySelector('#titleChar');
    const charJOBS = document.querySelector('#charJOBS');
    charJOBS.innerHTML = `<img src='${jobs[primaryIndex].Image}'>`;
    titleChar.innerHTML = `${jobs[primaryIndex].title}`;

}
function cadastrarChar() {
    const charTitle = jobs[primaryIndex].title;
    const Image = jobs[primaryIndex].Image;
    const username = logado[0].username;

    const charStatus = {
        str: document.getElementById('str').value,
        agi: document.getElementById('agi').value,
        vit: document.getElementById('vit').value,
        int: document.getElementById('int').value,
        dex: document.getElementById('dex').value,
        luk: document.getElementById('luk').value
    };

    charData = {
        title: charTitle,
        Image: Image,
        usuario: username,
        status: charStatus
    };

    char.push(charData);
    localStorage.setItem('chars', JSON.stringify(char))
    modalON('Char Cadastrado com sucesso')
    displayLabel()

}
async function cadastrarUser() {
    // e.preventDefault();
    const inputUser = document.querySelector('#CADusername')
    const password = document.querySelector('#CADpassword')
    const confirmPassword = document.querySelector('#confirmPassword')

    const usuario = users.find(user => user.username === inputUser.value)
    if(usuario) {
        modalERRO('Usuario ja existe')
        return
    }

    if(inputUser.value === '' || password.value === '' || confirmPassword.value ===''){
        modalERRO("Todos os campos precisam ser preenchidos")
    }else if(password.value != confirmPassword.value){
        modalERRO("As senhas precisam ser iguais")
    }else{
        const hashedPassword = await hashPassword(password.value)
        const novoUsuario = {
            username: inputUser.value,
            password: hashedPassword,
        }
        users.push(novoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(users));
        modalON("Cadastro Efetuado com sucesso")
        displayLogin()
    }
    
        // modalERRO('Erro ao cadastrar usuario')

}

async function handleLogin() {

    const inputUser = document.querySelector('#username')
    const password = document.querySelector('#password')
    
    const hashedPassword = await hashPassword(password.value)
    if(inputUser.value =='' || password.value ==''){
        modalERRO('Todos os campos precisam ser preenchidos')
        return
    }   
    const usuario = users.find(user => user.username === inputUser.value)
    if (usuario.password === hashedPassword) {
        modalON('Parabéns, você logou')
        const statusLOG = {
            username: usuario.username,
            log: 'logado'
        }
        logado.push(statusLOG)
        localStorage.setItem('logado', JSON.stringify(logado));
        
        displayLabel()


    } else {
        modalERRO('Algo errado no login!')
    }


    
    
}
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(hash)));
}


function modalON(inform) {
    displayModal.style.display = "block";
    displayModal.innerHTML = `<P>${inform}</P>`
    displayModal.classList.add('fade-in-out');
    setTimeout(
        () => {
            // displayModal.classList.add('fade-out');
            // displayModal.classList.remove('fade-in');
            displayModal.style.display = "none";

        }, 1550
    )
}

function modalERRO(inform) {
    displayModal.classList.add('error');
    displayModal.style.display = "block";
    displayModal.innerHTML = `<P>${inform}</P>`
    displayModal.classList.add('fade-in-out');
    setTimeout(
        () => {
            // displayModal.classList.add('fade-out');
            // displayModal.classList.remove('fade-in');
            displayModal.classList.remove('error');
            displayModal.style.display = "none";

        }, 1550
    )
}

function logout(){
    localStorage.removeItem('logado');
    displayLogin()
    location.reload()
    
}
if(logado.length===1){
    displayLabel()
}else{
    displayLogin()
}