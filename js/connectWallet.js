const connectBtn = document.querySelector("#box2");
const connectBtn2 = document.querySelector("#connect");
const cancel = document.querySelector("#cancel");
const cancel2 = document.querySelector("#cancel2");
const save = document.querySelector("#save");
const username = document.querySelector("#username");
const usernameText = document.querySelector("#usernameText");
const disconnect = document.querySelector("#disconnect");
const wallet = document.querySelector("#wallet");
const runBtn = document.querySelector("#box3");
const connectTwitterButton = document.getElementById("box1");
const modal = document.querySelector("#modal");
const modal2 = document.querySelector("#modal2");
const openForest = document.querySelector("#openForest")
const openDesert = document.querySelector("#openDesert")

let walletConnected = false;
let twitterConnected = false;

const getProvider = () => {
    try {
        if ('phantom' in window) {
            const provider = window.phantom?.solana;
            if (provider?.isPhantom) {
                return provider;
            }
        }
        window.open('https://phantom.app/', '_blank');
    } catch (err) {
        alert(err);
    }
};

const connectWallet = async () => {
    const provider = getProvider();
    try {
        const resp = await provider.connect();
        const address = resp.publicKey.toString()
        wallet.innerText = address;
        localStorage.setItem("user_wallet", address);
        connectBtn2.classList.add("hide");
        disconnect.classList.remove("hide");
        openForest.href = "/game.html?wallet=" + address;
        openDesert.href = "/game.html?wallet=" + address;
        walletConnected = true;
    } catch (err) {
        alert(err);
    }
}

const disconnecttWallet = async () => {
    const provider = getProvider();
    try {
        provider.disconnect();
        wallet.innerText = "";
        localStorage.setItem("user_wallet", "");
        disconnect.classList.add("hide");
        connectBtn2.classList.remove("hide");
        walletConnected = false;
    } catch (err) {
        console.log(err);
    }
}

const openModal = () => {
    modal.classList.remove("hide");
}

const openModal2 = () => {
    modal2.classList.remove("hide");
}

const handleCloseModals = () => {
    modal.classList.add("hide");
    modal2.classList.add("hide");
}


const handleRun = () => {
    if (!walletConnected) {
        alert("Connect your wallet");
        return
    }
    if (!twitterConnected) {
        alert("Connect your twitter");
        return
    }
    openModal();
}

const handleSave = () => {
    if ((username.value.length < 3) || (!username.value.startsWith("@"))) {
        alert("invalid username");
        return;
    }
    usernameText.innerText = username.value;
    localStorage.setItem("user_twitter", username.value);
    twitterConnected = true;
    handleCloseModals();
}

connectTwitterButton.addEventListener("click", e => {
    openModal2();
});


const init = () => {
    const user_wallet = localStorage.getItem("user_wallet");
    const user_twitter = localStorage.getItem("user_twitter");

    console.log(user_twitter);

    if (user_wallet) {
        wallet.innerText = user_wallet;
        walletConnected = true;
    }

    if (user_twitter) {
        usernameText.innerText = user_twitter;
        twitterConnected = true;
    }

}


runBtn.addEventListener("click", handleRun);
connectBtn.addEventListener("click", connectWallet);
connectBtn2.addEventListener("click", connectWallet);
disconnect.addEventListener("click", disconnecttWallet);
save.addEventListener("click", handleSave);
cancel.addEventListener("click", handleCloseModals);
cancel2.addEventListener("click", handleCloseModals);

init();

