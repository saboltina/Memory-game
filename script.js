
            function pievienotRindu(n){
        console.log(n);

        let vecais = document.getElementById("rindas"); 
        if(vecais){
            vecais.remove();
        }

        let rinda = document.createElement("DIV"); 
        rinda.setAttribute("id","rindas");
        document.body.appendChild(rinda);

        for(let i=0; i<n; i++){
            let rindas = document.createElement("DIV"); 
            rindas.setAttribute("id","rinda");               
            rinda.appendChild(rindas);

            for(let j=0; j<n; j++){                            
                let button = document.createElement("button"); 
                rindas.appendChild(button);
                button.setAttribute("id", "button");
                button.innerHTML = "Poga " + (i+1) + "." + (j+1);
            }
        }
    }
           
   
