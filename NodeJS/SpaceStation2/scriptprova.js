async function getExperiments() {
    let response = await fetch('http://localhost:3000/experiments');
    let data = await response.json();
    let active_count= 0;
    let standby_count = 0;
    let can_active_more = false;
    for(experiment of data.experiments){
        if(experiment.status=== "active"){
            active_count++;
        }
        if(experiment.status === "standby"){
            standby_count++;
        }

    }
        if(data.powerStatus.available > 3){
        can_active_more = true;
    }
    return({
        activeCount: active_count,
        standbyCount : standby_count,
        canActiveMore : can_active_more

    });
}
async function getLowLevelExperiments() {
    let response = await fetch('http://localhost:3000/experiments');
    let data = await response.json();
    let commandsFromServer = [];
    for(let experiment of data.experiments){
        if(experiment.status === "active" && experiment.priority  === "low"){
            let responsePOST = await fetch('http://localhost:3000/commands',{
                method : 'POST',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify({
                    action : "shutdown",
                    experimentId : experiment.id,
                    reason : "just because"
                })
            })
            let dataPOST = await responsePOST.json();
            let commandId = dataPOST.command.id;
            if(dataPOST.success){
                 commandsFromServer.push({
                commandId: commandId,
                experimentId : experiment.id
            })
            }else{
                 commandsFromServer.push({
                error: "non va",
                experimentId : "nessuno"
            })
            }

        }
    }
        return commandsFromServer;
}
async function executePendingCommands() {

    let response = await fetch("http://localhost:3000/commands");
    let json = await response.json();

    let executedCount = 0;
    let failedCount = 0;
    let results = [];

    for (let command of json.queue) {

        if (command.status === "pending") {

            let responsePUT = await fetch(
                "http://localhost:3000/commands/" + command.id + "/execute",
                { method: 'PUT' }
            );

            let jsonPUT = await responsePUT.json();

            if (jsonPUT.success) {

                executedCount++;

                results.push({
                    commandId: command.id,
                    experimentId: command.experimentId,
                    success: true
                });

            } else {

                failedCount++;

                results.push({
                    commandId: command.id,
                    experimentId: command.experimentId,
                    success: false
                });

            }
        }
    }

    return {
        executed: executedCount,
        failed: failedCount,
        results: results
    };

}


    async function printResults() {
        let result = await getExperiments();
        console.log(result);
        let result2 = await getLowLevelExperiments();
        console.log(result2);
        let result3 = await executePendingCommands();
        console.log(result3)
    }

printResults();