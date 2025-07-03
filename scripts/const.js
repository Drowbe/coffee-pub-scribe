// ================================================================== 
// ===== EXPORTS ====================================================
// ================================================================== 

export const MODULE_TITLE = 'SCRIBE'
export const MODULE_ID = 'coffee-pub-scribe'
export const SCRIBE = {
    ID: MODULE_ID,
    TEST_VAR: `This is a test variable. You got it.`,
    DIALOGUE_ILLUSTRATION_TEMPLATE: `modules/${MODULE_ID}/templates/dialogue-illustration.hbs`,
    PATH_SOUND:`modules/${MODULE_ID}/sounds/`,
    PATH_IMAGES:`modules/${MODULE_ID}/images/`,
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
