async function countExperiments(){
    const response = await fetch('http://localhost:3000/experiments');
    const data = await response.json();

    let activeCount = 0;
    let standbyCount = 0;
    let experiments = data.experiments;
    let canActivateMore = false;

    for(let experiment of experiments){
        if(experiment.status === "active"){
            activeCount++;
        }
        if(experiment.status === "standby"){
            standbyCount++;
        }
    }

    if(data.powerStatus.available > 3){
        canActivateMore = true;
    }

    return {
        activeCount: activeCount,
        standbyCount: standbyCount,
        canActivateMore: canActivateMore
    };
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
async function executePendingCommands() {
    let response = await fetch('http://localhost:3000/commands');
    let data = await response.json();
    const commands = data.queue;

    let executedCount = 0;
    let failedCount = 0;
    const results = [];

    for (let command of commands) {
        if (command.status === "pending") {
            let responsePUT = await fetch(
                `http://localhost:3000/commands/${command.id}/execute`,
                { method: 'PUT' }
            );
            let dataPUT = await responsePUT.json();

            if (dataPUT.success) {
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
                    success: false,
                    error: dataPUT.error
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

async function executeEmergencyStop(){
    let response = await fetch('http://localhost:3000/experiments')
    let data = await response.json();






};






async function printResults() {
const results = await countExperiments();
const results2 = await shutdownLowExperiments();
const results3 = await executePendingCommands();
console.clear();
console.log(results);
console.log(results2);
console.log(results3);
}
printResults();
