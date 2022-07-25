"use strict";
let ks = new KonsoleSettings();
// ks.ElemSelector = "#Console";
ks.animatePrint = false;
ks.printLetterInterval = 20;
ks.registerDefaultKommands = false;
let konsole = new Konsole("#Console", ks);
function toAnchorTag(text, url) {
    return `<a target='_blank' tabindex="-1" href='${url}'>${text}</a>`;
}

$(async () => {

    const response = await fetch('https://graph.perspective-v.com/api/resume', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "*/*"
    },
    body: JSON.stringify({
      query: `query getMyResume($token:String!){
              getbyaccesstoken(accesToken:$token){
                name,
                jsonData
              }
            }`,
      variables: {
        token: 'PsoFcktcf0yrQvuYgbIjSA=='
      }
    })
  });
  const body = await response.json();
  var data = JSON.parse(body.data.getbyaccesstoken.jsonData);

    konsole.RegisterKommand(new Kommand("about", "me", null, () => {
        return new Promise((resolve, reject) => {
            konsole.print(data.about).then(resolve);
        });
    }));

    konsole.RegisterKommand(new Kommand("langs", "languages ", null, () => {
        return new Promise(async (resolve, reject) => {
            for (const language of data.languages) {
                await konsole.print(`${language.name} - ${language.level}`);
            }
            resolve();
        });
    }));
    konsole.RegisterKommand(new Kommand("projects", "projects i've worked or working on.", null, () => {
        return new Promise(async (resolve, reject) => {
            for (const project of data.projects) {
                await konsole.print(`${toAnchorTag(project.name, project.url)} - ${project.tech}`);
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

    // konsole.print("If you don't know how to use it, please type \"help\" to find out commands.")
    // konsole.awaitKommand();

});

