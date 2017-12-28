//check of todos by click
let todoText;

$("ul").on("click", "li", function() {
  $(this).toggleClass("completed");
});

$("ul").on("click", "span", function(e) {
  e.preventDefault();
  e.stopPropagation();
  $(this)
    .parent()
    .slideUp(500, function() {
      $(this).remove();
    });
});

$("input[type=text]").keypress(function(e) {
  if (e.which === 13) {
    if ($(this).val() === "") {
      return;
    }
    todoText = $(this).val();
    $(this).val("");
    $(`<li>
        <span>
        <i class="fa fa-trash" aria-hidden="true">
        </i>
        </span> ${todoText}
        </li>`)
      .appendTo("ul")
      .slideUp(0)
      .slideDown("slow");
  }
});

$(".fa-plus").click(function(e) {
  e.preventDefault();
  $('input[type="text"]').slideToggle(100);
  $(this).toggleClass("rotate");
});
