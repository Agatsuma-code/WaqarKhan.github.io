"use strict";

let ks = new KonsoleSettings();
// ks.ElemSelector = "#Console";
ks.animatePrint = false;
ks.printLetterInterval = 20;
ks.registerDefaultKommands = false;
let konsole = new Konsole("#Console", ks);

let data = {
    "about": [
        "I'm Waqar Khan.",
        `A Programmer.`,
        `That's it.`,
        `Try some other commands.`
    ],
    "languages": [
        "C/C++",
        "Javascript + Typescript",
    ],
    "projects": [
        {
            name: "Resume",
            desc: "",
            url: "https://hwaqarkhan.github.io/"
        }
    ],
    "technologies": [
        {
            name: "Web",
            items: [
                "HTML5",
                "CSS",
                "BootStrap",
                "JAVASCRIPT",
                "Typescript",
                "Angular",
                "ASP.NET MVC",
                "Wordpress"
            ]
        },
        {
            name: "Desktop",
            items: [
                "Electron",
                "Tauri [planning"
            ]
        }
    ],
    "links": [

        {
            name: "Skype",
            url: "https://join.skype.com/invite/pd9swoskA8N0"
        },
        {
            name: "Linkedin",
            url: "https://www.linkedin.com/in/hafiz-waqar-khan/"
        },
        {
            name: "GitHub",
            url: "https://www.youtube.com/channel/UCWH0Pxqat1LgosgGINf4TCg?sub_confirmation=1"
        },
        {
            name: "YouTube",
            url: "https://github.com/HWaqarKhan"
        }
    ]
};



function toAnchorTag(text, url) {
    return `<a target='_blank' tabindex="-1" href='${url}'>${text}</a>`;
}

$(async () => {

    // let mydata = await (await fetch("/assets/data.json")).json()
    // console.log("🚀 ~ file: consoleScript.js ~ line 101 ~ $ ~ mydata", mydata)


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

    konsole.print("If you don't know how to use it, please type \"help\" to find out commands.")
    konsole.awaitKommand();

});

