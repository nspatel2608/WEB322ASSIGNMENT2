/********************************************************************************
*  WEB322 – Assignment 02
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
*  Name: Neel S Patel   Student ID: 190822239   Date: 2025-11-09
*
********************************************************************************/

const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

let projects = [];

// -----------------------------------------------------------------------------
// Initialize the project list by mapping sector IDs to sector names
// -----------------------------------------------------------------------------
function initialize() {
    return new Promise((resolve, reject) => {
        try {
            projects = projectData.map((p) => {
                const sector = sectorData.find((s) => s.id === p.sector_id);
                return { ...p, sector: sector ? sector.sector_name : "Unknown" };
            });

            console.log(
                "✅ Data initialized with sectors:",
                [...new Set(projects.map((p) => p.sector))].join(", ")
            );

            resolve();
        } catch (err) {
            reject("❌ Initialization failed: " + err);
        }
    });
}

// -----------------------------------------------------------------------------
// Return all projects
// -----------------------------------------------------------------------------
function getAllProjects() {
    return new Promise((resolve, reject) => {
        if (projects.length > 0) resolve(projects);
        else reject("No projects available");
    });
}

// -----------------------------------------------------------------------------
// Return project by ID
// -----------------------------------------------------------------------------
function getProjectById(projectId) {
    return new Promise((resolve, reject) => {
        const idNum = Number(projectId);
        const item = projects.find((p) => p.id === idNum);

        if (item) resolve(item);
        else reject(`Unable to find project with id: ${projectId}`);
    });
}

// -----------------------------------------------------------------------------
// Return all projects filtered by sector (case-insensitive + trimmed)
// -----------------------------------------------------------------------------
function getProjectsBySector(sector) {
    return new Promise((resolve, reject) => {
        if (!sector || typeof sector !== "string") {
            reject("Invalid sector value");
            return;
        }

        const filtered = projects.filter(
            (p) =>
                p.sector &&
                p.sector.trim().toLowerCase() === sector.trim().toLowerCase()
        );

        if (filtered.length > 0) resolve(filtered);
        else reject("No results found for sector: " + sector);
    });
}

// -----------------------------------------------------------------------------
// Export functions
// -----------------------------------------------------------------------------
module.exports = {
    initialize,
    getAllProjects,
    getProjectById,
    getProjectsBySector,
};
