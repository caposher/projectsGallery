console.log('Starting up');
$(onInit);

function onInit() {
  renderProjects();
  $('.portfolio-item').click(onOpenModal);
}

function renderProjects() {
  var projects = getProjects();
  var strHTML = projects.map(function (proj, idx) {
    return `
            <div class="col-md-4 col-sm-6 portfolio-item text-center" data-id="${idx}">
                <a class="portfolio-link" data-toggle="modal" href="#portfolioModal">
                    <div class="portfolio-hover">
                        <div class="portfolio-hover-content">
                            <i class="fa fa-plus fa-3x"></i>
                        </div>
                    </div>
                    <img class="rounded mx-auto d-block img-fluid" src="img/portfolio/01-${
                      proj.name
                    }.jpg" alt="${proj.name}" />
                </a>
                <div class="portfolio-caption bg-dark text-light">
                    <h4>${proj.title}</h4>
                    <p class="text-muted">${proj.category}</p>
                    ${renderBadges(proj)}
                </div>
            </div>`;
  });
  $('.portfolio-cards').html(strHTML);
}

function renderProjModals(proj) {
  var strHTML = `
                <div class="modal-body">
                  <!-- Project Details Go Here -->
                  <h2 class="text-primary">${proj.title}</h2>
                  <img class="img-fluid d-block mx-auto w-75" 
                                            src="img/portfolio/02-${proj.name}.jpg" alt="${proj.name}" />
                  <p>
                  ${proj.desc}
                  </p>
                  <ul class="list-inline">
                    <li>Date: ${proj.publishedAt}</li>
                    <li>Category: ${proj.category}</li>
                    <li>${renderBadges(proj)}</li>
                  </ul>
                  <button class="tryIt tryIt-${proj.id} btn btn-info px-4 mb-1" type="button">
                    Let's try it!
                  </button>
                  </br>
                  <button class="btn btn-secondary" data-dismiss="modal" type="button">
                    <i class="fa fa-times"></i>
                    Close Project
                  </button>
                </div>`;

  $('.modal-body').html(strHTML);
}

function renderBadges(proj) {
  var strHTML = proj.labels.map(function (lable) {
    return `<span class="badge badge-secondary ${determineColor(lable)} mr-1">${lable}</span>`;
  });
  return strHTML.join('');
}

function determineColor(txt) {
  var colorAtrr = '';
  switch (txt) {
    case 'Mouse':
    case 'Keyboard':
      colorAtrr = 'bg-info';
      break;
    case 'Coding Academy':
      colorAtrr = 'bg-warning text-dark';
      break;
    case 'On Develop':
      colorAtrr = 'bg-danger text-light';
      break;
    case 'Sprint':
      colorAtrr = 'bg-success';
      break;
  }
  return colorAtrr;
}

function onOpenModal(ev) {
  var projId = $(this).data('id');
  var projInfo = getProjInfo(projId);
  renderProjModals(projInfo);
}
