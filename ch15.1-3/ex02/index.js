(async () => {
  const { $ } = await import(
    "https://releases.jquery.com/git/jquery-git.module.min.js"
  );
  $("*").css("color", "red");
})();
