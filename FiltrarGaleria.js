let eventos = undefined;

async function GetData()
{
    const url = "http://localhost:3000/eventos";
    try
    {
        const response = await fetch(url)
        .then(response => response.json())
        .then(data => {
            eventos = data;
        });
    }

    catch (error)
    {
        console.error(error.message);
    }
}

GetData();

let elementos = [];

const father = document.getElementById("FotosEvento");

function OnEventUpdate(newEvent)
{
    if (eventos != undefined)
    {
        if (elementos.length > 0)
        {
            while (elementos.length > 0)
            {
                elementos[0].remove();
                elementos.splice(0, 1);
            }
        }

        if(newEvent.target.value == "-1"){
            document.getElementById("NomeDoEvento").textContent = "";
            return;
        }
        
        let n = 0;

        while (n < eventos[newEvent.target.value].fotos.length)
        {
            CreateElement(eventos[newEvent.target.value].fotos[n]);

            n += 1;
        }

        document.getElementById("NomeDoEvento").textContent = eventos[newEvent.target.value].eventName;
    }

    // eventos.titulo = "Teste";

    // fetch('http://localhost:3000', {
    //     method: "PATCH",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(eventos)
    // });
}

function CreateElement(path)
{
    const newElement = document.createElement("img");
    newElement.setAttribute("src", path);
    father.appendChild(newElement);

    elementos.push(newElement);
}