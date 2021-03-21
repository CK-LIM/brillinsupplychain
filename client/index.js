import Web3 from 'web3';
import SupplyChain from '../build/contracts/SupplyChain.json';

let web3;
let supplychain;

const initWeb3 = () => {
  return new Promise((resolve, reject) => {
    if(typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      window.ethereum.enable()
        .then(() => {
          resolve(
            new Web3(window.ethereum)
          );
        })
        .catch(e => {
          reject(e);
        });
      return;
    }
    if(typeof window.web3 !== 'undefined') {
      return resolve(
        new Web3(window.web3.currentProvider)
      );
    }
    resolve(new Web3('http://localhost:9545'));
  });
};

const initContract = () => {
  const deploymentKey = Object.keys(SupplyChain.networks)[0];
  return new web3.eth.Contract(
    SupplyChain.abi, 
    SupplyChain
      .networks[deploymentKey]
      .address
  );
};

const initApp = () => {
  const $read = document.getElementById('read');
  const $readResult = document.getElementById('read-result');
  const $readResult2 = document.getElementById('read-result2');
  const $readResult3 = document.getElementById('read-result3');
  const $readResult4 = document.getElementById('read-result4');
  const $readResult5 = document.getElementById('read-result5');
  const $readResult6 = document.getElementById('read-result6');
  const $readResult7 = document.getElementById('read-result7');
  const $readResult8 = document.getElementById('read-result8');
  let accounts = [];

  web3.eth.getAccounts()
  .then(_accounts => {
    accounts = _accounts;
  });


  $read.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = e.target.elements[0].value;
    supplychain.methods.fetchGrapeItemBufferOne(id).call()
    .then(result => {
      $readResult.innerHTML = `<i>Drug Name: ${result[4]}</i>`;
    })
    supplychain.methods.fetchGrapeItemBufferOne(id).call()
    .then(result => {
      $readResult2.innerHTML = `<i>Active Ingredients: ${result[5]}</i>`;
    })
    supplychain.methods.fetchGrapeItemBufferOne(id).call()
    .then(result => {
      $readResult3.innerHTML = `<i>Country: ${result[6]}</i>`;
    })
    supplychain.methods.fetchGrapeItemBufferOne(id).call()
    .then(result => {
      $readResult4.innerHTML = `<i>Manufacturer: ${result[7]}</i>`;
    })


    supplychain.methods.fetchGrapeItemBufferTwo(id).call()
    .then(result => {
      $readResult5.innerHTML = `<i>Batch Number: ${result[0]}</i>`;
    })
    supplychain.methods.fetchGrapeItemBufferTwo(id).call()
    .then(result => {
      $readResult6.innerHTML = `<i>Date of Expiry: ${result[1]}</i>`;
    })

    supplychain.methods.fetchJuiceItemBufferOne(id).call()
    .then(result => {
      $readResult7.innerHTML = `<i>Registration Number: ${result[4]}</i>`;
    })
    supplychain.methods.fetchJuiceItemBufferOne(id).call()
    .then(result => {
      $readResult8.innerHTML = `<i>Indications: ${result[9]}</i>`;
    })

    .catch(_e => {
      $readResult.innerHTML = `<i>Oops... there was an error while trying to read user ${id}</i>`;
    });
  });

};

document.addEventListener('DOMContentLoaded', () => {
  initWeb3()
    .then(_web3 => {
      web3 = _web3;
      supplychain = initContract();
      initApp(); 
    })
    .catch(e => console.log(e.message));
});
