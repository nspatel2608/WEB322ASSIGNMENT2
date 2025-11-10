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

const express = require("express");
const path = require("path");
const projectData = require("./modules/projects");

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- VIEW ENGINE & STATIC FILES ---------- //
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// ---------- ROUTES ---------- //

// Home page
app.get("/", (req, res) => {
    res.render("home", { page: "/" });
});

// About page
app.get("/about", (req, res) => {
    res.render("about", { page: "/about" });
});

// All Projects (with optional ?sector= query)
app.get("/solutions/projects", async (req, res) => {
    try {
        const sector = req.query.sector || null;
        let projects;

        if (sector) {
            projects = await projectData.getProjectsBySector(sector);
        } else {
            projects = await projectData.getAllProjects();
        }

        res.render("projects", {
            page: "/solutions/projects",
            projects,
            sector: sector || "All Sectors",
        });
    } catch (err) {
        console.error(err);
        res
            .status(404)
            .render("404", { page: "", message: "Error loading project list." });
    }
});

// Single project by ID
app.get("/solutions/projects/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const project = await projectData.getProjectById(id);

        if (!project) {
            return res
                .status(404)
                .render("404", { page: "", message: "Project not found." });
        }

        res.render("project", { page: "", project });
    } catch (err) {
        console.error(err);
        res
            .status(500)
            .render("404", { page: "", message: "Error loading project details." });
    }
});

// 404 fallback
app.use((req, res) => {
    res.status(404).render("404", { page: "", message: "Page not found." });
});

// ---------- START SERVER ---------- //
projectData
    .initialize()
    .then(() => {
        app.listen(PORT, () =>
            console.log(`✅ Server running at http://localhost:${PORT}`)
        );
    })
    .catch((err) => console.error("❌ Failed to start server:", err));
