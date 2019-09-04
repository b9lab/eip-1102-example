const Web3 = require("web3");
const $ = require("jquery");

window.addEventListener('load', async function() {

    if (typeof ethereum !== 'undefined') {
        // Supports EIP-1102 injected Ethereum providers.
        window.web3 = new Web3(ethereum);
    } else if (typeof web3 !== 'undefined') {
        // Supports legacy injected Ethereum providers.
        window.web3 = new Web3(web3.currentProvider);
    } else {
        // Your preferred fallback.
        window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')); 
    }

    try {
        $("#connected").html(`You are connected to network ${await window.web3.eth.net.getId()}`);
    } catch(error) {
        $("#connected").html(`You are have no access to Ethereum: ${error}`);
    }

    $("#otherAddress").change(async function() {
        try {
            $("#otherBalance").html(await window.web3.eth.getBalance($(this).val()));
        } catch(error) {
            $("#otherBalance").html(error);
        }
    });

    const displayMyAccounts = accounts => {
        try {
            if (accounts.length == 0) {
                $("#myAddresses").html("<tr><td colspan='2'>You have no addresses</td></tr>");
            } else {
                $("#myAddresses").html("");
                accounts.forEach(async myAddress => $("#myAddresses").append(`<tr>
                        <td>${myAddress}</td>
                        <td>${await window.web3.eth.getBalance(myAddress)}</td>
                    </tr>`)
                );
            }
        } catch(error) {
            $("#myAddresses").html(error);
        }
    };

    if (typeof ethereum !== 'undefined') {
        $("#allowMyAddresses").click(async () => {
            try {
                displayMyAccounts(await ethereum.enable());
            } catch(error) {
                $("#allowStatus").html("You did not allow to access your addresses");
            }
        });
    } else {
        try {
            displayMyAccounts(await window.web3.eth.getAccounts());
        } catch(error) {
            $("#myAddresses").html(`Failed to get your addresses: ${error}`);
        }        
    }

});
