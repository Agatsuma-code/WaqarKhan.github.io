"use strict";

let ks = new KonsoleSettings();
// ks.ElemSelector = "#Console";
ks.animatePrint = false;
ks.printLetterInterval = 20;
ks.registerDefaultKommands = false;
let konsole = new Konsole("#Console", ks);

let data = {
    "about": [
        "I'm Husnain Taj.",
        `A Programmer.`,
        `That's it.`,
        `Try some other commands.`
    ],
    "languages": [
        "C#",
        "Javascript + Typescript",
        "Python",
        "Java + Kotlin",
        "C++",
        "Dart [planning]",
        "Rust [planning]"
    ],
    "projects": [
        {
            name: "KonsoleJS",
            desc: "A JS Library for building console like UI in your website.",
            url: "https://github.com/HusnainTaj/KonsoleJS"
        },
        {
            name: "DPI Finder",
            desc: "Simple web app to find DPI of a mouse.",
            url: "https://github.com/HusnainTaj/DPI-Finder"
        }
    ],
    "technologies": [
        {
            "name": "Web",
            "items": [
                `Blazor`,
                `ASP.NET MVC`,
                `Razor Pages`,
                `Angular`,
                `Firebase`,
                `Wordpress`,
            ]
        },
        {
            "name": "Desktop",
            "items": [
                `Electron`,
                `Windows Forms`,
                `Windows Presentation Foundation (WPF)`,
                `Windows Services`,
                `Tauri [planning]`,
            ]
        },
        {
            "name": "Android",
            "items": [
                "Native",
            ]
        },
        {
            "name": "Cross Platform",
            "items": [
                `MAUI [planning]`,
                `Flutter [planning]`,
            ]
        },
        {
            "name": "Testing",
            "items": [
                "NUnit",
                "Stryker Mutator [planning]",
            ]
        },
        {
            "name": "Crypto",
            "items": [
                "Solidity",
                "Solana Smart Contracts using Rust [planning]"
            ]
        }
    ],
    "links": [
        { name: "GitHub", url: "https://github.com/HusnainTaj/" },
        { name: "LinkedIn", url: "https://www.linkedin.com/in/husnain-taj/" },
    ]
};

function toAnchorTag(text, url) {
    return `<a target='_blank' tabindex="-1" href='${url}'>${text}</a>`;
}

$(async () => {

    let mydata = await (await fetch("/assets/data.json")).json()
    console.log("🚀 ~ file: consoleScript.js ~ line 101 ~ $ ~ mydata", mydata)


    konsole.mcq = (question, choices, correctOption, correctMsg, wrongMsg) => {
        return new Promise(async (resolve, reject) => {
            let selectedChoice = await konsole.choice(question, choices);

            if (selectedChoice == correctOption) {
                await konsole.print(correctMsg);
                resolve(true);
            }
            else {

                await konsole.print(wrongMsg);
                resolve(false);
            }
        });
    }

    konsole.RegisterKommand(new Kommand("about", "me", null, () => {
        return new Promise((resolve, reject) => {
            konsole.print(data.about).then(resolve);
        });
    }));

    konsole.RegisterKommand(new Kommand("langs", "programming languages i've worked with.", null, () => {
        return new Promise((resolve, reject) => {
            konsole.print(...data.languages).then(resolve);
        });
    }));


    konsole.RegisterKommand(new Kommand("projects", "projects i've worked or working on.", null, () => {
        return new Promise(async (resolve, reject) => {
            for (const project of data.projects) {
                await konsole.print(`${toAnchorTag(project.name, project.url)} - ${project.desc}`);
            }
            resolve();
        });
    }));

    konsole.RegisterKommand(new Kommand("tech", "frameworks and libraries i've worked with or interested in learning.", null, () => {
        return new Promise(async (resolve, reject) => {
            for (const tech of data.technologies) {
                await konsole.print(`${tech.name}\n${"¯".repeat(tech.name.length)}\n    ${tech.items.join("\n    ")}`);
            }
            resolve();
        });
    }));

    konsole.RegisterKommand(new Kommand("links", "links to my socials...", null, () => {
        return new Promise(async (resolve, reject) => {
            for (const link of data.links) {
                await konsole.print(toAnchorTag(link.name, link.url));
            }
            resolve();
        });
    }));

    konsole.RegisterKommand(new Kommand("-".repeat(10), "-".repeat(30), null, null));

    konsole.RegisterDefaultKommands();
    konsole.RegisterKommand(new Kommand("close", "Close Resume.", null, () => {
        return new Promise((resolve, reject) => {
            window.close();
        });
    }));

    konsole.awaitKommand();

});

