const BASE_URL= "http://localhost:3001"

async function getPanels(){
    const response = await fetch(BASE_URL+"/station/status");

    if(response.ok){
        const data = await response.json();
        let panels = data.power.solar.panels;
        let totalPanels= panels.length;

        let active_panels= 0
        for(let panel of panels){
            if(panel.status === "nominal"){
                active_panels++;
            }
        }
        const percentage = (active_panels/totalPanels)*100;   
        
        return {
            totalPanels : totalPanels,
            active_panels : active_panels,
            percentage : percentage
        };
    }
}

async function getMoludes() {
    let response = await fetch(BASE_URL + "/station/modules");
    if(response.ok){ 
        let data = await response.json();
        let modules = data.modules;
        console.log(data.modules)
        let moduleList = [];
        for(let module of modules){
        let degradedSystems = [];
            if(module.systems.subsystems){
                for(let subsystem of module.systems.subsystems){
                    if(subsystem.status !== "nominal"){
                        degradedSystems.push(subsystem);
                    }
                    
                }
                moduleList.push({
                        moduleId: module.id,
                        degradedSystemNames: degradedSystems
                    })
            }
        }
        return moduleList
    }
}

async function getExperiments() {
    let response = await fetch(BASE_URL + "/station/modules");
    let data = await response.json();

    let totalPower = 0;
    let totalCooling = 0;
    let activeExperimentsCount = 0;

    for (let module of data.modules) {
        if (module.type === "laboratory") {
            for (let experiment of module.experiments) {
                if (experiment.status === "active") {
                    activeExperimentsCount++;
                    totalPower += experiment.resourceConsumption.power;
                    totalCooling += experiment.resourceConsumption.cooling;
                }
            }
        }
    }

    return {
        totalPower: totalPower,
        totalCooling: totalCooling,
        activeExperimentsCount: activeExperimentsCount
    };
}
async function getReservers() {
    let response_status = await fetch(BASE_URL + "/station/status");
    let response_modules = await fetch(BASE_URL + "/station/modules");
    let data_status = await response_status.json();
    let reserves = data_status.power.reserves;
    let data_modules = await response_modules.json();

if(reserves >= 95){
    return ({
        message : "Energia sufficiente, nessuna azione necessaria"
    })
}
    let active_experiments = [];
    for(let module of data_modules.modules){
        if(module.experiments){
        for(let experiment of module.experiments){
            if(experiment.status === "active"){
                active_experiments.push({
                    experimentID : experiment.id,
                    name : experiment.name,
                    powerConsumption : experiment.resourceConsumption.power
                })
            }
        }
    }
}  
    return active_experiments;
}
async function printResults() {
const results = await getPanels();
const results2 = await getMoludes();
const result3 = await getExperiments();
const result4 = await getReservers();
console.clear();
console.log(results);
console.log(results2);
console.log(result3);
console.log(result4);
}
printResults();
