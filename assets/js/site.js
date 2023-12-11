// Generate PDF
target = "_blank";
var doc = new jsPDF();

$(async () => {
  //#region local call
  $.getJSON("./assets/data/profile.json", function (data) {
    $(".topLevelTitle").append(data.profile.name);
    $(".username").append(data.profile.name);
    $(".address").append(data.profile.address);
    $(".mail").append(data.profile.email);
    $(".mobileNumber").append(data.profile.phone);

    var linkedIn = document.querySelector(".linkedIn");
    linkedIn.innerHTML = "linkedin.com/in/hafiz-waqar-khan/";
    linkedIn.href = getPlatformName(data.profile.links);
    linkedIn.target = target;

    $(".about").append(data.profile.about);

    $.each(data.profile.skills, (i, skill) =>
      $(".skill").append(`<li>${skill.name}</li>`)
    );
    $.each(data.profile.education_history, function (i, edu) {
      $(".education").append(`
        <li>
        ${edu.institute_name}<br>
        ${edu.type}<br>
        ${edu.from} - ${edu.to}
        </li>`);
    });
  });
  //#endregion local call
});

makePDF = () => {
  doc.fromHTML($("#pdf").html(), 15, 15);
  doc.save(`Waqar Khan's CV.pdf`);
};

getPlatformName = (data) => data[3].url;
