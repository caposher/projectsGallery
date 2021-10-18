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
            <div class='col-md-4 col-sm-6 portfolio-item" data-id="${idx}'>
                <a class='portfolio-link' data-toggle='modal' href='#portfolioModal'>
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

function renderProjModals(proj) {
  var strHTML = `
                <div class="modal-body">
                  <!-- Project Details Go Here -->
                  <h2>${proj.title}</h2>
                  <p class="item-intro text-muted">${proj.name}</p>
                  <img class="img-fluid d-block mx-auto" src="img/portfolio/${proj.name}.jpg" alt="${proj.name}" />
                  <p>
                  ${proj.desc}
                  </p>
                  <ul class="list-inline">
                    <li>ID: ${proj.id}</li>
                    <li>Date: ${proj.publishedAt}</li>
                    <li>Category: ${proj.category}</li>
                  </ul>
                  <button class="btn btn-primary" data-dismiss="modal" type="button">
                    <i class="fa fa-times"></i>
                    Close Project
                  </button>
                </div>`;

  $('.modal-body').html(strHTML);
}

function onOpenModal(ev) {
  var projId = $(this).data('id');
  var projInfo = getProjInfo(projId);
  renderProjModals(projInfo);
}
