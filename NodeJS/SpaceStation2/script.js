function task1(){

}

async function shutdownLowExperiments() {

    const response = await fetch('http://localhost:3000/experiments');
    const data = await response.json();

    let commandsFromServer = [];
    for (let experiment of data.experiments) {

        if (experiment.status === "active" && experiment.priority === "low") {

            const responsePOST = await fetch('http://localhost:3000/experiments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: "shutdown",
                    experimentID: experiment.id,
                    reason: "obsoleto"
                })
            });

            const dataPOST = await responsePOST.json();

            if (dataPOST.success) {
                commandsFromServer.push({
                    experimentID: experiment.id,
                    commandID: dataPOST.command.id
                });
            }
        }
    }

    return commandsFromServer;
}

shutdownLowExperiments();
