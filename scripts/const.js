// ================================================================== 
// ===== EXTRACTIONS ================================================
// ================================================================== 

// Get Module Data
export async function getModuleJson(relative = "../module.json") {
    const url = new URL(relative, import.meta.url).href; // resolves relative to THIS file
    // return await foundry.utils.fetchJsonWithTimeout(url);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
    return await res.json();
}
const moduleData = await getModuleJson();
/**
 * Extracts the last segment of a module id and uppercases it.
 * Example: "coffee-pub-blacksmith" -> "BLACKSMITH"
 */
function getModuleCodeName(moduleId) {
    if (!moduleId || typeof moduleId !== "string") return "";
    const parts = moduleId.split("-");
    return parts.at(-1)?.toUpperCase() ?? "";
}
const strName = getModuleCodeName(moduleData.id);
// Post the data
console.log(moduleData.title, `SCRIBE Module ID: `, moduleData.id);
console.log(moduleData.title, `SCRIBE Module Name: `, strName);
console.log(moduleData.title, `SCRIBE Module Title: `, moduleData.title);
console.log(moduleData.title, `SCRIBE Module Version: `, moduleData.version);
console.log(moduleData.title, `SCRIBE Module Author: `, moduleData.authors[0]?.name);
console.log(moduleData.title, `SCRIBE Module Description: `, moduleData.description);

// ================================================================== 
// ===== EXPORTS ====================================================
// ================================================================== 

// MODULE CONSTANTS
export const MODULE = {
    ID: moduleData.id, 
    NAME: strName, // Extracted from moduleData.title
    TITLE: moduleData.title,
    VERSION: moduleData.version, 
    AUTHOR: moduleData.authors[0]?.name || 'COFFEE PUB',
    DESCRIPTION: moduleData.description,
};

export const SCRIBE = {
    ID: MODULE.ID,
    TEST_VAR: `This is a test variable. You got it.`,
    DIALOGUE_ILLUSTRATION_TEMPLATE: `modules/${MODULE.ID}/templates/dialogue-illustration.hbs`,
    PATH_SOUND:`modules/${MODULE.ID}/sounds/`,
    PATH_IMAGES:`modules/${MODULE.ID}/images/`,
}

export const SCRIBE_HTML_EXPORT_CSS = `
        /* Body */
        body, h1, h2, h3, h4, h5, h6 {
            font-family: Tahoma, "Trebuchet MS", sans-serif;
        }
        /* H1 */
        h1 {
            font-weight:550;
            font-size: 1.1em;
            font-style: normal;
            text-transform: uppercase;
            display: inline; 
            margin-top: 0px;
            margin-bottom: 0px;
            margin-left: 0px;
            margin-right: 0px;
            padding-top: 0px;
            padding-bottom: 0px;
            padding-left: 0px;
            padding-right: 0px;
        }
        /* H2 */
        h2 {
            font-weight:400;
            font-size: 1.0em;
            margin-top: 0px;
            margin-bottom: 0px;
            margin-left: 0px;
            margin-right: 0px;
            padding-top: 0px;
            padding-bottom: 0px;
            padding-left: 0px;
            padding-right: 0px;
        }
        /* H3 */
        h3 {
            font-weight:400;
            font-size: 0.85em;
            margin-top: 10px;
            margin-bottom: 0px;
            margin-left: 0px;
            margin-right: 0px;
            padding-top: 5px;
            padding-bottom: 0px;
            padding-left: 0px;
            padding-right: 0px;
        }
        /* Lists */
        ol,
        ul {
            font-weight:400;
            font-size: 1.0em;
            margin-top: 5px;
            margin-bottom: 5px;
            margin-left: 20px;
            margin-right: 0px;
            padding-top: 0px;
            padding-bottom: 0px;
            padding-left: 0px;
            padding-right: 0px;	
        }
        /* List Items */
        li {
            font-weight:400;
            font-size: 0.9em;
            margin-top: 2px;
            margin-bottom: 0px;
            margin-left: 0px;
            margin-right: 0px;
            padding-top: 0px;
            padding-bottom: 0px;
            padding-left: 0px;
            padding-right: 0px;	
        }
        /* Paragraph */
        p {
            font-weight:400;
            font-size: 1.0em;
            margin-top: 0px;
            margin-bottom: 0px;
            padding-top: 0px;
            padding-bottom: 0px;
            padding-left: 0px;
            padding-right: 0px;	
        }
        /* Table */
        table {
            font-size: 0.8em;
            margin-top: 8px;
            margin-bottom: 8px;
            margin-left: 0px;
            margin-right: 0px;
        }
        /* Table Heading */
        table th {
            font-size: 1.0em;
            vertical-align: bottom;
            padding-top: 3px;
            padding-bottom: 3px;
            padding-left: 8px;
            padding-right: 8px;	
        }
        /* Table Row */
        table tr {
            font-size: 1.0em;
            padding-top: 3px;
            padding-bottom: 3px;
            padding-left: 4px;
            padding-right: 4px;	
        }
        /* Table Cell */
        table td {
            font-size: 1.0em;
            padding-top: 3px;
            padding-bottom: 3px;
            padding-left: 8px;
            padding-right: 8px;	
        }
        /* Preformatted */
        pre {
            white-space: pre-wrap;
            font-size: 0.8em;
            font-family: var(--font-primary);
            margin-top: 0px;
            margin-bottom: 0px;
            margin-left: 0px;
            margin-right: 0px;
            padding-top: 3px;
            padding-bottom: 3px;
            padding-left: 0px;
            padding-right: 0px;	
        }
        
        /* Resolved Content Styling */
        .resolved-item, .resolved-journal, .resolved-actor {
            border: 1px solid #ccc;
            border-radius: 4px;
            margin: 10px 0;
            padding: 10px;
            background-color: #f9f9f9;
        }
        
        .resolved-item h4, .resolved-journal h4, .resolved-actor h4 {
            margin-top: 0;
            margin-bottom: 8px;
            color: #333;
            font-weight: bold;
        }
        
        .item-description, .actor-description {
            font-size: 0.9em;
            line-height: 1.4;
        }
        
        .journal-page-content {
            margin: 8px 0;
            padding: 8px;
            border-left: 3px solid #ddd;
            background-color: #fff;
        }
        
        .journal-page-content h5 {
            margin-top: 0;
            margin-bottom: 5px;
            font-size: 0.95em;
            color: #555;
        }
        
        /* UUID Link Text Styling */
        .uuid-link-text {
            font-weight: bold;
            color: #2c3e50;
            text-decoration: none;
            background-color: #ecf0f1;
            padding: 2px 4px;
            border-radius: 3px;
            border: 1px solid #bdc3c7;
        }
        `
