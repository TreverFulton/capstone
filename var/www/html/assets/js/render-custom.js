function generateCustomHTML() {
  const range = document.getElementById(`custom_create_value`).value;
  const outputDiv = document.getElementById(`custom_row`);
  
  if (range < 0 || range > 5) {
    outputDiv.innerHTML = "Please provide a range between 0 and 5.";
    return;
  }

  let htmlContent = "";
  for (let i = 0; i < range; i++) {
    htmlContent += `
        <div class="col-md-6 col-xl-4" style="padding-right: 0px;margin-right: 30px;margin-top: 30px;">
        <div class="mb-3">
            <h3 class="text-center">Custom package Server</h3>
        </div>
        <div class="mb-3">
            <h6 style="padding-left: 5px;">Hostname</h6><input id="custom_hostname-${i}" class="form-control" type="text" name="custom[${i}][hostname]" required />
        </div>
        <div class="mb-3">
            <h6 style="padding-left: 5px;">Username</h6><input id="custom_username-${i}" class="form-control" type="text" name="custom[${i}][username]" />
        </div>
        <div class="mb-3">
            <h6 style="padding-left: 5px;">Password</h6><input id="custom_password-${i}" class="form-control" type="password" name="custom[${i}][password]" />
        </div>
        <div class="mb-3">
            <h6 style="padding-left: 5px;">Root Password</h6><input id="custom_root_password-${i}" class="form-control" type="password" name="custom[${i}][root_password]" required/>
        </div>
        <div class="mb-3">
            <h6 style="padding-left: 5px;">Custom Packages (delimit by space)</h6><textarea id="custom_packages-${i}" class="form-control" name="custom[${i}][packages]"></textarea>
        </div>
        <div class="mb-3"></div>
    </div>
    `;
  }

  outputDiv.innerHTML = htmlContent;
}