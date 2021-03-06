let produitStorage = JSON.parse(localStorage.getItem("produit"))
let products=[];

if(produitStorage){
    for(let i = 0; i<produitStorage.length;i++){
        products.push(produitStorage[i].idProduit)
    }
}

let pageConfirmation = document.getElementById("confirm")
let erreurConfirmation = document.getElementById("erreurConfirmation")

//Si le local storage est vide, ne pas afficher la page de confirmation
if(products.length ==0){
    erreurConfirmation.style.display="flex"
    pageConfirmation.style.display="none"
    
} else{ //Affichage de la page de confirmation avec l'order ID
    pageConfirmation.style.display="flex"
    erreurConfirmation.style.display="none"
    let contactStorage = JSON.parse(localStorage.getItem("contact"))
    let contact= contactStorage[0]

    let totalPrice = JSON.parse(localStorage.getItem("totalPrice"))
    let afficherTotalPrice = document.createElement("p")
    afficherTotalPrice.textContent = "Pour rappel, le prix total de votre commande est de " + totalPrice +"€"
    let essai = document.getElementById("confirm")
    essai.appendChild(afficherTotalPrice)

    const aEnvoyer = {
        products,
        contact
    }
    
    //Récupération de l'order ID
    fetch('http://localhost:3000/api/furniture/order',{
        method: "POST",
        body: JSON.stringify(aEnvoyer),
        headers:{
            "content-type":"application/JSON"
        }
    })
    .then((reponse)=>{
        const orderData = reponse.json();
        orderData.then((orderDt) =>{
            let orderStorage =[];
            orderStorage.push(orderDt.orderId)
            localStorage.setItem("orderId",JSON.stringify(orderStorage))
            let textOrderId = document.getElementById("orderIdText")
            textOrderId.textContent = "Votre numéro de commande est le " + orderDt.orderId
            localStorage.clear()         
        })
    })
}





