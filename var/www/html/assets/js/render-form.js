function generateHTML(server_type, title) {
  const range = document.getElementById(`${server_type}_create_value`).value;
  const outputDiv = document.getElementById(`${server_type}_row`);
  
  if (range < 0 || range > 5) {
    outputDiv.innerHTML = "Please provide a range between 0 and 5.";
    return;
  }

  let htmlContent = "";
  for (let i = 0; i < range; i++) {
    htmlContent += `
    <div class="col-md-6 col-xl-4" style="margin: 30px;">
        <div class="mb-3">
            <h3 class="text-center">${title}</h3>
        </div>
        <div class="mb-3">
            <h6 style="padding-left: 5px;">Hostname</h6><input id="${server_type}_hostname-${i}" class="form-control" type="text" name="${server_type}[${i}][hostname]" required/>
        </div>
        <div class="mb-3">
            <h6 style="padding-left: 5px;">Username</h6><input id="${server_type}_username-${i}" class="form-control" type="text" name="${server_type}[${i}][username]" />
        </div>
        <div class="mb-3">
            <h6 style="padding-left: 5px;">Password</h6><input id="${server_type}_password-${i}" class="form-control" type="password" name="${server_type}[${i}][password]" />
        </div>
        <div class="mb-3">
            <h6 style="padding-left: 5px;">Root Password</h6><input id="${server_type}_root_password-${i}" class="form-control" type="password" name="${server_type}[${i}][root_password]" required />
        </div>
        <div class="mb-3">
            <h6 style="padding-left: 5px;">Upload ${title} Files (as .ZIP)</h6><input id="${server_type}_files-${i}" class="form-control" type="file" name="${server_type}[${i}][files]" />
        </div>
    </div>
    `;
  }

  outputDiv.innerHTML = htmlContent;
}