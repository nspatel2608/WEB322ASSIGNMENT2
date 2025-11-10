const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

let projects = [];

function initialize() {
    return new Promise((resolve, reject) => {
        try {
            projects = projectData.map((p) => {
                const sector = sectorData.find((s) => s.id === p.sector_id);
                return { ...p, sector: sector ? sector.sector_name : "Unknown" };
            });
            resolve();
        } catch (err) {
            reject("Initialization failed");
        }
    });
}

function getAllProjects() {
    return new Promise((resolve) => resolve(projects));
}

function getProjectById(projectId) {
    return new Promise((resolve, reject) => {
        const idNum = Number(projectId);
        if (isNaN(idNum)) {
            reject("Invalid project ID");
            return;
        }

        const item = projects.find((p) => p.id === idNum);
        if (item) resolve(item);
        else reject("Unable to find requested project");
    });
}

function getProjectsBySector(sector) {
    return new Promise((resolve, reject) => {
        if (!sector || typeof sector !== "string") {
            reject("Invalid sector value");
            return;
        }

        // ✅ Optional mapping for friendly URLs
        const sectorMap = {
            energy: "Electricity",
            agriculture: "Food, Agriculture, and Land Use",
        };

        const searchSector = sectorMap[sector.toLowerCase()] || sector;

        const filtered = projects.filter(
            (p) => p.sector && p.sector.toLowerCase() === searchSector.toLowerCase()
        );

        if (filtered.length > 0) resolve(filtered);
        else reject("No results found for sector: " + sector);
    });
}

// ✅ Correctly close the export object
module.exports = { initialize, getAllProjects, getProjectById, getProjectsBySector };
