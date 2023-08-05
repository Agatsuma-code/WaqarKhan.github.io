// window.jsPDF = window.jspdf.jsPDF;
var profile;
target = "_blank";
var doc = new jsPDF('p', 'pt', 'legal');
getPlatformName = (data) => data[3].url;

function RenderList(list, template) {
  var res = '';
  $.each(list, function (i, e) {
    if (template === consts.skills) {
      res += getSkillsTemplate(e);
    }
    if (template === consts.experiences) {
      res += getExperienceTemplate(e);
    }
    if (template === consts.education) {
      res += getEducationTemplate(e);
    }
    if (template === consts.certification) {
      res += getCertificationTemplate(e);
    }
    if (template === consts.portfolio) {
      res += getPortfolios(e);
    }
    // if (template === consts.progress) {
    //   res += getProgress(e);
    // }
    if (template === consts.testimonial) {
      res += getTestimonials(e);
    }
    if (template === consts.links) {
      res += getLinks(e);
    }
  });
  return res;
}

const consts = {
  skills: "skills",
  languages: "languages",
  experiences: "experiences",
  education: "education",
  certification: "certification",
  portfolio: "portfolio",
  progress: "progress",
  testimonial: "testimonial",
  links: "links",
};

title = "#title";
fav = "#fav";
name = '#name'
skills = "#skills_data";
education = "#education_history";
exps = ".experiences";
cert = "#certifications";
portfolio = ".projects";
progress = "#progress";
testimonial = ".swiper-wrapper";
languages = ".languages";
links = ".social-links";

(async () => {
  const response = await fetch('https://api.perspective-v.com/graph/resume', {
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
  var profile = JSON.parse(body.data.getbyaccesstoken.jsonData);

  $(title).text(profile.name)
  $('.emailLink').attr("href", `mailto:${profile.email}`)
  $(fav).attr("href", profile.favicon)
  $(name).text(profile.name);
  $('#tagLine').text(profile.tagLine);
  $('#designation').text(profile.designation);
  $('#aboutMe').text(profile.about);
  $('.myEmail').text(profile.email);
  $('#phoneNo').text(profile.phone);
  $('#degree').text(profile.degree);
  $('#address').text(profile.address);
  $('.time-js').text(new Date().getFullYear())

  // skills
  $(skills).html(RenderList(profile.skills, consts.skills));
  // languages
  $(languages).html(RenderList(profile.languages, consts.languages));
  // work experience
  $(exps).html(RenderList(profile.experiences, consts.experiences))
  // education 
  $(education).html(RenderList(profile.education_history, consts.education))
  // certification 
  $(cert).html(RenderList(profile.certifications, consts.certification))
  // Testimonial
  $(progress).html(RenderList(profile.progress, consts.progress))
  $(testimonial).html(RenderList(profile.testimonial, consts.testimonial))
  // Portfolio
  $(portfolio).html(RenderList(profile.projects, consts.portfolio))
  // Links
  $(links).html(RenderList(profile.links, consts.links))

  //#region data for pdf file
  $('.topLevelTitle').append(profile.name);
  $('.username_pdf').append(profile.name);
  $('.address_pdf').append(profile.address);
  $('.mail_pdf').append(profile.email);
  $('.mobileNumber_pdf').append(profile.phone);
  var linkedIn = document.querySelector('.linkedIn_pdf');
  linkedIn.innerHTML = "linkedin.com/in/hafiz-waqar-khan/";
  linkedIn.href = getPlatformName(profile.links);
  linkedIn.target = target;
  var about = $('.about_pdf').append(profile.about);
  $.each(profile.skills, (i, skill) => $('.skill_pdf').append(`<li>${skill.name}</li>`));
  $.each(profile.education_history, function (i, edu) { $('.education_pdf').append(`<li>${edu.institute_name}<br>${edu.type}<br>${edu.from} — ${(edu.isCurrent == true ? 'Present' : edu.to)}</li>`); });
  $.each(profile.experiences, function (i, exp) {
    // console.log(exp)
    $('.experience_pdf').append(`
     <li>
     ${exp.company}<br>
     ${exp.designation}<br>
     ${exp.from} — ${(exp.isCurrent == true ? 'Present' : exp.to)}
     ${exp.description}<br>
     </li>`);
  });
  $.each(profile.certifications, function (i, cert) {
    $('.certification_pdf').append(`
           <li>
           <b> ${cert.name} </b> - ${cert.source}<br>
           </li>`);
  });


  $(document).on('click', '#gPDF', function () {
    // doc.text(x, y, "value");
    doc.splitTextToSize(profile.about, 50)
    // doc.fromHTML($("#pdf").html(), 25, 15);
    // let pageHeight = doc.internal.pageSize.height;

    // // Before adding new content
    // y = 400 // Height position of new content
    // if (y >= pageHeight) {
    //   doc.addPage();
    //   y = 0 // Restart height position
    // }
    doc.context2d.pageWrapYEnabled = true;
    doc.fromHTML($("#pdf").html(), 20, 0, {
      width: 550
    });
    doc.save(`${profile.name}'s CV.pdf`);

    // doc.save(`Waqar Khan's CV.pdf`);

  })
  //#endregion data for pdf file
})();



function getSkillsTemplate(e) {
  return `
    <div class="col-lg-6">
      <div class="progress">
        <span class="skill">${e.name} <i class="val">${e.score}</i></span>
        <div class="progress-bar-wrap">
          <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
            aria-valuenow="${e.score}" aria-valuemin="0" aria-valuemax="100" style="width: ${e.score}%"></div>
        </div>
      </div>
    </div>
    `
}

function getEducationTemplate(e) {

  var education = `<div class="card col-lg-5 col-md-12 mx-auto mb-3">
                    <div class="row education">
                      <div class="col-md-4 degree" data-aos="fade-right" data-aos-offset="50" data-aos-duration="500">
                        <div class="card-body cc-education-header">
                          <p class="fw-bold d-flex align-content-center">${e.from} - ${e.to}</p>
                        </div>
                      </div>
                      <div class="col-md-8" data-aos="fade-left" data-aos-offset="50" data-aos-duration="500">
                        <div class="card-body">
                        <div class="h5">${e.type}</div>
                        <p class="category">${e.institute_name}</p>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>`

  // <p>${e.description}</p>
  return education;
}

function getExperienceTemplate(e) {
  var exp = `<div class="card">
    <div class="row education">
      <div class="col-md-3 degree" data-aos="fade-right" data-aos-offset="50" data-aos-duration="500">
        <div class="card-body cc-education-header">
          <p>${e.from} — ${(e.isCurrent == true ? 'Present' : e.to)}</p>
          <div class="h5">${e.company}</div>
        </div>
      </div>
      <div class="col-md-9" data-aos="fade-left" data-aos-offset="50" data-aos-duration="500">
        <div class="card-body">
        <div class="h5">${e.designation}</div>
        <p>${e.description}</p>
      </div>
        </div>
      </div>
    </div>
  </div>`

  var proExperience = ` 
    <div class="experience-item">
          <h4>${e.designation}</h4>
          <h5>${e.from} — ${(e.isCurrent == true ? 'Present' : e.to)}</h5>
          <p><em>${e.company} </em></p>
          <p>
          <ul>
            <li>${e.description}</li>
          </ul>
          </p>
    </div>`
  return proExperience;
}

function getCertificationTemplate(e) {
  var cert = `
    <div class="col-lg-6 col-md-12 m-auto">
      <div class="icon-box mb-1">
      <img class="me-4" src="${e.img}" alt="${e.name}" width="50" height="50">
      <h3 class="me-5">${e.name}</h3>
      <a href="${e.url}" target="_blank" class="text-white" title="verified" >
      <p class="mt-auto mb-auto" >${e.source} </p>
      </a>
      </div>
  </div>`
  return cert;
}

function getPortfolios(e) {
  var projects = `
    <div class="col-lg-4 col-md-6 portfolio-item filter-app">
        <div class="portfolio-wrap">
        <img src="${e.img}" alt="${e.name}" width="400">
        <div class="portfolio-info">
          <h3>${e.name}</h3>
          <p>${e.tech}</p>
          <div class="portfolio-links">
            <a href="${e.url}" target="_blank" data-gallery="portfolioDetailsGallery" data-glightbox="type: external"
              class="portfolio-details-lightbox" title="Website Link"><i class="bx bi bi-link-45deg"></i></a>
          </div>
        </div>
      </div>
      </div>`;
  return projects;
}

function getProgress(e) {
  var progress = `
        <div class="col-lg-3 col-md-6">
          <div class="count-box">
          <i class="${e.icon}"></i>
          <span >${e.count}</span>
          <p>${e.name}</p>
          </div>
        </div>
        `
  return progress;
}

function getTestimonials(e) {
  var testimonials = `
    <div class="swiper-slide">
    <div class="row commendation">

    <div class="story mt-5">
    <figure class="story__shape">
    <img src="${e.img}" alt="${e.name}" class="story__image">
                  <figcaption class="story__caption">${e.name}</figcaption>
                </figure>
                <div class="story__text">
                <a class="story__text-link" href="${e.link}" target="_blank" title="UpWork Endorsement">
                <p>
                <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                      ${e.endorsement}
                      <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                      </p>
                      <div class="identity">
                      <h4>${e.name}</h4>
                      <h5>${e.designation}</h5>
                      </div>
                      </a>
                      </div>
                      </div>
                      </div>
                    </div>
        `
  return testimonials;
}

getLinks = e => `<a href="${e.url}" target="_blank" class="${e.name}"><i class="${e.icon}"></i></a>`;


// function appendData(data) {
//     var name = document.querySelector('#name');
//     var tagLine = document.querySelector('#tagLine');
//     var designation = document.querySelector('#designation');
//     var aboutMe = document.querySelector('#aboutMe');
//     var email = document.querySelector('#email');
//     var email_H = document.querySelector('#email_H');
//     var phoneNo = document.querySelector('#phoneNo');
//     var degree = document.querySelector('#degree');
//     var address = document.querySelector('#address');

//     for (var i = 0; i < data.length; i++) {
//         name.innerHTML = data[i].profile[i].firstName + ' ' + data[i].profile[i].lastName;
//         tagLine.innerHTML = data[i].profile[i].tagLine;
//         designation.innerHTML = data[i].profile[i].designation;
//         aboutMe.innerHTML = data[i].profile[i].about;
//         email.innerHTML = data[i].profile[i].email;
//         email_H.innerHTML = data[i].heading[i].email_H;
//         phoneNo.innerHTML = data[i].profile[i].phone;
//         degree.innerHTML = data[i].profile[i].degree;
//         address.innerHTML = data[i].profile[i].address;
//     }
// }