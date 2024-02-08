function pedirMenus(){

    
    if (document.querySelector('.pedido')) {
        document.querySelector('.pedido').remove();    
    }
    
    const confirmar = document.querySelector('.btn-confirmar');    

    const box = document.getElementById("menuBox");
    const pedido = document.createElement('form');
    pedido.classList.add("pedido");
    pedido.setAttribute('method', 'POST');  
    pedido.setAttribute('action', '/pedir/enviar');
    
    box.appendChild(pedido);
    
    const label = document.createElement('label');
    label.innerText = 'Selecciona un menú';
    label.setAttribute("for", "menu");
    label.classList.add("pb-2");

    pedido.appendChild(label);
    
    const select = document.createElement('select');
    select.classList.add("form-select");
    select.setAttribute("name", "menu");

    fetch('/pedir/menus').then((response) => response.json())
    
    .then((menus) => {

        menus.results.forEach((menu) => {

            const  opcion = document.createElement('option');
            opcion.value= menu.nombre;
            opcion.textContent=`${menu.nombre} - ${menu.precio}€`; 

            select.appendChild(opcion);
            pedido.appendChild(select);
        });

    });

    
    select.addEventListener('change', (event) => {

    
        if (document.querySelector('.bebida')) {
            document.querySelector('.bebida').remove();    
        }

                        
        if (document.querySelector('.patatas')) {
            document.querySelector('.patatas').remove();    
        }

        if(confirmar.classList.contains('d-block')){
            confirmar.classList.remove('d-block');
            confirmar.classList.add('d-none');
        }

        const bebidaBox = document.createElement('div');
        bebidaBox.classList.add("py-4");
        bebidaBox.classList.add("bebida");

        const label = document.createElement('label');
        label.innerText = '¿Qué bebida deseas?';
        label.setAttribute("for", "bebida");
        label.classList.add("pb-2");

        const select = document.createElement('select');
        select.classList.add("form-select");
        select.setAttribute("name", "bebida");

        bebidaBox.appendChild(label);
        bebidaBox.appendChild(select);
        pedido.appendChild(bebidaBox);


        fetch('/pedir/bebidas').then((response) => response.json())
        
        .then((bebidas) => {

            bebidas.results.forEach((bebida) => {

                const  opcion = document.createElement('option');
                opcion.value= bebida.nombre;
                opcion.textContent=`${bebida.nombre} - ${bebida.precio}€`;  

                select.appendChild(opcion);
                bebidaBox.appendChild(select);
            });

        });

        select.addEventListener('change', (event) => {

                
            if (document.querySelector('.patatas')) {
                document.querySelector('.patatas').remove();    
            }
            
            const patatasBox = document.createElement('div');
            patatasBox.classList.add("pb-2");
            patatasBox.classList.add("patatas");
    
            const label = document.createElement('label');
            label.innerText = 'Agrega las patatas';
            label.setAttribute("for", "patatas");
            label.classList.add("pb-2");
    
            const select = document.createElement('select');
            select.classList.add("form-select");
            select.setAttribute("name", "patatas");
    
            patatasBox.appendChild(label);
            patatasBox.appendChild(select);
            pedido.appendChild(patatasBox);
    
    
            fetch('/pedir/patatas').then((response) => response.json())
            
            .then((patatas) => {
    
                patatas.results.forEach((patata) => {
    
                    const  opcion = document.createElement('option');
                    opcion.value= patata.nombre;
                    opcion.textContent=`${patata.nombre} - ${patata.precio}€`;  
    
                    select.appendChild(opcion);
                    patatasBox.appendChild(select);
                });
    
            });

            confirmar.classList.remove('d-none');
            confirmar.classList.add('d-block');
            confirmar.removeAttribute('disabled');
            pedido.appendChild(confirmar);

        });
    });

    confirmar.addEventListener('click', (e)=>{

        const menu = document.querySelector('select[name="menu"]').value;
        const bebida = document.querySelector('select[name="bebida"]').value;
        const patatas = document.querySelector('select[name="patatas"]').value;

        const confirmacion = document.querySelector('.alert-success');
        const erroConfirmacion = document.querySelector('.alert-danger');

        pedido.appendChild(confirmacion);
        pedido.appendChild(erroConfirmacion);

        e.preventDefault();

        fetch('/pedir/enviar', {
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                menu,
                bebida,
                patatas
            })
        }).then((response) => response.json())
        
        .then((data)=>{
            console.log(data)
            if(!data){
                erroConfirmacion.classList.toggle('d-none');
            }
                confirmacion.classList.toggle('d-none');
        });
    });
    
};

function pedirHaburguesas(){

    if (document.querySelector('.pedido')) {
        document.querySelector('.pedido').remove();    
    }

    const confirmar = document.querySelector('.btn-confirmar');    

    const box = document.getElementById("hamburguesasBox");
    const pedido = document.createElement('div');
    pedido.classList.add("pedido");
    
    box.appendChild(pedido);
    
    const label = document.createElement('label');
    label.innerText = 'Selecciona una hamburguesa';
    label.setAttribute("for", "menu");
    label.classList.add("pb-2");

    pedido.appendChild(label);

    const select = document.createElement('select');
    select.classList.add("form-select");
    select.setAttribute("name", "menu");


    fetch('/pedir/hamburguesas').then((response) => response.json())
    
    .then((habueguesas) => {

        habueguesas.results.forEach((habueguesa) => {

            const  opcion = document.createElement('option');
            opcion.value= habueguesa.nombre;
            opcion.textContent=`${habueguesa.nombre} - ${habueguesa.precio}€`; 

            select.appendChild(opcion);
            pedido.appendChild(select);
        });

    });

    
    select.addEventListener('change', (event) => {
        

        if (document.querySelector('.patatas')) {
            document.querySelector('.patatas').remove();    
        }
        
        const patatasBox = document.createElement('div');
        patatasBox.classList.add("py-4");

        const label = document.createElement('label');
        label.innerText = 'Agrega las patatas';
        label.setAttribute("for", "patatas");
        label.classList.add("pb-2");

        const select = document.createElement('select');
        select.classList.add("form-select");
        select.setAttribute("name", "patatas");

        patatasBox.appendChild(label);
        patatasBox.appendChild(select);
        pedido.appendChild(patatasBox);


        fetch('/pedir/patatas').then((response) => response.json())
        
        .then((patatas) => {

            patatas.results.forEach((patata) => {

                const  opcion = document.createElement('option');
                opcion.value= patata.nombre;
                opcion.textContent=`${patata.nombre} - ${patata.precio}€`;  

                select.appendChild(opcion);
                patatasBox.appendChild(select);
            });

        });

        confirmar.classList.remove('d-none');
        confirmar.removeAttribute('disabled');
        pedido.appendChild(confirmar);
    });

    confirmar.addEventListener('click', (e)=>{

        const menu = document.querySelector('select[name="menu"]').value;
        const patatas = document.querySelector('select[name="patatas"]').value;

        const confirmacion = document.querySelector('.alert-success');
        const erroConfirmacion = document.querySelector('.alert-danger');

        pedido.appendChild(confirmacion);
        pedido.appendChild(erroConfirmacion);

        e.preventDefault();

        fetch('/pedir/enviar', {
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                menu,
                patatas
            })
        }).then((response) => response.json())

        .then((data)=>{

            if(!data){
                erroConfirmacion.classList.toggle('d-none');
            }
                confirmacion.classList.toggle('d-none');
        });
    });
};

function pedirBebidas(){


    if (document.querySelector('.pedido')) {
        document.querySelector('.pedido').remove();    
    }

    const confirmar = document.querySelector('.btn-confirmar');    

    const box = document.getElementById("bebidasBox");
    const pedido = document.createElement('div');
    pedido.classList.add("pedido");
    
    box.appendChild(pedido);
    
    const label = document.createElement('label');
    label.innerText = 'Selecciona una Bebida';
    label.setAttribute("for", "bebida");
    label.classList.add("pb-2");

    pedido.appendChild(label);

    const select = document.createElement('select');
    select.classList.add("form-select");
    select.setAttribute("name", "bebida");


    fetch('/pedir/bebidas').then((response) => response.json())
    
    .then((bebidas) => {

        bebidas.results.forEach((bebida) => {

            const  opcion = document.createElement('option');
            opcion.value= bebida.nombre;
            opcion.textContent=`${bebida.nombre} - ${bebida.precio}€`; 

            select.appendChild(opcion);
            pedido.appendChild(select);
        });

    });

    select.addEventListener('change', (event) => {
        confirmar.classList.remove('d-none');
        confirmar.removeAttribute('disabled');
        pedido.appendChild(confirmar);
    });

    confirmar.addEventListener('click', (e)=>{

        const bebida = document.querySelector('select[name="bebida"]').value;

        const confirmacion = document.querySelector('.alert-success');
        const erroConfirmacion = document.querySelector('.alert-danger');

        pedido.appendChild(confirmacion);
        pedido.appendChild(erroConfirmacion);

        e.preventDefault();

        fetch('/pedir/enviar', {
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                bebida,
            })
        }).then((response) => response.json())
        .then((data)=>{

            if(!data){
                erroConfirmacion.classList.toggle('d-none');
            }
                confirmacion.classList.toggle('d-none');
        });
    });


};