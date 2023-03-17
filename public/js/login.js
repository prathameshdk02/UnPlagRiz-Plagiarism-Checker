const emailField = $("#email");
const passField = $("#pass");

const delay = (ms) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

const fadeAuthErr = () => {
  $(".auth-err").fadeOut(400);
};

$("#signup-form").submit(async (e) => {
  let submitBtn = $("#frm-submit");
  submitBtn.attr("disabled", "disabled").val("Submitted!").fadeTo(1000, 0.8);

  await delay(10000);

  submitBtn.removeAttr("disabled").val("Submit").fadeTo(500, 1);
});

emailField.on({
  focusin: fadeAuthErr,
});

passField.on({
  focusin: fadeAuthErr,
});
