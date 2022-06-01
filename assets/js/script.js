var profile;
$(function () {
  loader = ".pv-loader-container";
  $(loader).fadeOut(200)
  
  const consts = {
    skills: "skills",
    languages: "languages",
    experiences: "experiences",
    education: "education",
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
  portfolio = ".projects";
  progress = "#progress";
  testimonial = ".swiper-wrapper";
  languages = ".languages";
  links = ".social-links";


  $.ajax({
    url: '../assets/data/profile.json',
    method: 'GET',
  }).done(function (data) {
    profile = data.profile;
    // sett profile
    $(title).text(profile.name)
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
    // Testimonial
    $(progress).html(RenderList(profile.progress, consts.progress))
    $(testimonial).html(RenderList(profile.testimonial, consts.testimonial))
    // Portfolio
    $(portfolio).html(RenderList(profile.projects, consts.portfolio))
    // Links
    $(links).html(RenderList(profile.links, consts.links));

    setTimeout(()=>{$(loader).addClass('hide')},1500);
    // $(loader).hide()
  }).fail(function (a, b, error) {
    $(loader).removeClass('hide')
    console.log(error)
  });

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

    var education = `<div class="card">
                    <div class="row education">
                      <div class="col-md-3 degree" data-aos="fade-right" data-aos-offset="50" data-aos-duration="500">
                        <div class="card-body cc-education-header">
                          <p>${e.from} - ${e.to}</p>
                          <div class="h5">${e.degree}</div>
                        </div>
                      </div>
                      <div class="col-md-9" data-aos="fade-left" data-aos-offset="50" data-aos-duration="500">
                        <div class="card-body">
                        <div class="h5">${e.type}</div>
                        <p class="category">${e.institute_name}</p>
                        <p>${e.description}</p>
                      </div>
                        </div>
                      </div>
                    </div>
                  </div>`

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

  function getLinks(e) {
    return `<a href="${e.url}" target="_blank" class="${e.name}" title="${e.name}"><i class="${e.icon}"></i></a>`;
  }

});


// fetch('../assets/data/profile.json')
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         appendData(data);
//         console.log("🚀 ~ file: script.js ~ line 10 ~ data", data)
//     })
//     .catch(function (err) {
//         console.log(err);
//     });
// var profile;
// $(function () {


//     $.ajax({
//         url: "../assets/data/profile.json",
//         method: "GET"
//     }).done(function (data) {
//         profile = data.profile;
//         console.log("🚀 ~ file: script.js ~ line 23 ~ profile", profile);
//         console.log()
//     })

// })


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


