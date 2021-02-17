



const inputPackageNamesEl = document.querySelector('#packageNames')
const btnGenerateEl = document.querySelector('#btnGenerate');
const selectEnvEl = document.querySelector('#envs');
let checkboxEls = document.querySelectorAll(".inptCheckbox");
const displayTagEl = document.querySelector('#displayTag');
const displayDivEl = document.querySelector('#displayDiv');
const btnEnvs = document.querySelector("#btnEnvs");
const btnDevEnvs = document.querySelector("#btnDevEnvs");
const displayEnvsEl = document.querySelector("#displayEnvsDiv");
const divEnvs0El = document.querySelector("#divEnvs0");
const divEnvs1El = document.querySelector("#divEnvs1");
const btnSignOffEl = document.querySelector('#btnSignoff');
const inputGeneratedLinksEl = document.querySelector('#generatedLinks');


let domain = [];
let packageNames = [];
let packagePrefix = [];


const createLink = function (packageNames, environments) {
    
    //CLEAR PREVIOUS INPUT ON GENERATE CLICK OR ENTER KEY PRESS
    displayDivEl.textContent = '';
    displayDivEl.innerHTML = '';

    packageNames = packageNames.split('\n');
    
    inputGeneratedLinksEl.value = '';
    for (let i = 0; i < packageNames.length; i++) {

        //REPLACE BLANK SPACE WITH -
        packageNames[i] = packageNames[i].replace(/ /g, '-');
        
        //ADD .zip
        if (packageNames[i].substring(packageNames[i].length - 4, packageNames[i].length) !== '.zip') {
            packageNames[i] = packageNames[i] + '.zip';
        }

        //CREATE PACKAGE PREFIXES
        packagePrefix[i] = packageNames[i].split('-')[0];

        

        switch (packagePrefix[i]) {
            case 'WEB':
            case 'skateboardSGD':
            case 'skateboardConsole':
            case 'skateboard':
            case 'SGD':
            case 'RGSFULLDEPLOY':
            case 'RGSENVSETUPFULLDEPLOY':
            case 'PGF':
            case 'gleGames':
                domain[i] = 'rgsmvn';
                break;
            case 'cache':
                domain[i] = 'cache_micro';
                break;
            case 'PAS':
            case 'PASDatabase':
            case 'PASEnvSetup':
                domain[i] = 'pas';
                break;
            case 'nss':
            case 'nssEnvSetup':
                domain[i] = 'nss_micro';
                break;
            case 'gsr':
            case 'gsrEnvSetup':
                domain[i] = 'gsr_micro';
                break;
            case 'cfgs':
            case 'cfgsEnvSetup':
                domain[i] = 'cfgs_micro';
                break;
            case 'uid':
            case 'uidEnvSetup':
                domain[i] = 'uid_micro';
                break;
            case 'TS':
            case 'TSDatabase':
            case 'TSEnvSetup':
                domain[i] = 'ts';
                break;
            case 'cecEnvSetup':
            case 'cec':
            case 'eventDescriptors':
                domain[i] = 'cec';
                break;
            case 'flightdeck':
            case 'flightdeckEnvSetup':
                domain[i] = 'flightdeck_micro';
                break;
            case 'competition':
            case 'competitionEnvSetup':
                domain[i] = 'competition_micro';
                break;
            case 'ruleengine':
            case 'ruleengineEnvSetup':
                domain[i] = 'ruleengine_micro';
                break;
            case 'merchandise':
                domain[i] = 'merchandise';
                break;
            default:
                document.querySelector('#displayTag').textContent = 'Wrong package prefix';
                //return;
        }

        const gameNameNode = document.createElement('p');
        gameNameNode.textContent = (packageNames[i]);
        displayDivEl.appendChild(gameNameNode);

        for (let j = 0; j < environments.length;j++) {
            //CREATE HREF ELEMENTS AND APPEND THEM TO #displayDiv
            const node = document.createElement('a');
            
            node.href = `http://deploy.corp.wagerworks.com:7000/deployer/php/deployment.php?action=deployapp&release=${packageNames[i]}&service=${packagePrefix[i]}&env=${environments[j]}&domain=${domain[i]}`;
            node.textContent = `http://deploy.corp.wagerworks.com:7000/deployer/php/deployment.php?action=deployapp&release=${packageNames[i]}&service=${packagePrefix[i]}&env=${environments[j]}&domain=${domain[i]}`;
            node.style = 'display:block; margin:0px 0;';
            node.target = '_blank';
            
            displayDivEl.appendChild(node);          

            //GENERATE LINKS FOR THE generatedLinks.txt FILE ON THE SERVER
            inputGeneratedLinksEl.value = inputGeneratedLinksEl.value + `http://deploy.corp.wagerworks.com:7000/deployer/php/deployment.php?action=deployapp&release=${packageNames[i]}&service=${packagePrefix[i]}&env=${environments[j]}&domain=${domain[i]}\n`
            
        }
        console.log(generatedLinks);
        const breakNode = document.createElement('br');
        displayDivEl.appendChild(breakNode);
    }

}

btnGenerate.addEventListener('click', function () {
    generate();
});

function generate() {
	
    //CHECK WHICH ENVS ARE SELECTED
    let environments = [];
    for(let i = 0; i < checkboxEls.length; i++) {
        if(checkboxEls[i].checked == true) {
            environments.push(checkboxEls[i].value);
        }
    }

    console.log(`Environments selected: ${environments}`);

    //CREATE LINKS
    createLink(inputPackageNamesEl.value, environments);

}





function resetChkbox() {
    for(let i = 0; i < checkboxEls.length; i++) {
       if(checkboxEls[i].checked == true) {
           checkboxEls[i].checked = false;
       }
   }
}

btnSignOffEl.addEventListener('click', function(){
    resetChkbox();
    document.getElementById("cust02").checked = true;
    document.getElementById("cust03").checked = true;
    document.getElementById("cust07").checked = true;
    document.getElementById("demo03").checked = true;
    document.getElementById("demo04").checked = true;
    generate();
});

btnReset.addEventListener('click', function () {
    resetChkbox();
});


let script = document.createElement("script");

btnEnvs.addEventListener('click', function() {
    btnDevEnvs.classList.remove("active");
    btnEnvs.classList.add("active");
    divEnvs0El.style.display = 'block';    
    divEnvs1El.style.display = 'none';
    btnSignOffEl.style.display = 'block';  

});

btnDevEnvs.addEventListener('click', function() {
    btnEnvs.classList.remove("active");
    btnDevEnvs.classList.add("active");
    divEnvs0El.style.display = 'none';    
    divEnvs1El.style.display = 'block';  
    btnSignOffEl.style.display = 'none';    

});



/* TEST PACKAGES

WEB-blackjackMHVariantsSurrender.1.0.5.SNAPSHOT.installation.zip
SGD-PBWOFLatinGetaways.ML2.0.0.CL357688.V1.0.0_8.zip

*/


