console.log('Starting up');
$(onInit);

function onInit() {
  renderProjects();
}

function renderProjects() {
  var projects = getProjects();
  var strHTML = projects.map(function (proj, idx) {
    return `
            <div class='col-md-4 col-sm-6 portfolio-item'>
                <a class='portfolio-link' data-toggle='modal' href='#portfolioModal${idx}'>
                    <div class='portfolio-hover'>
                        <div class='portfolio-hover-content'>
                            <i class='fa fa-plus fa-3x'></i>
                        </div>
                    </div>
                    <img class='rounded mx-auto d-block' src='img/portfolio/${proj.name}.jpg' alt='${proj.name}' />
                </a>
                <div class='portfolio-caption'>
                    <h4>${proj.title}</h4>
                    <p class='text-muted'>${proj.category}</p>
                </div>
            </div>`;
  });
  $('.portfolio-cards').html(strHTML);
}
