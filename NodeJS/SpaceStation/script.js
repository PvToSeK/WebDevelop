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


async function printResults() {
const results = await getPanels();
const results2 = await getMoludes();
console.clear();
console.log(results);
console.log(results2)
}
printResults();
